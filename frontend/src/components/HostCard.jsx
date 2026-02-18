// each individual host card that shows in a host list

function HostCard({ host }) {
  return (
    <div className="host-card">
      <h2>
        <span className="icon">{host.icon}</span> {host.name}
      </h2>
      <ul>
        {host.services.map((service, i) => (
          <li key={i}>
            <span
              className={`status-dot ${service.up ? "up" : "down"}`}
            ></span>
            {service.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HostCard;