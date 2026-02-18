import React, { useState, useEffect } from "react"; 
import TeamCard from "../components/TeamCard";
// import data from "../data/hosts.json"; // local data

function Home() {

  // const { teams } = data;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const REFRESH_INTERVAL = 5000; // in ms, so its actually 5 seconds

  // fetch data from backend
  useEffect(() => {
    // 1. Function to handle the actual fetching logic
    const fetchData = () => {
      fetch("/scores") 
        .then((res) => {
          if (!res.ok) {
            // Log the error but don't crash the timer
            console.error(`Fetch failed with status: ${res.status}`);
            throw new Error(`HTTP status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // Set the teams state with the fetched data
          setTeams(data.teams || []);
          // Set loading to false only if it was true (i.e., on initial success)
          if (loading) setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch team data:", err);
          // Only set loading to false if it hasn't been done yet
          if (loading) setLoading(false);
        });
    };

    // 2. Call it immediately for the initial load
    fetchData();

    // 3. Set up the interval for continuous refresh
    const intervalId = setInterval(fetchData, REFRESH_INTERVAL);

    // 4. Return the cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  // The empty dependency array means this useEffect runs only on mount/unmount
  }, []); 


  // Collect all host-service combinations for table headers
  const allHostServices = [];
  teams.forEach((team) => {
    team.hosts.forEach((host) => {
      host.services.forEach((svc) => {
        const key = `${host.name} - ${svc.name}`;
        if (!allHostServices.includes(key)) {
          allHostServices.push(key);
        }
      });
    });
  });

  // if loading cant display
  if (loading) {
    return <div>Loading scores...</div>;
  }

  // make sure backend has data
  if (teams.length === 0) {
    return <div>No team data available. Please check the backend or your console (F12) for errors.</div>;
  }

  return (
    <div className="page home-page">
      <h1 className="team-title">Team Service Overview</h1>

      <div className="table-container">
        <table className="team-table">
          <thead>
            <tr>
              <th>Team Name</th>
              {allHostServices.map((hs, i) => (
                <th key={i}>{hs}</th>
              ))}
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <TeamCard key={i} team={team} allHostServices={allHostServices} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;