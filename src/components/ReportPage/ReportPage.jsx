//Main imports
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import ReportItem from '../ReportItem/ReportItem';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
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
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});


function ReportPage() {
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const reportInfo = useSelector((store) => store.report);
   const difficultyConverter = (difficulty) => { // function to convert difficulty (given from API as a number) to a string (so it can be read by the user)
      switch (difficulty) {
         case 1:
            return "Looking For Raid";
         case 3:
            return "Normal";
         case 4:
            return "Heroic";
         case 5:
            return "Mythic";  
         default:
            return "unknown";
      };
   };

   const test = () => {
      console.log(report);
   };


   return (
      <Box aria-label="report page">
         <Grid container justify="center" aria-label="report header">
            <IconButton color="primary" aria-label="Refresh Report"><RefreshIcon /></IconButton>
            <h1 align="center">{reportInfo.name}</h1>
            <Button variant="contained" color="primary" disableElevation onClick={test}>Test</Button>
            <IconButton color="primary" aria-label="Add to favorites"><StarBorderIcon /></IconButton>
         </Grid>
         <br /><br /><br />
         <Grid container justify="center">
         <Box style={{width: "85%"}} aria-label="report table container">
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
                     <ReportItem id={reportItem.fightID} url={reportInfo.id} difficulty={difficultyConverter(reportItem.difficulty)} name={reportItem.encounter.name} length={reportItem.duration}/>
                  );})}
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         </Grid>
      </Box>
   );
};


export default ReportPage;