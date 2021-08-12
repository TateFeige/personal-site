//Main imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FightPage.css';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
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
         return "https://icons.wowdb.com/retail/medium/inv_misc_questionmark.jpg?39653";
   };
}; // end of spec icon handler

function getClassColor(spec) { // converts player class string into a hex code for coloring
   switch(spec) {
      case "DeathKnight":
         return "#c0153f";
      case "Druid":
         return "#eb7b26";
      case "DemonHunter":
         return "#952abb";
      case "Hunter":
         return "#9cd577";
      case "Mage":
         return "#73ccef";
      case "Monk":
         return "#369c78";
      case "Paladin":
         return "#e48aaa";
      case "Priest":
         return "#ffffff";
      case "Rogue":
         return "#fcf672";
      case "Shaman":
         return "#3e56fc";
      case "Warlock":
         return "#9681c8";
      case "Warrior":
         return "#c49c71";
      default:
         return "white";
   };
};

const healingDataColumns: GridColDef = [ // column data for the healer data grid
   { field: 'RankPercent', type: 'number', headerName: 'Rank %', flex: 3, disableColumnMenu: true, hideSortIcons: true, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
   })},
   { field: 'Rank', type: 'number', headerName: 'Rank', flex: 3, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
   )}, 
   { field: 'RankTotal', type: 'number', headerName: 'Out Of', flex: 3, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
   )}, 
   { field: 'id', headerName: 'Player', flex: 10, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) =>
      ( // player name color handler
         <Typography style={{display:"flex", textAlign: "center", color: getClassColor(params.value.split(' ')[2])}}>
           <img style={{height: "80%", align: "center"}} src={specIcon(params.value.split(' ')[1] + " " + params.value.split(' ')[2])} alt={params.value.split(' ')[1] + " " + params.value.split(' ')[2]} title={params.value.split(' ')[1] + " " + params.value.split(' ')[2]}/>
           <Typography style={{align:"center", margin: "auto"}}>&nbsp;&nbsp;{params.value.split(' ')[0]}</Typography>
         </Typography>
   )},
   { field: 'HPS', type: 'number', headerName: 'HPS', flex: 4, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <div style={{color: "#d0fb8a"}}>
            {Number(params.value).toLocaleString(undefined, {'minimumFractionDigits':1,'maximumFractionDigits':1})} 
         </div>
   )},
   { field: 'ilvl', type: 'number', headerName: 'ilvl', flex: 2, disableColumnMenu: true, hideSortIcons: true, },
   { field: 'bracketPercent', type: 'number', headerName: 'ilvl%', flex: 2, disableColumnMenu: true, hideSortIcons: true, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
   })},
]; // end of healingDataColumns

const damageDataColumns: GridColDef  = [ // column data for the damage data grid
   { field: 'RankPercent', type: 'number', headerName: 'Rank %', flex: 3, disableColumnMenu: true, hideSortIcons: true, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
   })},
   { field: 'Rank', type: 'number', headerName: 'Rank', flex: 3, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
   )},
   { field: 'RankTotal', type: 'number', headerName: 'Out Of', flex: 3, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <>
            {Number(params.value).toLocaleString("en-US")}
         </>
   )},
   { field: 'id', headerName: 'Player', flex: 10, hideSortIcons: true, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) =>
      ( // player name color handler
         <Typography style={{display:"flex", textAlign: "center", color: getClassColor(params.value.split(' ')[2])}}>
           <img style={{height: "80%", align: "center"}} src={specIcon(params.value.split(' ')[1] + " " + params.value.split(' ')[2])} alt={params.value.split(' ')[1] + " " + params.value.split(' ')[2]} title={params.value.split(' ')[1] + " " + params.value.split(' ')[2]}/>
           <Typography style={{align:"center", margin: "auto"}}>&nbsp;&nbsp;{params.value.split(' ')[0]}</Typography>
         </Typography>
   )},
   { field: 'DPS', type: 'number', headerName: 'DPS', flex: 4, disableColumnMenu: true, hideSortIcons: true, renderCell:(params) => 
      ( // converts raw number into a readable format
         <div style={{color: "#d0fb8a"}}>
            {Number(params.value).toLocaleString(undefined, {'minimumFractionDigits':1,'maximumFractionDigits':1})} 
         </div>
   )},
   { field: 'ilvl', type: 'number', headerName: 'ilvl', flex: 2, disableColumnMenu: true, hideSortIcons: true},
   { field: 'bracketPercent', type: 'number', headerName: 'ilvl%', flex: 2, disableColumnMenu: true, hideSortIcons: true, cellClassName:(params) =>
      clsx('rank-color', { // sorts number into color based on performance
         underwhelming: params.value >= 0,
         decent: params.value >= 35,
         good: params.value >= 50,
         great: params.value >= 75,
         amazing: params.value >= 95,
         almostPerfect: params.value >= 99,
         perfect: params.value >= 100,
   })},
]; // end of damageDataColumns


