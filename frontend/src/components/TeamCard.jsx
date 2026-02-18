import "../App.css";

function TeamCard({ team, allHostServices }) {
  // Flatten services for quick lookup
  const serviceMap = {};
  team.hosts.forEach((host) => {
    host.services.forEach((svc) => {
      serviceMap[`${host.name} - ${svc.name}`] = svc.up;
    });
  });

  return (
    <tr className="team-row">
      <td className="team-cell">{team.name}</td>

      {allHostServices.map((hs, i) => (
        <td key={i} className="service-cell">
          <span
            className={`status-dot ${
              serviceMap[hs] === true ? "up" : serviceMap[hs] === false ? "down" : ""
            }`}
          />
        </td>
      ))}

      <td className="score-cell">{team.score}</td>
    </tr>
  );
}

export default TeamCard;
