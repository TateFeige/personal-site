//Main imports
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MaterialUI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
         case "De Other Side":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12291-icon.jpg";
         case "Halls of Atonement":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12287-icon.jpg";
         case "Mists of Tirna Scithe":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12290-icon.jpg";
         case "The Necrotic Wake":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12286-icon.jpg";
         case "Plaguefall":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12289-icon.jpg";
         case "Sanguine Depths":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12284-icon.jpg";
         case "Spires of Ascension":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12285-icon.jpg";
         case "Theater of Pain":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12293-icon.jpg";
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
         case "Shriekwing":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2398-icon.jpg";
         case "Huntsman Altimor":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2418-icon.jpg";
         case "Hungering Destroyer":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2383-icon.jpg";
         case "Sun King's Salvation":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2402-icon.jpg";
         case "Artificer Xy'mox":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2405-icon.jpg";
         case "Lady Inerva Darkvein":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2406-icon.jpg ";
         case "The Council Of Blood":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2412-icon.jpg";
         case "Sludgefist":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2399-icon.jpg";
         case "Stone Legion Generals":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2417-icon.jpg";
         case "Sire Denathrius":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2407-icon.jpg";
         default:
            return "no image found";
      };
   };

   const fightSummary = (item) => {
      console.log(item);
      dispatch({ // send our boss item to be further broken down
         type: "BOSS_REPORT",
         payload: item
      });
      dispatch({ // send our boss item to be further broken down
         type: "HEALING_REPORT",
         payload: item
      });
      let params = new URLSearchParams();
      params.append('report', item.url);
      params.append('boss', item.name);
      params.append('difficulty', item.difficulty);
      params.append('id', item.id);
      params.toString();
      history.push({
         pathname: '/fight',
         search: `${params.toString()}`,
         state: { params: params }
       });
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