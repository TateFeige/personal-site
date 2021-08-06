const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();


router.post('/postoverview', (req, res) => {
   const overview = req.body;
   console.log('Overview has:', overview); // test function
   //console.log('adding:', overview.title, start);
   let qText = `INSERT INTO "overview" (report_url, report_name, zone, date)
   VALUES ($1, $2, $3, $4) RETURNING id`;
   pool.query(qText, [overview.url, overview.title, overview.zone, overview.date])
   .then (() => 
      res.sendStatus(201)
   )
   .catch (error => {
      console.log('Error in postoverview', error);
      res.sendStatus(500);
   });
 });

router.post('/addFavorite', (req, res) => {
   const favorite = req.body.data.data.reportData.report;
   const date = new Date(favorite.startTime); // sets a date for the report
   const start = date.toLocaleDateString("en-US")
   console.log('favorite item is:', favorite);
   let qText = `INSERT INTO "reports" (report_code, report_name, guild_faction, guild_name, guild_server, zone, date)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
   pool.query(qText, [favorite.code, favorite.title, favorite.guild.faction.name , favorite.guild.name, favorite.guild.server.name, favorite.zone.name, start ])
   .then (() => 
      res.sendStatus(201)
   )
   .catch (error => {
      console.log(error);
      res.sendStatus(500);
   });
});


module.exports = router;