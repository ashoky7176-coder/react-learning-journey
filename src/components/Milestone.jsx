function Milestone({ milestone }) {
  const statusClass = milestone.status.toLowerCase().replaceAll(" ", "-");

  return (
    <article className="milestone-row">
      <div className="milestone-copy">
        <strong>{milestone.title}</strong>
        <span>{milestone.course} · Due {milestone.due}</span>
      </div>
      <div className="milestone-result">
        <span className={`status-pill status-${statusClass}`}>
          {milestone.status}
        </span>
        {milestone.score !== null && (
          <span className="milestone-score">{milestone.score}%</span>
        )}
      </div>
    </article>
  );
}

export default Milestone;


