//Main imports
import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import DamageRow from '../DamageRow/DamageRow';
import HealingRow from '../HealingRow/HealingRow';
import axios from 'axios';
import './FightPage.css';


//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
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
import { DataGrid } from '@material-ui/data-grid';
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});
const dataColumns = [
   { field: 'RankPercent', type: 'number', headerName: 'Rank %', width: 150, cellClassName:(params) =>
      clsx('rank-color', {
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
      })},
   { field: 'Rank', type: 'number', headerName: 'Rank', width: 150 },
   { field: 'id', headerName: 'Player', width: 150 },
   { field: 'DPS', type: 'number', headerName: 'DPS', width: 150 },
   { field: 'ilvl', type: 'number', headerName: 'ilvl', width: 150 },
   { field: 'bracketPercent', type: 'number', headerName: 'ilvl%', width: 150, cellClassName:(params) =>
      clsx('rank-color', {
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
   })}];
// const dataRows = [
//    {RankPercent: 5,
//    Rank: 200,
//    id: 'Sageth',
//    HPS: 2500,
//    ilvl: 242,
//    ilvlPercent: 50,}]


function FightPage() {
   const [bossItem, setBossItem] = useState({});
   const [damageRows, setDamageRows] = useState([]);
   const classes = useStyles();
   const dispatch = useDispatch();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const fightInfo = useSelector((store) => store.fight);
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
  

  const test = () => {
   let testRows = [];
   bossItem.roles.dps.characters.map((player) => {
       (
         testRows.push({RankPercent: player.rankPercent, Rank: player.rank, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
      )})
   bossItem.roles.healers.characters.map((player) => {
       (
         testRows.push({RankPercent: player.rankPercent, Rank: player.rank, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
      )})
   bossItem.roles.tanks.characters.map((player) => {
       (
         testRows.push({RankPercent: player.rankPercent, Rank: player.rank, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
      )})
   setDamageRows(testRows);
}
   



   return (
      <>
      {( bossItem.roles == undefined) ? 
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>
      :
         <Box aria-label="user page">
         <Box textAlign="center" aria-label="user information">
         <Button variant="contained" color="primary" disableElevation onClick={test}>Test</Button>
         <h1>{difficultyConverter(bossItem.difficulty)} {bossItem.encounter.name}</h1>
         {/* <h2><img src={bossImage(bossItem.encounter.name)} /></h2> */}
         </Box>
         <br /><br /><br />
         <Grid container justify="space-between" aria-label="history and favorites tables container">
         <Box style={{width: "50%", minWidth: "800px", height: "75em"}} alignItems="flex-end" aria-label="favorites table container">
            {( damageRows == [] ) ? 
               <Box textAlign="center" aria-label="Waiting for response">
                  <h1>Loading</h1>
                  <CircularProgress style={{height:"10%", width:"10%"}}/>
               </Box>
               :
               <DataGrid
               rows={damageRows}
               columns={dataColumns}
               />
            }
         </Box>   
         <br />
         <Box style={{width: "50%", minWidth: "800px", height: "75em"}}alignItems="flex-end" aria-label="favorites table container">
            {( damageRows == [] ) ? 
               <Box textAlign="center" aria-label="Waiting for response">
                  <h1>Loading</h1>
                  <CircularProgress style={{height:"10%", width:"10%"}}/>
               </Box>
               :
               <DataGrid
               rows={damageRows}
               columns={dataColumns}
               />
            }
         </Box>

         {/* <TableContainer component={Paper}>
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
               {bossItem.roles.dps.characters.map((player) => {
                  return (
                    <DamageRow id={player.id} name={player.name} server={player.server.name} icon={(player.spec) + " " + (player.class)} total={player.amount} ilvl={player.bracketData} ilvlParse={player.bracketPercent} rank={player.rank} rankTotal={player.totalParses} rankPercent={player.rankPercent}/>
                  );})}
               {bossItem.roles.healers.characters.map((player) => {
                  return (
                    <DamageRow id={player.id} name={player.name} server={player.server.name} icon={(player.spec) + " " + (player.class)} total={player.amount} ilvl={player.bracketData} ilvlParse={player.bracketPercent} rank={player.rank} rankTotal={player.totalParses} rankPercent={player.rankPercent}/>
                  );})}
               {bossItem.roles.tanks.characters.map((player) => {
                  return (
                    <DamageRow id={player.id} name={player.name} server={player.server.name} icon={(player.spec) + " " + (player.class)} total={player.amount} ilvl={player.bracketData} ilvlParse={player.bracketPercent} rank={player.rank} rankTotal={player.totalParses} rankPercent={player.rankPercent}/>
                  );})}
               </TableBody>
            </Table>
         </TableContainer> */}
         </Grid>
      </Box>
      }
      </>
   );
};


export default FightPage;