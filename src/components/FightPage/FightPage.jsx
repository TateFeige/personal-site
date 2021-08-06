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

   const specIcon = (spec) => {
      switch (spec) {
         case "Death Knight Blood":
            return "https://static.wikia.nocookie.net/wowpedia/images/4/45/Spell_deathknight_bloodpresence.png/revision/latest/scale-to-width-down/64?cb=20180824094634";
         case "Death Knight Frost":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/d0/Spell_deathknight_frostpresence.png/revision/latest/scale-to-width-down/64?cb=20080710164239";
         case "Death Knight Unholy":
            return "https://static.wikia.nocookie.net/wowpedia/images/6/6f/Spell_deathknight_unholypresence.png/revision/latest/scale-to-width-down/64?cb=20180824094727";
         case "Druid Balance":
            return "https://static.wikia.nocookie.net/wowpedia/images/1/14/Spell_nature_starfall.png/revision/latest/scale-to-width-down/64?cb=20070106061631";
         case "Druid Feral":
            return "https://static.wikia.nocookie.net/wowpedia/images/4/48/Ability_druid_catform.png/revision/latest/scale-to-width-down/64?cb=20180824000839";
         case "Druid Guardian":
            return "https://static.wikia.nocookie.net/wowpedia/images/b/bb/Ability_racial_bearform.png/revision/latest/scale-to-width-down/64?cb=20180824003211";
         case "Druid Restoration":
            return "https://static.wikia.nocookie.net/wowpedia/images/3/37/Spell_nature_healingtouch.png/revision/latest/scale-to-width-down/64?cb=20180804040410";
         case "Demon Hunter Havoc":
            return "https://static.wikia.nocookie.net/wowpedia/images/2/2d/Demon_hunter_havoc_icon.png/revision/latest/scale-to-width-down/64?cb=20150813232704";
         case "Demon Hunter Vengeance":
            return "https://static.wikia.nocookie.net/wowpedia/images/2/25/Demon_hunter_vengeance_icon.png/revision/latest/scale-to-width-down/64?cb=20150813232701";
         case "Hunter Beast Mastery":
            return "https://static.wikia.nocookie.net/wowpedia/images/9/98/Ability_hunter_bestialdiscipline.png/revision/latest/scale-to-width-down/64?cb=20180824001505";
         case "Hunter Marksmanship":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/de/Ability_hunter_focusedaim.png/revision/latest/scale-to-width-down/64?cb=20180824001550";
         case "Hunter Survival":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/da/Ability_hunter_camouflage.png/revision/latest/scale-to-width-down/64?cb=20180824001512";
         case "Mage Arcane":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/d2/Spell_holy_magicalsentry.png/revision/latest/scale-to-width-down/64?cb=20070106001102";
         case "Mage Fire":
            return "https://static.wikia.nocookie.net/wowpedia/images/4/45/Spell_fire_firebolt02.png/revision/latest/scale-to-width-down/64?cb=20180824094905";
         case "Mage Frost":
            return "https://static.wikia.nocookie.net/wowpedia/images/1/1e/Spell_frost_frostbolt02.png/revision/latest/scale-to-width-down/64?cb=20180824095006";
         case "Monk Brewmaster":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/d1/Spell_monk_brewmaster_spec.png/revision/latest/scale-to-width-down/64?cb=20140331030629";
         case "Monk Mistweaver":
            return "https://static.wikia.nocookie.net/wowpedia/images/4/4e/Spell_monk_mistweaver_spec.png/revision/latest/scale-to-width-down/64?cb=20140331030706";
         case "Monk Windwalker":
            return "https://static.wikia.nocookie.net/wowpedia/images/a/aa/Spell_monk_windwalker_spec.png/revision/latest/scale-to-width-down/64?cb=20140331030647";
         case "Paladin Holy":
            return "https://static.wikia.nocookie.net/wowpedia/images/b/b4/Spell_holy_holybolt.png/revision/latest/scale-to-width-down/64?cb=20060930060716";
         case "Paladin Protection":
            return "https://static.wikia.nocookie.net/wowpedia/images/2/2f/Ability_paladin_shieldofthetemplar.png/revision/latest/scale-to-width-down/64?cb=20080826222526";
         case "Paladin Retribution":
            return "https://static.wikia.nocookie.net/wowpedia/images/0/0a/Spell_holy_auraoflight.png/revision/latest/scale-to-width-down/64?cb=20180824095045";
         case "Priest Discipline":
            return "https://static.wikia.nocookie.net/wowpedia/images/3/35/Spell_holy_powerwordshield.png/revision/latest/scale-to-width-down/64?cb=20100927124748";
         case "Priest Holy":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/d6/Spell_holy_guardianspirit.png/revision/latest/scale-to-width-down/64?cb=20080805053954";
         case "Priest Shadow":
            return "https://static.wikia.nocookie.net/wowpedia/images/3/30/Spell_shadow_shadowwordpain.png/revision/latest/scale-to-width-down/64?cb=20060923203245";
         case "Rogue Assassination":
            return "https://static.wikia.nocookie.net/wowpedia/images/6/65/Ability_rogue_eviscerate.png/revision/latest/scale-to-width-down/64?cb=20180824003419";
         case "Rogue Outlaw":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/df/Inv_sword_30.png/revision/latest/scale-to-width-down/64?cb=20070121002913";
         case "Rogue Subtlety":
            return "https://static.wikia.nocookie.net/wowpedia/images/f/f8/Ability_stealth.png/revision/latest/scale-to-width-down/64?cb=20180218120322";
         case "Shaman Elemental":
            return "https://static.wikia.nocookie.net/wowpedia/images/4/4c/Spell_nature_lightning.png/revision/latest/scale-to-width-down/64?cb=20060923181844";
         case "Shaman Enhancement":
            return "https://static.wikia.nocookie.net/wowpedia/images/c/c5/Spell_shaman_improvedstormstrike.png/revision/latest/scale-to-width-down/64?cb=20180824100020";
         case "Shaman Restoration":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/da/Spell_nature_magicimmunity.png/revision/latest/scale-to-width-down/64?cb=20060923182228";
         case "Warlock Affliction":
            return "https://static.wikia.nocookie.net/wowpedia/images/e/ef/Spell_shadow_deathcoil.png/revision/latest/scale-to-width-down/64?cb=20060923201506";
         case "Warlock Demonology":
            return "https://static.wikia.nocookie.net/wowpedia/images/d/dd/Spell_shadow_metamorphosis.png/revision/latest/scale-to-width-down/64?cb=20060923202219";
         case "Warlock Destruction":
            return "https://static.wikia.nocookie.net/wowpedia/images/f/fc/Spell_shadow_rainoffire.png/revision/latest/scale-to-width-down/64?cb=20060930193530";
         case "Warrior Arms":
            return "https://static.wikia.nocookie.net/wowpedia/images/e/e7/Ability_warrior_savageblow.png/revision/latest/scale-to-width-down/64?cb=20060829232240";
         case "Warrior Fury":
            return "https://static.wikia.nocookie.net/wowpedia/images/2/24/Ability_warrior_innerrage.png/revision/latest/scale-to-width-down/64?cb=20060928010455";
         case "Warrior Protection":
            return "https://static.wikia.nocookie.net/wowpedia/images/b/b1/Ability_warrior_defensivestance.png/revision/latest/scale-to-width-down/64?cb=20180218120852";
         default:
            return "https://static.wikia.nocookie.net/wowpedia/images/a/ab/Activequesticon.png/revision/latest/scale-to-width-down/16?cb=20070607020008";
      }
   }


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