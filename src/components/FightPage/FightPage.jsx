//Main imports
import React, {useState, useEffect, Component, componentDidMount} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './FightPage.css';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles({table: {minWidth: 700}});
const specIcon = (spec) => { // giant switch statement that adds a class/spec icon next to a player name. looks for the player spec + class and returns an image URL
   switch (spec) {
      case "Blood DeathKnight":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Blood.jpg";
      case "Frost DeathKnight":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Frost.jpg";
      case "Unholy DeathKnight":
         return "https://assets.rpglogs.com/img/warcraft/icons/DeathKnight-Unholy.jpg";
      case "Balance Druid":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Balance.jpg";
      case "Feral Druid":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Feral.jpg";
      case "Guardian Druid":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Guardian.jpg";
      case "Restoration Druid":
         return "https://assets.rpglogs.com/img/warcraft/icons/Druid-Restoration.jpg";
      case "Havoc DemonHunter":
         return "https://assets.rpglogs.com/img/warcraft/icons/DemonHunter-Havoc.jpg";
      case "Vengeance DemonHunter":
         return "https://assets.rpglogs.com/img/warcraft/icons/DemonHunter-Vengeance.jpg";
      case "BeastMastery Hunter":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-BeastMastery.jpg";
      case "Marksmanship Hunter":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-Marksmanship.jpg";
      case "Survival Hunter":
         return "https://assets.rpglogs.com/img/warcraft/icons/Hunter-Survival.jpg";
      case "Arcane Mage":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Arcane.jpg";
      case "Fire Mage":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Fire.jpg";
      case "Frost Mage":
         return "https://assets.rpglogs.com/img/warcraft/icons/Mage-Frost.jpg";
      case "Brewmaster Monk":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Brewmaster.jpg";
      case "Mistweaver Monk":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Mistweaver.jpg";
      case "Windwalker Monk":
         return "https://assets.rpglogs.com/img/warcraft/icons/Monk-Windwalker.jpg";
      case "Holy Paladin":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Holy.jpg";
      case "Protection Paladin":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Protection.jpg";
      case "Retribution Paladin":
         return "https://assets.rpglogs.com/img/warcraft/icons/Paladin-Retribution.jpg";
      case "Discipline Priest":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Discipline.jpg";
      case "Holy Priest":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Holy.jpg";
      case "Shadow Priest":
         return "https://assets.rpglogs.com/img/warcraft/icons/Priest-Shadow.jpg";
      case "Assassination Rogue":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Assassination.jpg";
      case "Outlaw Rogue":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Outlaw.jpg";
      case "Subtlety Rogue":
         return "https://assets.rpglogs.com/img/warcraft/icons/Rogue-Subtlety.jpg";
      case "Elemental Shaman":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Elemental.jpg";
      case "Enhancement Shaman":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Enhancement.jpg";
      case "Restoration Shaman":
         return "https://assets.rpglogs.com/img/warcraft/icons/Shaman-Restoration.jpg";
      case "Affliction Warlock":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Affliction.jpg";
      case "Demonology Warlock":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Demonology.jpg";
      case "Destruction Warlock":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warlock-Destruction.jpg";
      case "Arms Warrior":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Arms.jpg";
      case "Fury Warrior":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Fury.jpg";
      case "Protection Warrior":
         return "https://assets.rpglogs.com/img/warcraft/icons/Warrior-Protection.jpg";
      default:
         return "";
   };
}; // end of spec icon handler

