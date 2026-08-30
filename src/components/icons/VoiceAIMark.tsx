/**
 * The Voice AI app mark: a microphone capsule cut by the neon waveform.
 *
 * Drawn from primitives rather than a traced path so it stays crisp at the
 * sidebar's 24px as well as at logo sizes, and so both halves can be themed —
 * the capsule follows `--color-text` (via `fill-text`) while the bars take the
 * neon accent, matching the wordmark.
 */
const VoiceAIMark = ({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) => (
  <svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Mic capsule + stand, in the text color so the mark reads on any surface */}
    <g className="fill-text">
      <rect x="18" y="5" width="12" height="21" rx="6" />
      <path d="M24 38a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 21 42.5V41a3 3 0 0 1 3-3Z" />
    </g>
    {/* Cradle arc, drawn open so the waveform reads through it */}
    <path
      d="M12 22.5a12 12 0 0 0 24 0"
      className="stroke-text"
      strokeWidth="3.4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M24 34.5v4"
      className="stroke-text"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
    {/* Neon waveform across the capsule — the accent half of the mark */}
    <g className="logo-primary">
      <rect x="20.4" y="12" width="1.9" height="8" rx="0.95" />
      <rect x="23.05" y="9" width="1.9" height="14" rx="0.95" />
      <rect x="25.7" y="13.5" width="1.9" height="5" rx="0.95" />
    </g>
  </svg>
);

export default VoiceAIMark;
