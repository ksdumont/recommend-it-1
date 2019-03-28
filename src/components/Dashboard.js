import React from "react";
import Navbar from "./Navbar";

const Dashboard = props => {
  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>RecommendIt Dashboard</h2>
        <p>lorem ipsum</p>
      </div>
    </main>
  );
};

export default Dashboard;