const removeTilde = (url) => {return url.split('~').pop()}; // removes the tilde from our data so that materialUI can sort it and so its easier to read
const healingDataColumns = [ // column data for the healer data grid
   { field: 'RankPercent', type: 'number', headerName: 'Rank %', flex: 2, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
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
   { field: 'Rank', type: 'number', headerName: 'Rank', flex: 2 },
   { field: 'RankTotal', type: 'number', headerName: 'Out Of', flex: 2 },
   { field: 'img', headerName: 'Spec', flex: 1, renderCell:(params) =>
      ( // image handler
         <>
            <img src={specIcon(params.value)} alt={params.value} title={params.value}/>
         </>
      ),
   },
   { field: 'id', headerName: 'Player', flex: 10 },
   { field: 'HPS', type: 'number', headerName: 'HPS', flex: 4, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")} 
         </>
      
      ),
   },
   { field: 'ilvl', type: 'number', headerName: 'ilvl', flex: 2 },
   { field: 'bracketPercent', type: 'number', headerName: 'ilvl%', flex: 2, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
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
]; // end of healingDataColumns

const damageDataColumns = [ // column data for the damage data grid
   { field: 'RankPercent', type: 'number', headerName: 'Rank %', flex: 2, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
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
   { field: 'Rank', type: 'number', headerName: 'Rank', flex: 2 },
   { field: 'RankTotal', type: 'number', headerName: 'Out Of', flex: 2 },
   { field: 'img', headerName: 'Spec', flex: 1, renderCell:(params) =>
      ( // image handler
         <>
            <img src={specIcon(params.value)} alt={params.value} title={params.value}/>
         </>
      ),
   },
   { field: 'id', headerName: 'Player', flex: 10 },
   { field: 'DPS', type: 'number', headerName: 'DPS', flex: 4, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
      
      ),
   },
   { field: 'ilvl', type: 'number', headerName: 'ilvl', flex: 2 },
   { field: 'bracketPercent', type: 'number', headerName: 'ilvl%', flex: 2, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
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
]; // end of damageDataColumns


function FightPage() { // main function for this page
   const [bossItem, setBossItem] = useState({});
   const [bossHealingItem, setBossHealingItem] = useState({});
   const [damageRows, setDamageRows] = useState([]);
   const [healingRows, setHealingRows] = useState([]);
   const classes = useStyles();
   const dispatch = useDispatch();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const fightInfo = useSelector((store) => store.fight);
   const healingInfo = useSelector((store) => store.healing);
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

   const findFight = () => { // loops through our complete fight array and locates the boss that the user clicked on
      for (let x = 0; x < report.length; x++) { // loops through damage array
         //console.log(report[x]);
            if (report[x].fightID == fightInfo[0].id) {
            //boss = report[x];
            const match = report[x];
            setBossItem(match); // set boss to be mapped
            //console.log('boss is:', match);
      }};
      for (let x = 0; x < healingInfo.reportData.report.rankings.data.length; x++) { // loops through healing array
         //console.log(report[x]);
            if (healingInfo.reportData.report.rankings.data[x].fightID == fightInfo[0].id) {
            //boss = report[x];
            const healingMatch = healingInfo.reportData.report.rankings.data[x];
            setBossHealingItem(healingMatch); // set boss to be mapped
            //console.log(bossItem);
      }};
   }; // end of findFight
      
   useEffect(() => { // get data on page load
      findFight();
   }, []);

   const test = () => { // onLoad function
      console.log(bossItem) // test function
      let tempDamageRows = []; // holder for damage data
      let tempHealingRows = []; // holder for healing data
      bossItem.roles.dps.characters.map((player) => {
         ( // pushes DPS players to damage array
            tempDamageRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )});
      bossItem.roles.healers.characters.map((player) => {
         ( // pushes healers to damage array
            tempDamageRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )});
      bossItem.roles.tanks.characters.map((player) => {
         ( // pushes tanks to damage array
            tempDamageRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )});
      bossHealingItem.roles.dps.characters.map((player) => {
         ( // pushes DPS to healing array
            tempHealingRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )});
      bossHealingItem.roles.healers.characters.map((player) => {
         ( // pushes healers to healing array
            tempHealingRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )})
      bossHealingItem.roles.tanks.characters.map((player) => {
         ( // pushes tanks to healing array
            tempHealingRows.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
         )})
      setDamageRows(tempDamageRows); // sets damage rows variable to our stored damage array
      setHealingRows(tempHealingRows); // sets our healing rows variable to our stored healing array
   }; // end of onLoad function

   return (
      <>
         {(bossItem.roles === undefined || bossHealingItem.roles === undefined || healingRows == [] || damageRows == [] || bossItem.encounter == undefined || bossItem == undefined) ? 
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>
         :
            <Box aria-label="user page">
               <Box textAlign="center" aria-label="user information">
                  <Button variant="contained" color="primary" disableElevation onClick={test}>Test</Button>
                  <Typography align="center" variant="h2" component="h2" gutterBottom>{
                     difficultyConverter(bossItem.difficulty)} {bossItem.encounter.name}
                  </Typography>
               </Box>
            <br /><br /><br />
               <Grid container style={{width: "100%", height: "2000px"}} justify="space-between" aria-label="history and favorites tables container">
                  <Box style={{width: "49%"}} alignItems="flex-end" aria-label="favorites table container">
                     {( damageRows == [] ) ? 
                        <Box textAlign="center" aria-label="Waiting for response">
                           <h1>Loading</h1>
                           <CircularProgress style={{height:"10%", width:"10%"}}/>
                        </Box>
                     :
                        <>
                           <Typography align="center" variant="h3" component="h2" gutterBottom>
                              Damage
                           </Typography>
                           <DataGrid
                           autoHeight
                           autoWidth
                           style={{backgroundColor: '#242424', color: 'white'}}
                           rows={damageRows}
                           columns={damageDataColumns}
                            />
                        </>
                     }
                  </Box>   
                  <br />
                  <Box style={{width: "49%"}} alignItems="flex-end" aria-label="favorites table container">
                     {( healingRows == [] ) ? 
                        <Box textAlign="center" aria-label="Waiting for response">
                           <h1>Loading</h1>
                           <CircularProgress style={{height:"10%", width:"10%"}}/>
                        </Box>
                     :
                        <>
                           <Typography align="center" variant="h3" component="h2" gutterBottom>
                              Healing
                           </Typography>
                           <DataGrid
                           autoHeight
                           autoWidth
                           style={{backgroundColor: '#242424', color: 'white'}}
                           rows={healingRows}
                           columns={healingDataColumns}
                           />
                        </>
                     }
                  </Box>
               </Grid>
            </Box>
         }
      </>
   );
}; // main function for this page


export default FightPage;