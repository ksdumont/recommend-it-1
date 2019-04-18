import React from "react";
import Navbar from "./Navbar";

const HomePage = props => {
  return (
    <main>
      <Navbar className="navigation" {...props} />
      <div className="container">
        <h2>RecommendIt HomePage</h2>
        <p>lorem ipsum</p>
      </div>
    </main>
  );
};

export default HomePage;
