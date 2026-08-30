#!/usr/bin/env python3
"""Generate Voice AI's brand assets — app icons and tray icons.

Everything is drawn from the same primitives in a 64-unit design space, then
supersampled and downscaled, so the whole set stays consistent and can be
regenerated after a design change instead of being hand-edited.

    python3 scripts/brand/generate_icons.py

Writes into src-tauri/icons/ and src-tauri/resources/. Requires Pillow.
"""

from __future__ import annotations

import pathlib
import sys

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:  # pragma: no cover - developer tooling
    sys.exit("Pillow is required: pip install pillow")

ROOT = pathlib.Path(__file__).resolve().parents[2]
ICONS = ROOT / "src-tauri" / "icons"
RESOURCES = ROOT / "src-tauri" / "resources"

# Brand palette — kept in step with src/styles/theme.css.
NEON = (41, 168, 255, 255)  # --dark-color-logo-primary
NEON_SOFT = (127, 212, 255, 255)  # --dark-color-logo-stroke
BLACK = (5, 7, 15, 255)  # --dark-color-background
WHITE = (255, 255, 255, 255)
INK = (17, 20, 28, 255)

SS = 8  # supersample factor; every shape is drawn at SSx then box-filtered down
UNIT = 64  # design-space edge


def _canvas(unit: int = UNIT) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("L", (unit * SS, unit * SS), 0)
    return img, ImageDraw.Draw(img)


def _box(x0: float, y0: float, x1: float, y1: float) -> list[float]:
    return [x0 * SS, y0 * SS, x1 * SS, y1 * SS]


def draw_mic(draw: ImageDraw.ImageDraw, value: int = 255) -> None:
    """The Voice AI mark: capsule, open cradle, stand and base."""
    draw.rounded_rectangle(_box(23, 7, 41, 38), radius=9 * SS, fill=value)
    # Cradle: an open ring, bottom half only, so it reads as a mic stand.
    draw.arc(_box(14, 12, 50, 48), start=0, end=180, fill=value, width=int(4.5 * SS))
    draw.rounded_rectangle(_box(30, 46, 34, 54), radius=1.5 * SS, fill=value)
    draw.rounded_rectangle(_box(21, 53, 43, 57), radius=2 * SS, fill=value)


def draw_waveform(draw: ImageDraw.ImageDraw, value: int = 255) -> None:
    """Four bars rising and falling around the centre line."""
    for x, half in ((21, 5), (28, 11), (35, 8), (42, 4)):
        draw.rounded_rectangle(
            _box(x, 32 - half, x + 4.5, 32 + half), radius=2.25 * SS, fill=value
        )


def draw_text_lines(draw: ImageDraw.ImageDraw, value: int = 255) -> None:
    """Three ragged lines — the transcript being written."""
    for y, (x0, x1) in ((25, (19, 45)), (32, (19, 41)), (39, (19, 36))):
        draw.rounded_rectangle(_box(x0, y, x1, y + 4.5), radius=2.25 * SS, fill=value)


def draw_bang(draw: ImageDraw.ImageDraw, value: int = 255) -> None:
    """Exclamation glyph, sized for the warning badge."""
    draw.rounded_rectangle(_box(30.5, 20, 33.5, 36), radius=1.5 * SS, fill=value)
    draw.ellipse(_box(30, 40, 34, 44), fill=value)


def _finish(mask: Image.Image, color: tuple[int, int, int, int], size: int) -> Image.Image:
    """Colorize an alpha mask and resample it down to `size`."""
    mask = mask.resize((size, size), Image.LANCZOS)
    out = Image.new("RGBA", (size, size), color[:3] + (0,))
    out.putalpha(mask)
    return out


def mark_silhouette(size: int, color: tuple[int, int, int, int]) -> Image.Image:
    """Plain mic, used for the idle tray state."""
    mask, draw = _canvas()
    draw_mic(draw)
    return _finish(mask, color, size)


def mark_in_disc(size: int, color: tuple[int, int, int, int], glyph) -> Image.Image:
    """A filled disc with `glyph` knocked out of it (recording / transcribing)."""
    mask, draw = _canvas()
    draw.ellipse(_box(3, 3, 61, 61), fill=255)
    glyph(draw, value=0)  # subtract the glyph from the disc
    return _finish(mask, color, size)


def mark_with_warning(size: int, color: tuple[int, int, int, int]) -> Image.Image:
    """Mic plus a badge in the lower-right, matching the idle silhouette."""
    mask, draw = _canvas()
    # Shrink the mic up and left so the badge has a corner to sit in.
    mic_mask, mic_draw = _canvas()
    draw_mic(mic_draw)
    mic_mask = mic_mask.resize((int(46 * SS), int(46 * SS)), Image.LANCZOS)
    mask.paste(mic_mask, (0, 0), mic_mask)

    badge = [36 * SS, 36 * SS, 62 * SS, 62 * SS]
    # Punch a transparent gap so the badge stays readable against the mic.
    draw.ellipse([badge[0] - 2 * SS, badge[1] - 2 * SS, badge[2] + 2 * SS, badge[3] + 2 * SS], fill=0)
    draw.ellipse(badge, fill=255)

    bang_mask, bang_draw = _canvas()
    draw_bang(bang_draw)
    bang_mask = bang_mask.resize((int(26 * SS), int(26 * SS)), Image.LANCZOS)
    # Knock the glyph out of the badge.
    region = mask.crop((badge[0], badge[1], badge[2], badge[3]))
    region = Image.composite(Image.new("L", region.size, 0), region, bang_mask)
    mask.paste(region, (int(badge[0]), int(badge[1])))
    return _finish(mask, color, size)


