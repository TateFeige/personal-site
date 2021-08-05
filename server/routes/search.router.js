const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();


router.get('/search/:search', (req, res) => {
   const search = req.params.search;
   //console.log(`${process.env.WARCRAFTLOGS_SEARCH_ENDPOINT}/report/fights/${search}?api_key=${process.env.WARCRAFTLOGS_API_KEY}`); // check for correct API url
   axios.get(`${process.env.WARCRAFTLOGS_SEARCH_ENDPOINT}/report/fights/${search}?api_key=${process.env.WARCRAFTLOGS_API_KEY}`)
   .then (response => {
      //console.log(response.data); // test function
      res.send (response.data);
   })
   .catch (error => {
      console.log('Error in search.router.js', error);
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


