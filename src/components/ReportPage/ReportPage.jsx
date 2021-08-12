//Main imports
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReportItem from '../ReportItem/ReportItem';
import axios from 'axios';
import './ReportPage.css';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({table: {minWidth: 700}});
const TableHead = withStyles((theme) => ({
   root: {
      color: "white",
      backgroundColor: "#322a24",
      backgroundImage: `url(${"https://d2ertrwg9e34np.cloudfront.net/original/1X/41869db9dbc5e39ec78a2318471c9e61cb35d294.jpg"})`,
      backgroundPosition: "center top -60px",
      backgroundRepeat: "round",
      backgroundBlendMode: "exclusion",
   }
 }))(MuiTableHead);
 
 const TableHeaderCell = withStyles((theme) => ({
   root: {
      color: "MediumSpringGreen",
      fontSize: "22px",
      border: "1px solid white"
   }
 }))(TableCell);

const affixesHandler = (affix) => { // converts affix ID given from API call to its corresponding name
   switch (affix) {
      case 1:
         return "Overflowing";
      case 2:
         return "Skittish";
      case 3:
         return "Volcanic";
      case 4:
         return "Necrotic";
      case 5:
         return "Teeming";
      case 6:
         return "Raging";
      case 7:
         return "Bolstering";
      case 8:
         return "Sanguine";
      case 9:
         return "Tyrannical";
      case 10:
         return "Fortified";
      case 11:
         return "Bursting";
      case 12:
         return "Grievous";
      case 13:
         return "Explosive";
      case 14:
         return "Quaking";
      case 15:
         return "Relentless";
      case 16:
         return "Infested";
      case 117:
         return "Reaping";
      case 119:
         return "Beguiling";
      case 120:
         return "Awakened";
      case 121:
         return "Prideful";
      case 122:
         return "Inspiring";
      case 123:
         return "Spiteful";
      case 124:
         return "Storming";
      case 128:
         return "Tormented";
      default:
         return "Unknown";
   };
};


function ReportPage() { // main function for this page
   function getSearchQueryByFullURL(url) {return url.split('/').pop()};
   const history = useHistory();
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const reportInfo = useSelector((store) => store.report);
   const difficultyConverter = (difficulty) => { switch (difficulty.difficulty) {case 1: return "Looking For Raid"; case 3: return "Normal"; case 4: return "Heroic"; case 5: return "Mythic"; case 10: return `Mythic+`;  default: return `Unknown`;};};
   // function to convert difficulty (given from API as a number) to a string (so it can be read by the user)
   useEffect(() => { // get data on page load
      dispatch({ // main API call for the search query, returns some core information and the damage report
         type: 'SEARCH',
         payload: getSearchQueryByFullURL(window.location.href)
      });
   }, []);

   const favoriteHandler = () => { // adds the searched for report to the user's favorites on the database
      dispatch({
         type: 'ADD_TO_FAVORITES',
         payload: (reportInfo.id)
      });
   };

   const refreshHandler = () => { // adds the searched for report to the user's favorites on the database
      dispatch({ // sends out another search request when refresh icon is clicked; so the user can update the data without re-entering the search
         type: 'SEARCH',
         payload: reportInfo.id
      });
   };

   const getAffixes = (affixes) => {
      let affixesArray = [];
      if (affixes == [] || affixes == undefined) {
         return "none";
      }
      if (affixes !== []) {
         for (let x = 0; x < affixes.length; x++) {
            affixesArray.push(affixesHandler(affixes[x]));
         }; 
      };
      return affixesArray;
   };

   

   return (
      <Box aria-label="report page">
         <Grid container justifyContent="center" aria-label="report header">
            <IconButton color="primary" aria-label="Refresh Report" onClick={refreshHandler}><RefreshIcon /></IconButton>
            <h1 align="center">{reportInfo.name}</h1>
            {( user.id >= 1 ) ?
            <IconButton color="primary" aria-label="Add to favorites" onClick={favoriteHandler}><StarBorderIcon /></IconButton>
            :
            <></>}
         </Grid>
         <br /><br /><br />
         <Grid container justifyContent="center">
            {( report == [] ) ?
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>
            :
            <Box style={{width: "85%"}} aria-label="Report Table Container">
               <TableContainer component={Paper} style={{backgroundColor: '#242424', color: 'white'}}>
                  <Table className={classes.table} aria-label="Report Table">
                  <caption style={{borderLeft: "1px solid white", borderRight: "1px solid white", borderBottom: "1px solid white", color: "white"}}>
                     Report Table
                  </caption>
                     <TableHead>
                        <TableRow>
                           <TableHeaderCell align="left" width="15%">Difficulty</TableHeaderCell>
                           <TableHeaderCell align="center">Boss</TableHeaderCell>
                           <TableHeaderCell align="left" width="15%">Length (minutes)</TableHeaderCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {report.map((reportItem) => {
                           return (
                              <ReportItem id={reportItem.fightID} url={reportInfo.id} difficulty={difficultyConverter({difficulty: reportItem.difficulty, data: reportItem})} name={reportItem.encounter.name} length={reportItem.duration} keystoneLevel={reportItem.bracket} affixes={getAffixes(reportItem.affixes)}/>
                        );})}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Box>
            }
         </Grid>
      </Box>
   );
}; // end of main function for this page


export default ReportPage;