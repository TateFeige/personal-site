//Main imports
import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import DamageRow from '../DamageRow/DamageRow';
import axios from 'axios';


//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});




function FightPage() {
   const [bossItem, setBossItem] =  useState({});
   const classes = useStyles();
   const dispatch = useDispatch();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const fightInfo = useSelector((store) => store.fight);
   const test = () => {
      findFight()
      //console.log(fightInfo[0].id) // test function
   };
   const findFight = () => {
      for (let x = 0; x < report.length; x++) {
         //console.log(report[x]);
            if (report[x].fightID == fightInfo[0].id) {
            //boss = report[x];
            const match = report[x];
            setBossItem(match);
            console.log(bossItem);
      }}};
   useEffect(() => { // get data on page load
      findFight();
  }, []);
   



   return (
      <>
      {( fightInfo == undefined) ? 
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>

      :
      
      <Box aria-label="user page">
         <Box textAlign="center" aria-label="user information">
         <Button variant="contained" color="primary" disableElevation onClick={test}>Test</Button>
         </Box>
         <br /><br /><br />
         <Grid container justify="space-between" aria-label="history and favorites tables container">
         <Box style={{width: "40%"}} aria-label="history table container">
         <TableContainer component={Paper}>
            <h2 align="center">Damage</h2>
            <Table className={classes.table} aria-label="Damage Dealt Table">
            <caption>Damage Dealt Table</caption>
               <TableHead>
                  <TableRow>
                     <StyledTableCell align="left">Rank %</StyledTableCell>
                     <StyledTableCell align="left">Rank</StyledTableCell>
                     <StyledTableCell align="left">Player</StyledTableCell>
                     <StyledTableCell align="left">DPS</StyledTableCell>
                     <StyledTableCell align="left">ilvl</StyledTableCell>
                     <StyledTableCell align="left">ilvl %</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
               {/* {fightInfo.data.damageDone.map((player) => {
                  return (
                    <DamageRow id={player.id} name={player.name} icon={player.icon} total={player.total} />
                  );})} */}
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         <br />
         <Box style={{width: "40%"}} alignItems="flex-end" aria-label="favorites table container">
         <TableContainer component={Paper}>
            <h2 align="center">Healing</h2>
            <Table className={classes.table}  aria-label="User Favorites Table">
            <caption>Healing Done Table</caption>
               <TableHead>
                  <TableRow>
                     <StyledTableCell align="left">Rank %</StyledTableCell>
                     <StyledTableCell align="left">Rank</StyledTableCell>
                     <StyledTableCell align="left">Player</StyledTableCell>
                     <StyledTableCell align="left">HPS</StyledTableCell>
                     <StyledTableCell align="left">ilvl</StyledTableCell>
                     <StyledTableCell align="left">ilvl %</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
               {/* {fightInfo.data.healingDone.map((player) => {
                  return (
                     <TableRow>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell>{player.icon}</StyledTableCell>
                     <StyledTableCell>{player.name}</StyledTableCell>
                     <StyledTableCell>{player.total}</StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     </TableRow>
                  )})} */}
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         </Grid>
      </Box>
      }
      </>

   );
};


export default FightPage;