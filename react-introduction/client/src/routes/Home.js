import React from 'react';
import './styles/Home.css';
import homeImg from '../components/storage/home.jpg';

function Home() {
    return (
      <div className="home-container">
        <div className="home-content">
            <img src={homeImg} alt="home" />
          <h1>Kuchařka</h1>
        </div>
      </div>
    );
  }

export default Home;