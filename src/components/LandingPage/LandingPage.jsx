import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
require('dotenv').config();

function LandingPage() {
   const [heading, setHeading] = useState('Welcome');
   const history = useHistory();

  return (
    <div className="container">
      <h1>{heading}</h1>
      <h2>To get started, simply enter a valid WarcraftLogs report URL or report code in the input above.</h2>
    </div>
  );
}

export default LandingPage;
