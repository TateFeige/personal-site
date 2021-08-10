const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.get('/search/:search', (req, res) => { // main search request, takes in URL from nav bar
   const search = req.params.search;
   const qs = require('qs'); // graphQL stuff
   const dataString = qs.stringify({ // graphQL stuff
      'grant_type': 'client_credentials' 
   });
   var config = { // first axios call, gets a token for authorization, uses dataString const for request body
      method: 'POST',
      url: 'https://www.warcraftlogs.com/oauth/token',
      headers: { 
         'Authorization': `Basic ${process.env.BASIC_AUTH}`, 
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : dataString,
   };
   axios(config) // runs our first axios call
   .then(response => {
      var data = JSON.stringify({ // main graphQL query, converted a string so axios can use it
         query: `{ 
            reportData {
               report(code: "${search}") {
                  code
                  startTime
                  title
                  rankings
               }
            }
         }`,
         variables: {}
      });
      var config = { // second axios call, uses our bearer token from the first call as authorization and requests our data variable as the data we want from the API
         method: 'POST',
         url: 'https://www.warcraftlogs.com/api/v2/client',
         headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${response.data.access_token}`, 
            'Content-Type': 'application/json'   
         },
         data : data
      };
      axios(config) // runs our second axios call
      .then(response => {
         res.send(response.data) // send our data back
         })
      .catch(error => { // catch errors in second axios call (since it is nested inside the first call)
         console.log(error);
      });
   })
   .catch(error => { // catch errors in first axios call
      console.log(error);
   });
}); // end of main search request


router.get('/healing/:search', (req, res) => { 
   // side request, sent alongside the main search request since we cannot get both DPS rankings and HPS rankings in the same graphQL call and thus need to make a second call to the API
   const search = req.params.search;
   const qs = require('qs'); // graphQL stuff
   const dataString = qs.stringify({ // graphQL stuff
   'grant_type': 'client_credentials' 
   });
   var config = { // first axios call, gets a token for authorization, uses dataString const for request body
      method: 'POST',
      url: 'https://www.warcraftlogs.com/oauth/token',
      headers: { 
         'Authorization': `Basic ${process.env.BASIC_AUTH}`, 
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : dataString,
   };
   axios(config) // runs our first axios call
   .then(response => {
      //console.log(response.data); // test function
      var data = JSON.stringify({ // main graphQL query, converted a string so axios can use it
         query: `{
            reportData {
               report(code: "${search}") {
                  rankings(playerMetric: hps)
               }
            }
         }`,
         variables: {}
      });
      var config = { // second axios call, uses our bearer token from the first call as authorization and requests our data variable as the data we want from the API
         method: 'POST',
         url: 'https://www.warcraftlogs.com/api/v2/client',
         headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${response.data.access_token}`, 
            'Content-Type': 'application/json'   
         },
         data : data
      };
      axios(config)// runs our second axios call
      .then(response => {
         res.send(response.data)// send our data back
      })
      .catch(error => {
         console.log(error); // catch errors in second axios call (since it is nested inside the first call)
      });
   })
   .catch(error => {
      console.log(error); // catch errors in first axios call
   });
}); // end of main healing request


module.exports = router;