function FightPage() { // main function for this page
   let boss = {difficulty: '', id: '', name: '', url: ''};
   const getSearchQueryByFullURL = (url) => {return url.split('&')};
   const dispatch = useDispatch();
   const fightInfo = useSelector((store) => store.fight);
   const healingInfo = useSelector((store) => store.healing);
   useEffect(() => { // get data on page load
      pageRefreshHandler();
      window.scrollTo(0,0);
   }, []);

   const pageRefreshHandler = () => {
      window.scrollTo(0,0);
      const queryString = window.location.hash.substring(15);
      const getSearchQueryByFullURL = (url) => {return url.split('&')}
      let report = getSearchQueryByFullURL(queryString)[0];
      let bossName = getSearchQueryByFullURL(queryString)[1].substring(5).split('+').join(' ');
      let difficulty = getSearchQueryByFullURL(queryString)[2].substring(11);
      let bossID = getSearchQueryByFullURL(queryString)[3].substring(3);
      boss = {
         difficulty: difficulty,
         id: bossID,
         name: bossName,
         url: report
      };
      dispatch({ // send our boss item to be further broken down
         type: "BOSS_REPORT",
         payload: boss
      });
      dispatch({ // send our boss item to be further broken down
         type: "HEALING_REPORT",
         payload: boss
      });
   };


   return (
      <>
         {(fightInfo == [] ? 
            <Box textAlign="center" aria-label="Waiting for response">
               <h1>Loading</h1>
               <CircularProgress style={{height:"10%", width:"10%"}}/>
            </Box>
         :
         <Box aria-label="user page">
            <Box textAlign="center" aria-label="report page info">
               <Typography align="center" variant="h2" component="h2" >
                  {getSearchQueryByFullURL(window.location.hash.substring(15))[1].substring(5).split('+').join(' ').split('%27').join(`'`)}
               </Typography>
               <Typography align="center" variant="h5" component="h3" gutterBottom style={{fontSize: "28px"}}>
                  {getSearchQueryByFullURL(window.location.hash.substring(15))[2].substring(11).split('%2B').join('+')}
               </Typography>
            </Box>
            <br /><br /><br />
            <Grid container style={{width: "100%", height: "2000px"}} justifyContent="space-between" aria-label="damage and healing tables container">
               <Box style={{width: "49%"}} alignItems="flex-end" aria-label="damage table container">
                  <Typography align="center" variant="h3" component="h2" gutterBottom>Damage</Typography>
                  <DataGrid
                     showCellRightBorder
                     loading
                     showColumnRightBorder
                     hideFooter
                     disableSelectionOnClick
                     autoHeight
                     style={{backgroundColor: '#242424', color: 'white'}}
                     rows={fightInfo}
                     columns={damageDataColumns}
                  />
               </Box>   
               <br />
               <Box style={{width: "49%"}} alignItems="flex-end" aria-label="healing table container">
                  <Typography align="center" variant="h3" component="h2" gutterBottom>Healing</Typography>
                  <DataGrid
                     showCellRightBorder
                     loading
                     showColumnRightBorder
                     hideFooter
                     disableSelectionOnClick 
                     autoHeight
                     style={{backgroundColor: '#242424', color: 'white'}}
                     rows={healingInfo}
                     columns={healingDataColumns}
                  />
               </Box>
            </Grid>
         </Box>
         )}
      </>
   );
}; // main function for this page


export default FightPage;