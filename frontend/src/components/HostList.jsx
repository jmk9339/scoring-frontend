// src/components/HostList.jsx
import HostCard from "./HostCard";

function HostList({ hosts }) {
  return (
    <div className="host-list">
      {hosts.map((host) => (
        <HostCard key={host.id} host={host} />
      ))}
    </div>
  );
}

export default HostList;
