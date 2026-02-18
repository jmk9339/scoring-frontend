import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import localData from "../data/hosts.json"; // only if DEBUG
import "./Background.css";

const DEBUG = false;

// Example service → world position
const LOCATIONS = {
  "stalingrad - AD": { x: 10, y: 20 },
  "saint-petersburg - WinRM": { x: 50, y: 60 },
  "moscow - SMB": { x: 80, y: 30 },
  "dallas - IMAP": { x: 20, y: 70 },
  "dallas - NGINX": { x: 30, y: 80 },
  "chicago - SQL": { x: 70, y: 40 },
  "chicago - FTP": { x: 60, y: 50 },
};

function getServiceKey(hostName, svcName) {
  return `${hostName} - ${svcName}`;
}

export default function Background() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const [zoom, setZoom] = useState({ scale: 1, origin: "50% 50%" });
  const [teams, setTeams] = useState([]);
  const prevTeamsRef = useRef([]);

  const REFRESH_INTERVAL = 5000;

  // Function to compute default zoom for path (home/team pages)
  const getDefaultZoom = () => {
    if (path.includes("team-alpha")) return { scale: 2, origin: "0% 0%" };
    if (path.includes("team-bravo")) return { scale: 2, origin: "50% 0%" };
    if (path.includes("team-charlie")) return { scale: 2, origin: "100% 0%" };
    return { scale: 1, origin: "50% 50%" };
  };

  // Reset zoom whenever the path changes
  useEffect(() => {
    if (!path.includes("service")) {
      setZoom(getDefaultZoom());
    }
  }, [path]);

  // Service check + zoom only runs on /service
  useEffect(() => {
    if (!path.includes("service")) return;

    const fetchData = () => {
      const handleData = (data) => {
        const newTeams = data.teams || [];
        const oldTeams = prevTeamsRef.current;

        // Check for newly down services
        if (oldTeams && oldTeams.length > 0) {
          newTeams.forEach((newTeam) => {
            const oldTeam = oldTeams.find((t) => t.name === newTeam.name);
            if (!oldTeam) return;

            newTeam.hosts.forEach((newHost) => {
              const oldHost = oldTeam.hosts.find((h) => h.name === newHost.name);
              if (!oldHost) return;

              newHost.services.forEach((newSvc) => {
                const oldSvc = oldHost.services.find((s) => s.name === newSvc.name);
                if (!oldSvc) return;

                if (oldSvc.up && !newSvc.up) {
                  const key = getServiceKey(newHost.name, newSvc.name);
                  const loc = LOCATIONS[key];
                  if (loc) {
                    // Zoom animation
                    setZoom({ scale: 1, origin: "50% 50%" });
                    setTimeout(() => setZoom({ scale: 2, origin: `${loc.x}% ${loc.y}%` }), 300);
                  }
                }
              });
            });
          });
        }

        prevTeamsRef.current = newTeams;
        setTeams(newTeams);
      };

      if (DEBUG) handleData(localData);
      else {
        fetch("/scores")
          .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
          .then(handleData)
          .catch(console.error);
      }
    };

    fetchData(); // initial fetch
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [path]);

  return (
    <motion.div
      className="background"
      initial={false}
      animate={{ scale: zoom.scale, transformOrigin: zoom.origin }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="vignette" />
    </motion.div>
  );
}
