import { useParams } from "react-router-dom";
import HostCard from "../components/HostCard";
import data from "../data/hosts.json";
import "../App.css";

function TeamPage() {
  const { teamName } = useParams();

  // teamName is like "team-alpha" → remove "team-" if present
  const cleanName = teamName.replace("team-", "").toLowerCase();

  const team = data.teams.find(
    (t) => t.name.toLowerCase() === cleanName
  );

  if (!team) {
    return (
      <div className="page">
        <h1 className="team-title">Team Not Found</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="team-title">{team.name} Team</h1>

      <div className="dashboard-grid">
        {team.hosts.map((host, i) => (
          <HostCard key={i} host={{ ...host, icon: team.icon }} />
        ))}
      </div>
    </div>
  );
}

export default TeamPage;
