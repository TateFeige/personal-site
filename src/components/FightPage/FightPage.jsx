//Main imports
import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
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
const specIcon = (spec) => {
   switch (spec) {
      case "DeathKnightBlood":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Blood.jpg";
      case "DeathKnightFrost":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Frost.jpg";
      case "DeathKnightUnholy":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Unholy.jpg";
      case "DruidBalance":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Balance.jpg";
      case "DruidFeral":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Feral.jpg";
      case "DruidGuardian":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Guardian.jpg";
      case "DruidRestoration":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Restoration.jpg";
      case "DemonHunterHavoc":
         return "https://assets.rpglogs.com/img/warcraft/icons/DemonHunter-Havoc.jpg";
      case "DemonHunterVengeance":
         return "https://assets.rpglogs.com/img/warcraft/icons/DemonHunter-Vengeance.jpg";
      case "HunterBeastMastery":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-BeastMastery.jpg";
      case "HunterMarksmanship":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-Marksmanship.jpg";
      case "HunterSurvival":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-Survival.jpg";
      case "MageArcane":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Arcane.jpg";
      case "MageFire":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Fire.jpg";
      case "MageFrost":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Frost.jpg";
      case "MonkBrewmaster":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Brewmaster.jpg";
      case "MonkMistweaver":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Mistweaver.jpg";
      case "MonkWindwalker":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Windwalker.jpg";
      case "PaladinHoly":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Holy.jpg";
      case "PaladinProtection":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Protection.jpg";
      case "PaladinRetribution":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Retribution.jpg";
      case "PriestDiscipline":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Discipline.jpg";
      case "PriestHoly":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Holy.jpg";
      case "PriestShadow":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Shadow.jpg";
      case "RogueAssassination":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Assassination.jpg";
      case "RogueOutlaw":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Outlaw.jpg";
      case "RogueSubtlety":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Subtlety.jpg";
      case "ShamanElemental":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Elemental.jpg";
      case "ShamanEnhancement":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Enhancement.jpg";
      case "ShamanRestoration":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Restoration.jpg";
      case "WarlockAffliction":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Affliction.jpg";
      case "WarlockDemonology":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Demonology.jpg";
      case "WarlockDestruction":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Destruction.jpg";
      case "WarriorArms":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Arms.jpg";
      case "WarriorFury":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Fury.jpg";
      case "WarriorProtection":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Protection.jpg";
      default:
         return "";}};
const getSearchQueryByFullURL = (url) => {return url.split('~').pop()};
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
         },
      ),
   },
   { field: 'Rank', type: 'number', headerName: 'Rank', width: 150 },
   { field: 'RankTotal', type: 'number', headerName: 'Out OF', width: 150 },
   { field: 'img', headerName: 'Spec', width: 50, renderCell:(params) =>
      (
         <>
            <img src={specIcon(params.value)} alt={params.value} title={params.value}/>
         </>
      ),
   },
   { field: 'id', headerName: 'Player', width: 350 },
   { field: 'DPS', type: 'number', headerName: 'DPS', width: 150, renderCell:(params) => 
      (
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
      
      ),
   },
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
         },
      ),
   },
];

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
         testRows.push({RankPercent: player.rankPercent, Rank: getSearchQueryByFullURL(player.rank), RankTotal: player.totalParses, img: player.class + player.spec, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
      )})
   bossItem.roles.healers.characters.map((player) => {
       (
         testRows.push({RankPercent: player.rankPercent, Rank: getSearchQueryByFullURL(player.rank), RankTotal: player.totalParses, img: player.class + player.spec, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
      )})
   bossItem.roles.tanks.characters.map((player) => {
       (
         testRows.push({RankPercent: player.rankPercent, Rank: getSearchQueryByFullURL(player.rank), RankTotal: player.totalParses, img: player.class + player.spec, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
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
               style={{backgroundColor: '#242424', color: 'white'}}
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
               style={{backgroundColor: '#242424', color: 'white'}}
               rows={damageRows}
               columns={dataColumns}
               />
            }
         </Box>
         </Grid>
      </Box>
      }
      </>
   );
};


export default FightPage;