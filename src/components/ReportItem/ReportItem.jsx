//Main imports
import React from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

//MaterialUI imports
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 18,}}))(TableCell);


function ReportItem(item) { // main function for this page
   const history = useHistory();
   const dispatch = useDispatch();
   const millisToMinutesAndSeconds = (millis) => { // function to convert the fight length (given from API in milliseconds) to minutes:seconds (much more readable)
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
   };
   const bossImage = (bossName) => { // adds an image to the report table based on boss
      switch (bossName) {
         case "The Tarragrue":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2423-icon.jpg";
         case "The Eye of the Jailer":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2433-icon.jpg";
         case "The Nine":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2429-icon.jpg";
         case "Remnant of Ner'zhul":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2432-icon.jpg";
         case "Soulrender Dormazain":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2434-icon.jpg";
         case "Painsmith Raznal":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2430-icon.jpg";
         case "Guardian of the First Ones":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2436-icon.jpg";
         case "Fatescribe Roh-Kalo":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2431-icon.jpg";
         case "Kel'Thuzad":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2422-icon.jpg";
         case "Sylvanas Windrunner":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2435-icon.jpg"; 
         default:
            return "no image found";
      };
   };

   const fightSummary = (item) => {
      console.log('fightSummary item is:', item); // test function
      dispatch({ // send our boss item to be further broken down
         type: "BOSS_REPORT",
         payload: item
      });
      history.push(`/fight?report=${item.url}&boss=${item.name}&difficulty=${item.difficulty}`); // push the user to a page based on the report and its information
   };

   return (
      <TableRow onClick={() => fightSummary(item)} style={{color: 'white'}}>
        <StyledTableCell style={{color: 'white'}} align="left">{item.difficulty}</StyledTableCell>
        <StyledTableCell style={{color: 'white'}} align="left"><img src={bossImage(item.name)} />{item.name}</StyledTableCell>
        <StyledTableCell style={{color: 'white'}} align="left">{millisToMinutesAndSeconds(item.length)}</StyledTableCell>
      </TableRow>
   );
}; // end of main function for this page


export default ReportItem;