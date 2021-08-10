//Main imports
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReportItem from '../ReportItem/ReportItem';
import axios from 'axios';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const useStyles = makeStyles({table: {minWidth: 700}});


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

   return (
      <Box aria-label="report page">
         <Grid container justify="center" aria-label="report header">
            <IconButton color="primary" aria-label="Refresh Report" onClick={refreshHandler}><RefreshIcon /></IconButton>
            <h1 align="center">{reportInfo.name}</h1>
            {( user.id >= 1 ) ?
            <IconButton color="primary" aria-label="Add to favorites" onClick={favoriteHandler}><StarBorderIcon /></IconButton>
            :
            <></>}
         </Grid>
         <br /><br /><br />
         <Grid container justify="center">
            {( report == [] ) ?
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>:
            <Box style={{width: "85%"}} aria-label="Report Table Container">
               <TableContainer component={Paper} style={{backgroundColor: '#242424', color: 'white'}}>
                  <Table className={classes.table} aria-label="Report Table">
                     <caption>Report Table</caption>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell align="left" width="15%">Difficulty</StyledTableCell>
                           <StyledTableCell align="center">Boss</StyledTableCell>
                           <StyledTableCell align="left" width="15%">Length (minutes)</StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {report.map((reportItem) => {
                           return (
                                 <ReportItem id={reportItem.fightID} url={reportInfo.id} difficulty={difficultyConverter({difficulty: reportItem.difficulty, data: reportItem})} name={reportItem.encounter.name} length={reportItem.duration} keystoneLevel={reportItem.bracket}/>
                        );})}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Box>}
         </Grid>
      </Box>
   );
}; // end of main function for this page


export default ReportPage;