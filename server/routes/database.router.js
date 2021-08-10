const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.get('/newitem/:search', (req, res) => { // sent on search submit, gets data from API and stores it in our database
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
         res.send(response.data)// send our data back
      })
      .catch(error => {
         console.log(error); // catch errors in second axios call (since it is nested inside the first call)
      });
   })
   .catch(error => {
      console.log(error); // catch errors in first axios call
   });
}); // end of database report post


router.post('/additem', (req, res) => { // adds the searched for report to our database for user page displaying
   let guildFaction = "none"; // default value for inserting into DB since PostgreSQL default is finicky
   let guildName = "none"; // default value for inserting into DB since PostgreSQL default is finicky
   let guildServer = "none"; // default value for inserting into DB since PostgreSQL default is finicky
   const reportItem = req.body.data.data.reportData.report;
   const date = new Date(reportItem.startTime); // sets a date for the report
   const start = date.toLocaleDateString("en-US");
   let qText = `INSERT INTO "reports" (report_code, report_name, guild_faction, guild_name, guild_server, zone, date)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`; // main query to send
   if (reportItem.guild === null) {
      guildFaction = "none";
      guildName = "none";
      guildServer = "none";
   }
   else if (reportItem.guild !== null) {
      guildFaction = reportItem.guild.faction.name;
      guildName = reportItem.guild.name;
      guildServer = reportItem.guild.server.name;
   };
   pool.query(qText, [reportItem.code, reportItem.title, guildFaction, guildName, guildServer, reportItem.zone.name, start ])
   // call our query with the data we want it to have 
   .then (() => 
      res.sendStatus(201)
   )
   .catch (error => { // catches any errors and console.logs them
      console.log(error);
      res.sendStatus(500);
   });
});


router.post('/addfavorite/:favorite', (req, res) => { // adds a report to the users database info
   let qText = `SELECT favorites FROM "user" WHERE id = $1`; // main query to send
   pool.query(qText, [req.user.id])
   .then (results => {
      let favoritesArray = results.rows[0].favorites;
      favoritesArray.push(req.params.favorite);
      let qText = `UPDATE "user" SET favorites = $1 WHERE id = $2`; // main query to send
      pool.query(qText, [favoritesArray, req.user.id])
      .then (() => 
         res.sendStatus(201)
      )
      .catch (error => { // catches any errors and console.logs them
         console.log(error);
         res.sendStatus(500);
      });
   })
   .catch (error => { // catches any errors and console.logs them
      console.log(error);
      res.sendStatus(500);
   });
});


router.post('/removefavorite/:favorite', (req, res) => { // adds a report to the users database info
   let qText = `SELECT favorites FROM "user" WHERE id = $1`; // main query to send
   pool.query(qText, [req.user.id])
   .then (results => {
      let favoritesList = results.rows[0].favorites; // set an array to our response
      let itemToRemove = req.params.favorite; // set our item to filter out to our given param
      favoritesList = favoritesList.filter((item) => { // delete item from favorites array
         return item !== itemToRemove;
      });
      let qText = `UPDATE "user" SET favorites = $1 WHERE id = $2`; // main query to send
      pool.query(qText, [favoritesList, req.user.id])
      .then (() => 
         res.sendStatus(201)
      )
      .catch (error => { // catches any errors and console.logs them
         console.log(error);
         res.sendStatus(500);
      });
   })
   .catch (error => { // catches any errors and console.logs them
      console.log(error);
      res.sendStatus(500);
   });
});


router.get('/getdb', (req, res) => { // gets database of reports for displaying on the user page
   let qText = `SELECT * FROM "reports"`; // main query to send
   pool.query(qText)
   .then (results => 
      res.send(results.rows)
   )
   .catch (error => { // catches any errors and console.logs them
      console.log("Error in getdb:", error);
      res.sendStatus(500);
   })
});

router.get('/checkdb', (req, res) => { // gets database of reports for displaying on the user page
   let qText = `SELECT report_code FROM "reports"`; // main query to send
   pool.query(qText)
   .then (results => 
      res.send(results.rows)
   )
   .catch (error => { // catches any errors and console.logs them
      console.log("Error in checkdb:", error);
      res.sendStatus(500);
   })
});



router.get('/getfavorites', (req, res) => { // gets the users personal favorites
   res.send(req.user.favorites);
});


router.post('/postcharacter/', (req, res) => { // post the users submitted character
   let qText = `UPDATE "user" SET character = $1, armory = $2 WHERE id = $3`; // main query to send
   pool.query(qText, [req.body.name, req.body.armory, req.user.id])
   .then (results => 
      res.send(results.rows)
   )
   .catch (error => { // catches any errors and console.logs them
      console.log('Error in postCharacter:', error);
      res.sendStatus(500);
   })
});


module.exports = router;