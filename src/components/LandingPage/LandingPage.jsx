import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
require('dotenv').config();
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
   const [heading, setHeading] = useState('Welcome');
   const history = useHistory();

   const onLogin = (event) => {
      history.push('/login');
   };

   const test = () => {
      const qs = require('qs');
      const dataString = qs.stringify({
      'grant_type': 'client_credentials' 
      });
      var config = {
      method: 'POST',
      url: 'https://www.warcraftlogs.com/oauth/token',
      headers: { 
         'Authorization': 'Basic OTQxNGZjNzktNzc2NS00MDg3LWIwOWYtOWM1Yzc2YzIxOWQ1OnlsT3VITks0M0l0QzNqNHhIUUxwekZLbmwzcG9GU1haU0Jnd1pPUk4=', 
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : dataString,
      };
      axios(config)
      .then(response => {
      console.log(response.data);
      var data = JSON.stringify({
         query: `{
         reportData {
           report(code: "6Lg3ctnvF8HmRbZp") {
             rankings
           }
         }
       }`,
         variables: {}
       });
       
       var config = {
         method: 'POST',
         url: 'https://www.warcraftlogs.com/api/v2/client',
         headers: { 
           'Accept': 'application/json', 
           'Authorization': `Bearer ${response.data.access_token}`, 
           'Content-Type': 'application/json', 
           //  'Cookie': 'XSRF-TOKEN=eyJpdiI6ImZYZVp2Uytidm5Md1VGTEM2WDRrbmc9PSIsInZhbHVlIjoiL3dsTmhGVS9FNElsVEw3YVc5aFg0Z0xpcGcwMUVyNlZSU3d3Uml4K0RyMzFrR1YyTjlBUzJ5MlUzdXJGVkZLSkZTdmp1RUR6cjU1WVhONnFnSjIrdWV4cmNJazVLREJPV2RKZXZGbGszK0M0Y2t6SVQzVGpYelNNc3huMENUSk0iLCJtYWMiOiI4ZDE4MGJlMDVmYWI5YzgxYzdiOWIxYTg4YzIzMTE2YjdmYTMzMTExMTA4MjNjOWI5MjcwYmY0NTVhN2RkZGE0In0%3D; wcl_session=eyJpdiI6InhIOEVpVFRyeFpUN0M5YmVWN3RqUWc9PSIsInZhbHVlIjoiWGxQTG9reks1blBsUmc1Um5yTktNRzk3eEpHQndZc2MyNjNReXhFNTRPR3d0bzFhWWRDWFRkZi9nUExZdVk0RWVGWXlBZFpvTXNrSVRzMW43dGVnelNFV1FwV0IxdS9qZUZPWE1GellhakhhV2hTNDlFK3VKby96SUFUVlJUWFAiLCJtYWMiOiI1Y2UxYTRlOGY1MGY1NmY3NjBlMjQ0Yjc1ZjhlM2U4Mzg1YTczMWM2YjljODNjMTUyNGU2ZWI1NDE3YjBlY2RkIn0%3D'
         },
         data : data
       };
       
       axios(config)
       .then(function (response) {
         console.log(response.data.data.reportData.report);
       })
       .catch(function (error) {
         console.log(error);
       });
      })
      .catch(error => {
      console.log(error);
      });
  }

 
      

  return (
    <div className="container">
      <h2>{heading}</h2>
      <button onClick={test}>Test</button>
      <div className="grid">
        <div className="grid-col grid-col_8">
        </div>
        
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
