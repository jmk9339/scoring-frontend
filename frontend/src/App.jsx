// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import Service from "./pages/Service";
import Background from "./components/Background";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Background />

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/service">Service Map</Link>
        <Link to="/team-alpha">Team Alpha</Link>
        <Link to="/team-bravo">Team Bravo</Link>
        <Link to="/team-charlie">Team Charlie</Link>
      </nav>

       <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/:teamName" element={<TeamPage />} /> 
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
