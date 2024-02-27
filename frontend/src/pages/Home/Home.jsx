// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Elige la categoría</h1>
      <Link to="/estatutaria" className="animated-button">Estatutaria</Link>
      <Link to="/laboral" className="animated-button">Laboral</Link>
    </div>
  );
};

export default Home;
