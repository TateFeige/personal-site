const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();


router.get('/search/:search', (req, res) => {
   const search = req.params.search;
   const qs = require('qs');
   const dataString = qs.stringify({
   'grant_type': 'client_credentials' 
   });
   var config = {
   method: 'POST',
   url: 'https://www.warcraftlogs.com/oauth/token',
   headers: { 
      'Authorization': `Basic ${process.env.BASIC_AUTH}`, 
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
    
    var config = {
      method: 'POST',
      url: 'https://www.warcraftlogs.com/api/v2/client',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${response.data.access_token}`, 
        'Content-Type': 'application/json'   
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data.data.reportData.report);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
   })
   .catch(error => {
   console.log(error);
   });
});

router.get('/report/bossreport', (req, res) => {
   const query = req.params;
   console.log('req is:', req.query);
   axios.get(`${process.env.WARCRAFTLOGS_SEARCH_ENDPOINT}/report/tables/summary/${req.query.url}?start=${req.query.start_time}&end=${req.query.end_time}&api_key=${process.env.WARCRAFTLOGS_API_KEY}`)
   .then (response => {
      res.send (response.data);
   })
   .catch (error => {
      console.log('Error in getting boss report', error);
   });
});

module.exports = router;


// const test = () => {
//    const qs = require('qs');
//    const dataString = qs.stringify({
//    'grant_type': 'client_credentials' 
//    });
//    var config = {
//    method: 'POST',
//    url: 'https://www.warcraftlogs.com/oauth/token',
//    headers: { 
//       'Authorization': 'Basic OTQxNGZjNzktNzc2NS00MDg3LWIwOWYtOWM1Yzc2YzIxOWQ1OnlsT3VITks0M0l0QzNqNHhIUUxwekZLbmwzcG9GU1haU0Jnd1pPUk4=', 
//       'Content-Type': 'application/x-www-form-urlencoded',
//    },
//    data : dataString,
//    };
//    axios(config)
//    .then(response => {
//    console.log(response.data);
//    var data = JSON.stringify({
//       query: `{
//       reportData {
//         report(code: "${search}") {
//           rankings
//         }
//       }
//     }`,
//       variables: {}
//     });
    
//     var config = {
//       method: 'POST',
//       url: 'https://www.warcraftlogs.com/api/v2/client',
//       headers: { 
//         'Accept': 'application/json', 
//         'Authorization': `Bearer ${response.data.access_token}`, 
//         'Content-Type': 'application/json'   
//       },
//       data : data
//     };
    
//     axios(config)
//     .then(function (response) {
//       console.log(response.data.data.reportData.report);
//       res.send(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//    })
//    .catch(error => {
//    console.log(error);
//    });
// }