// Decorative, always-mounted blurred blob layer. Invisible in the default
// dark theme; fades in behind everything when data-theme="liquid" is active,
// so surfaces that turn translucent in that theme have color to blend with.
export default function LiquidBackground() {
  return (
    <div className="liquid-bg" aria-hidden="true">
      <span className="liquid-blob liquid-blob-1" />
      <span className="liquid-blob liquid-blob-2" />
      <span className="liquid-blob liquid-blob-3" />
      <span className="liquid-blob liquid-blob-4" />
    </div>
  );
}
