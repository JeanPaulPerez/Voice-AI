/**
 * The Voice AI wordmark: a neon waveform followed by the name, with "AI" in the
 * accent so the two halves of the identity read at a glance.
 *
 * The lettering is set in the system UI stack rather than shipped as outlines,
 * so `textLength`/`lengthAdjust` pin each word to a fixed advance width — the
 * mark keeps its proportions whatever font the host platform resolves.
 */
/** The wordmark is a brand mark, not copy: it is never translated. */
const WORDMARK = { name: "Voice", accent: "AI" } as const;

const VoiceAILogo = ({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 250 72"
    fill="none"
    className={className}
    role="img"
    aria-label="Voice AI"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Waveform: heights rise and fall around the optical centre (y=36) */}
    <g className="logo-primary">
      <rect x="2" y="27" width="5" height="18" rx="2.5" />
      <rect x="11" y="20" width="5" height="32" rx="2.5" />
      <rect x="20" y="10" width="5" height="52" rx="2.5" />
      <rect x="29" y="17" width="5" height="38" rx="2.5" />
      <rect x="38" y="24" width="5" height="24" rx="2.5" />
      <rect x="47" y="30" width="5" height="12" rx="2.5" />
    </g>
    <g
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontSize="40"
      fontWeight="700"
      dominantBaseline="central"
    >
      <text
        x="66"
        y="37"
        textLength="108"
        lengthAdjust="spacingAndGlyphs"
        className="fill-text"
        letterSpacing="-0.5"
      >
        {WORDMARK.name}
      </text>
      <text
        x="186"
        y="37"
        textLength="48"
        lengthAdjust="spacingAndGlyphs"
        className="logo-primary"
        letterSpacing="-0.5"
      >
        {WORDMARK.accent}
      </text>
    </g>
  </svg>
);

export default VoiceAILogo;
