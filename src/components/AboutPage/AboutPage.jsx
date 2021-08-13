import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

function AboutPage() {
  return (
      <div style={{textAlign: "center"}}>
            <Typography variant="h4" gutterBottom><u>How to use:</u></Typography>
            <Typography variant="body1" gutterBottom style={{fontSize: "18px"}}>
               Grab either a full combat log report link &#40;<a href="https://www.warcraftlogs.com/reports/JvmnWxjTrh1NX9Dc" title="https://www.warcraftlogs.com/reports/JvmnWxjTrh1NX9Dc" style={{color: "lightblue"}}>like this</a>&#41;
               or just the report code &#40;<a href="https://www.warcraftlogs.com/reports/JvmnWxjTrh1NX9Dc" title="JvmnWxjTrh1NX9Dc" style={{color: "lightblue"}}>like this</a>&#41; and enter it in the navigation bar search input.
               <br />
               You will then generate a report with all recorded <i>boss kills</i> logged in it, their length, and their difficulty (for Mythic+ dungeons, you will also get the keystone level and the affixes from when it was ran). Trash fights, wipes, and other non-boss encounters will not be displayed.
               <br />
               You should see something like upon success, if not then double check your report code and try again:
               <br />
               <img src="https://i.imgur.com/JaZKsZI.png" style={{height: "1000px"}}></img>
            </Typography>
            <br />
            <br />
            <Typography variant="body1" gutterBottom>Once you have your generated report page, you can click on any of the rows and it will take you to a page displaying each players DPS and HPS for the fight, as well as their rankings </Typography>
      </div>
  );
};


export default AboutPage;