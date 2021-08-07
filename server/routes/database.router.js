const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();


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


module.exports = router;