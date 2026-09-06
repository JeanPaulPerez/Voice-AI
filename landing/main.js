/* MMLR landing — reveals, header state, sticky CTA, form, instrumentation.
   No dependencies. Everything degrades to a plain, fully readable page without JS. */
(function () {
  "use strict";

  var doc = document;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- instrumentation ---------- */
  function track(name, params) {
    var payload = Object.assign({ event: name }, params || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (window.gtag) window.gtag("event", name, params || {});
  }

  doc.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    var name = el.getAttribute("data-track");
    if (name === "form_submit_click") return; // handled with the submit itself
    track(name, {
      location: el.getAttribute("data-location") || undefined,
      residence: el.getAttribute("data-residence") || undefined,
      label: (el.textContent || "").trim().slice(0, 60),
    });
  });

  /* ---------- scroll depth (50, 90) ---------- */
  var depthsFired = {};
  function checkDepth() {
    var h = doc.documentElement;
    var max = h.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = Math.round(((window.scrollY || h.scrollTop) / max) * 100);
    [50, 90].forEach(function (d) {
      if (pct >= d && !depthsFired[d]) {
        depthsFired[d] = true;
        track("scroll_depth", { percent: d });
      }
    });
  }

  /* ---------- header state + sticky CTA ---------- */
  var head = doc.querySelector(".site-head");
  var sticky = doc.querySelector(".sticky-cta");
  var hero = doc.querySelector(".hero");
  var brief = doc.getElementById("brief");
  var heroGone = false;
  var briefOnScreen = false;

  function updateSticky() {
    if (!sticky) return;
    var show = heroGone && !briefOnScreen;
    sticky.classList.toggle("is-visible", show);
    sticky.setAttribute("aria-hidden", show ? "false" : "true");
    var a = sticky.querySelector("a");
    if (a) a.tabIndex = show ? 0 : -1;
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        heroGone = !entries[0].isIntersecting;
        head.classList.toggle("is-scrolled", heroGone);
        updateSticky();
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    ).observe(hero);

    new IntersectionObserver(
      function (entries) {
        briefOnScreen = entries[0].isIntersecting;
        updateSticky();
      },
      { threshold: 0.08 },
    ).observe(brief);
  } else {
    head.classList.add("is-scrolled");
  }

  /* ---------- reveals ---------- */
  var reveals = doc.querySelectorAll(".reveal, .reveal-wipe");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        checkDepth();
        ticking = false;
      });
    },
    { passive: true },
  );

  /* ---------- residence → brief prefill ---------- */
  var residenceInput = doc.getElementById("f-residence");
  var residenceNote = doc.getElementById("f-residence-note");
  var residenceClear = doc.getElementById("f-residence-clear");
  var briefField = doc.getElementById("f-brief");

  function setResidence(name) {
    residenceInput.value = name || "";
    residenceNote.hidden = !name;
    residenceNote.querySelector("strong").textContent = name || "";
  }

  doc.querySelectorAll("[data-residence]").forEach(function (a) {
    a.addEventListener("click", function () {
      setResidence(a.getAttribute("data-residence"));
      // Give the browser time to scroll, then focus the field that matters.
      setTimeout(
        function () {
          briefField.focus({ preventScroll: true });
        },
        reduced ? 0 : 700,
      );
    });
  });

  if (residenceClear) {
    residenceClear.addEventListener("click", function () {
      setResidence("");
    });
  }

  /* ---------- form ---------- */
  var form = doc.getElementById("brief-form");
  var success = doc.getElementById("brief-success");
  var status = form.querySelector(".form__status");
  var started = false;
  var submitted = false;

  form.addEventListener(
    "focusin",
    function () {
      if (started) return;
      started = true;
      track("form_start");
    },
    { once: true },
  );

  function fieldWrap(input) {
    return input.closest(".field");
  }

  function setError(input, msg) {
    var wrap = fieldWrap(input);
    var out = wrap.querySelector(".field__error");
    wrap.classList.toggle("is-invalid", !!msg);
    if (out) out.textContent = msg || "";
    if (msg) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function validate() {
    var ok = true;
    var first = null;
    form.querySelectorAll("[required]").forEach(function (input) {
      var v = input.value.trim();
      var msg = "";
      if (!v) msg = "Please add this.";
      else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        msg = "That email does not look right.";
      setError(input, msg);
      if (msg && !first) first = input;
      if (msg) ok = false;
    });
    if (first) first.focus();
    return ok;
  }

  form.querySelectorAll("[required]").forEach(function (input) {
    input.addEventListener("input", function () {
      if (fieldWrap(input).classList.contains("is-invalid"))
        setError(input, "");
    });
  });

  function filledCount() {
    var n = 0;
    form
      .querySelectorAll(
        "input:not([type=hidden]):not([type=radio]), textarea, select",
      )
      .forEach(function (i) {
        if (i.value.trim()) n++;
      });
    return n;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");
    if (!validate()) return;

    var data = new FormData(form);
    var budget = data.get("budget") || "";
    var timing = data.get("timing") || "";
    var button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Sending…";

    function done() {
      submitted = true;
      track("form_submit", {
        budget: budget,
        timing: timing,
        residence: data.get("residence") || undefined,
      });
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }

    function fail() {
      button.disabled = false;
      status.textContent =
        "That did not send. Please try again, or email us directly.";
      status.classList.add("is-error");
    }

    var action = form.getAttribute("action");
    if (!action) {
      // No endpoint configured yet: show the success state so the flow can be reviewed.
      setTimeout(done, 500);
      return;
    }

    fetch(action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (r) {
        if (r.ok) done();
        else fail();
      })
      .catch(fail);
  });

  window.addEventListener("pagehide", function () {
    if (started && !submitted)
      track("form_abandon", { fields_filled: filledCount() });
  });
})();
