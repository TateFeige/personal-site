const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.get('/newitem/:search', (req, res) => { // main request to post search query to database
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
      console.log(response.data);
      var data = JSON.stringify({ // main graphQL query, converted a string so axios can use it
         query: `{
            reportData {
              report(code: "${search}") {
                code
                guild{faction{name} name server{name}}
                zone{name}
                region{name}
                startTime
                title
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
         //console.log(response.data.data.reportData.report); // test function
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


router.post('/additem', (req, res) => {
   const reportItem = req.body.data.data.reportData.report;
   const date = new Date(reportItem.startTime); // sets a date for the report
   const start = date.toLocaleDateString("en-US")
   console.log('favorite item is:', reportItem);
   let qText = `INSERT INTO "reports" (report_code, report_name, guild_faction, guild_name, guild_server, zone, date)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
   pool.query(qText, [reportItem.code, reportItem.title, reportItem.guild.faction.name , reportItem.guild.name, reportItem.guild.server.name, reportItem .zone.name, start ])
   .then (() => 
      res.sendStatus(201)
   )
   .catch (error => {
      console.log(error);
      res.sendStatus(500);
   });
});


router.get('/addfavorite/:favorite', (req, res) => {
   console.log('req is:', req.params.favorite);
   console.log(req.user.id);
   let qText = `SELECT favorites FROM "user" WHERE id = $1`;
   pool.query(qText, [req.user.id])
   .then (results => {
      console.log(results.rows[0].favorites);
      const favoritesArray = results.rows[0].favorites;
      favoritesArray.push(req.params.favorite);
      console.log(favoritesArray);
      let qText = `UPDATE "user" SET favorites = $1 WHERE id = $2`;
      pool.query(qText, [favoritesArray, req.user.id])
      .then (() => 
         res.sendStatus(201)
      )
      .catch (error => {
         console.log(error);
         res.sendStatus(500);
      });
   })
   .catch (error => {
      console.log(error);
      res.sendStatus(500);
   });
});


module.exports = router;