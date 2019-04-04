import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import firebase from "../firebase";
import { Link } from "react-router-dom";

const Category = props => {
  const [recommendations, setrecommendations] = useState([]);
  const [authors, setauthors] = useState({});

  useEffect(() => {
    let tempAuthors = {};
    firebase.getAuthors().then(results => {
      results.forEach(doc => {
        tempAuthors[doc.data().uid] = doc.data().username;
      });
      setauthors(tempAuthors);
      firebase
        .getRecommendationsByCategory(props.match.params.category)
        .then(recommendations => {
          let newReviews = [];

          recommendations.forEach(recommendation => {
            newReviews.push({
              id: recommendation.id,
              data: recommendation.data().recommendation
            });
          });
          setrecommendations(newReviews);
        });
    });
  }, []);

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Recommendations: {props.match.params.category}</h2>
        <h3>Current Recommendations ({recommendations.length}):</h3>

        <div className="tile">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{recommendation.data.title}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  {recommendation.data.recommendation}
                </div>
              </div>
              <footer className="card-footer">
                <a
                  href={`/category/${recommendation.data.category}`}
                  className="card-footer-item"
                >
                  {recommendation.data.category}
                </a>
                <a
                  href={`/author/${recommendation.data.author}`}
                  className="card-footer-item"
                >
                  {authors[recommendation.data.author]}
                </a>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Category;
