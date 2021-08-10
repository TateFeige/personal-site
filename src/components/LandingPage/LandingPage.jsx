import React from 'react';
import './LandingPage.css';
require('dotenv').config();

function LandingPage() {
  return (
    <div className="container">
      <h1>Welcome to Warcraftlogs Simplifier</h1>
      <h2>To get started, simply enter a valid WarcraftLogs report URL or report code in the input above.</h2>
    </div>
  );
};


export default LandingPage;