def app_icon(size: int) -> Image.Image:
    """Neon mic and waveform on the black brand ground, with a soft halo."""
    unit_px = UNIT * SS
    base = Image.new("RGBA", (unit_px, unit_px), (0, 0, 0, 0))
    ground = ImageDraw.Draw(base)
    # Squircle-ish ground; ~22% corner radius reads right on macOS and Windows.
    ground.rounded_rectangle([0, 0, unit_px - 1, unit_px - 1], radius=int(14 * SS), fill=BLACK)

    # Halo: the mark blurred and tinted, so the neon looks lit rather than flat.
    halo_mask, halo_draw = _canvas()
    halo_draw.rounded_rectangle(_box(25, 13, 39, 36), radius=7 * SS, fill=255)
    halo = Image.new("RGBA", (unit_px, unit_px), NEON_SOFT[:3] + (0,))
    halo.putalpha(halo_mask.filter(ImageFilter.GaussianBlur(radius=6 * SS)))
    base = Image.alpha_composite(base, Image.blend(Image.new("RGBA", base.size, (0, 0, 0, 0)), halo, 0.55))

    # Mic body, inset so the ground frames it.
    mic_mask, mic_draw = _canvas()
    mic_draw.rounded_rectangle(_box(25, 12, 39, 36), radius=7 * SS, fill=255)
    mic_draw.arc(_box(17, 17, 47, 47), start=0, end=180, fill=255, width=int(4 * SS))
    mic_draw.rounded_rectangle(_box(30.5, 44, 33.5, 50), radius=1.5 * SS, fill=255)
    mic_draw.rounded_rectangle(_box(23, 49, 41, 52.5), radius=1.75 * SS, fill=255)
    mic = Image.new("RGBA", (unit_px, unit_px), NEON[:3] + (0,))
    mic.putalpha(mic_mask)
    base = Image.alpha_composite(base, mic)

    # Waveform knocked out of the capsule in the lighter blue.
    wave_mask, wave_draw = _canvas()
    for x, half in ((28.4, 4), (31.4, 7.5), (34.4, 3)):
        wave_draw.rounded_rectangle(
            _box(x, 24 - half, x + 1.6, 24 + half), radius=0.8 * SS, fill=255
        )
    wave = Image.new("RGBA", (unit_px, unit_px), BLACK[:3] + (0,))
    wave.putalpha(wave_mask)
    base = Image.alpha_composite(base, wave)

    return base.resize((size, size), Image.LANCZOS)


def main() -> None:
    ICONS.mkdir(parents=True, exist_ok=True)
    RESOURCES.mkdir(parents=True, exist_ok=True)

    # --- App icons -------------------------------------------------------
    square_sizes = [30, 44, 71, 89, 107, 142, 150, 284, 310]
    written = 0
    for size in (32, 64, 128, 256, 512, 1024):
        app_icon(size).save(ICONS / f"{size}x{size}.png")
        written += 1
    # Tauri's canonical names
    (ICONS / "256x256.png").rename(ICONS / "128x128@2x.png")
    (ICONS / "512x512.png").rename(ICONS / "icon.png")
    (ICONS / "1024x1024.png").rename(ICONS / "logo.png")
    for size in square_sizes:
        app_icon(size).save(ICONS / f"Square{size}x{size}Logo.png")
        written += 1
    app_icon(50).save(ICONS / "StoreLogo.png")

    # Windows .ico — the sizes Tauri's bundler expects
    ico_sizes = [16, 24, 32, 48, 64, 256]
    app_icon(256).save(
        ICONS / "icon.ico", format="ICO", sizes=[(s, s) for s in ico_sizes]
    )
    # macOS .icns
    app_icon(1024).save(ICONS / "icon.icns", format="ICNS")

    # Android / iOS launcher sets, regenerated in place at their existing sizes
    for p in sorted((ICONS / "android").rglob("*.png")) + sorted((ICONS / "ios").glob("*.png")):
        size = Image.open(p).size[0]
        app_icon(size).save(p)

    # --- Tray icons ------------------------------------------------------
    # Light glyphs for dark menu bars, dark glyphs for light menu bars, and a
    # neon set for Linux, which always uses the colored theme.
    for suffix, color in (("", WHITE), ("_dark", INK)):
        mark_silhouette(64, color).save(RESOURCES / f"tray_idle{suffix}.png")
        mark_in_disc(64, color, draw_waveform).save(RESOURCES / f"tray_recording{suffix}.png")
        mark_in_disc(64, color, draw_text_lines).save(
            RESOURCES / f"tray_transcribing{suffix}.png"
        )
        mark_with_warning(64, color).save(RESOURCES / f"tray_idle_warning{suffix}.png")

    mark_silhouette(64, NEON).save(RESOURCES / "voice_ai.png")
    mark_in_disc(64, NEON, draw_waveform).save(RESOURCES / "recording.png")
    mark_in_disc(64, NEON, draw_text_lines).save(RESOURCES / "transcribing.png")
    mark_with_warning(64, NEON).save(RESOURCES / "voice_ai_warning.png")

    print(f"wrote app icons to {ICONS} and tray icons to {RESOURCES}")


if __name__ == "__main__":
    main()
