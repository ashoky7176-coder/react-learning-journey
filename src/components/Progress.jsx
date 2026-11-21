function Progress({ label, value, detail, compact = false }) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className={`progress-block${compact ? " is-compact" : ""}`}>
      <div className="progress-heading">
        <span>{label}</span>
        <strong>{progress}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      {detail && <span className="progress-detail">{detail}</span>}
    </div>
  );
}

export default Progress;