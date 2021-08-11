//Main imports
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MaterialUI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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
         case "High King Maulgar":
            return "https://assets.rpglogs.com/img/warcraft/bosses/649-icon.jpg";
         case "Gruul the Dragonkiller":
            return "https://assets.rpglogs.com/img/warcraft/bosses/650-icon.jpg";
         case "Magtheridon":
            return "https://assets.rpglogs.com/img/warcraft/bosses/651-icon.jpg";
         case "Attumen the Huntsman":
            return "https://assets.rpglogs.com/img/warcraft/bosses/652-icon.jpg";
         case "Moroes":
            return "https://assets.rpglogs.com/img/warcraft/bosses/653-icon.jpg";
         case "Maiden of Virtue":
            return "https://assets.rpglogs.com/img/warcraft/bosses/654-icon.jpg";
         case "Opera Hall":
            return "https://assets.rpglogs.com/img/warcraft/bosses/655-icon.jpg";
         case "The Curator":
            return "https://assets.rpglogs.com/img/warcraft/bosses/656-icon.jpg";
         case "Terestian Illhoof":
            return "https://assets.rpglogs.com/img/warcraft/bosses/657-icon.jpg";
         case "Shade of Aran":
            return "https://assets.rpglogs.com/img/warcraft/bosses/658-icon.jpg";
         case "Netherspite":
            return "https://assets.rpglogs.com/img/warcraft/bosses/659-icon.jpg";
         case "Prince Malchezaar":
            return "https://assets.rpglogs.com/img/warcraft/bosses/661-icon.jpg";
         case "Nightbane":
            return "https://assets.rpglogs.com/img/warcraft/bosses/662-icon.jpg";
         case "Patchwerk":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1118-icon.jpg";
         case "Grobbulus":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1111-icon.jpg";
         case "Gluth":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1108-icon.jpg";
         case "Thaddius":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1120-icon.jpg";
         case "Noth the Plaguebringer":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1117-icon.jpg";
         case "Heigan the Unclean":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1112-icon.jpg";
         case "Loatheb":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1115-icon.jpg";
         case "Anub'Rekhan":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1107-icon.jpg";
         case "Grand Widow Faerlina":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1110-icon.jpg";
         case "Maexxna":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1116-icon.jpg";
         case "Instructor Razuvious":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1113-icon.jpg";
         case "Gothik the Harvester":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1109-icon.jpg";
         case "The Four Horsemen":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1121-icon.jpg";
         case "Sapphiron":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1119-icon.jpg";
         case "Kel'Thuzad":
            return "https://assets.rpglogs.com/img/warcraft/bosses/1114-icon.jpg";
         case "Wrathion":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2329-icon.jpg";
         case "Maut":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2327-icon.jpg";
         case "The Prophet Skitra":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2334-icon.jpg";
         case "Prophet Skitra":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2334-icon.jpg";
         case "Dark Inquisitor Xanesh":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2328-icon.jpg";
         case "The Hivemind":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2333-icon.jpg";
         case "Shad'har the Insatiable":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2335-icon.jpg";
         case "Drest`agath":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2343-icon.jpg";
         case "Drest'agath":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2343-icon.jpg";
         case "Vexiona":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2336-icon.jpg";
         case "Ra-den the Despoiled":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2331-icon.jpg";
         case "Il'gynoth, Corruption Reborn":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2345-icon.jpg";
         case "Carapace of N'Zoth":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2337-icon.jpg";
         case "N'Zoth the Corruptor":
            return "https://assets.rpglogs.com/img/warcraft/bosses/2344-icon.jpg";
         case "Atal'Dazar":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11763-icon.jpg";
         case "Freehold":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11754-icon.jpg";
         case "Kings' Rest":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11762-icon.jpg";
         case "Shrine of the Storm":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11864-icon.jpg";
         case "Siege of Boralus":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11822-icon.jpg";
         case "Temple of Sethraliss":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11877-icon.jpg";
         case "The MOTHERLODE!!":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11594-icon.jpg";
         case "The Underrot":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11841-icon.jpg";
         case "Tol Dagor":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11771-icon.jpg";
         case "Waycrest Manor":
            return "https://assets.rpglogs.com/img/warcraft/bosses/11862-icon.jpg";
         case "Operation: Mechagon - Junkyard":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12097-icon.jpg";
         case "Operation: Mechagon - Workshop":
            return "https://assets.rpglogs.com/img/warcraft/bosses/12098-icon.jpg";
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
            return "https://icons.wowdb.com/retail/medium/inv_misc_questionmark.jpg?39653";
      };
   };
   const affixesHandler = (affix) => {
      switch (affix) {
         case "Overflowing":
            return "https://icons.wowdb.com/retail/medium/inv_misc_volatilewater.jpg?39653";
         case "Skittish":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_magic_lesserinvisibilty.jpg";
         case "Volcanic":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_shaman_lavasurge.jpg";
         case "Necrotic":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_deathknight_necroticplague.jpg";
         case "Teeming":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_nature_massteleport.jpg";
         case "Raging":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_warrior_focusedrage.jpg";
         case "Bolstering":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_warrior_battleshout.jpg";
         case "Sanguine":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_shadow_bloodboil.jpg";
         case "Tyrannical":
            return "https://assets.rpglogs.com/img/warcraft/abilities/achievement_boss_archaedas.jpg";
         case "Fortified":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_toughness.jpg";
         case "Bursting":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_ironmaidens_whirlofblood.jpg";
         case "Grievous":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_backstab.jpg";
         case "Explosive":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_fire_felflamering_red.jpg";
         case "Quaking":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_nature_earthquake.jpg";
         case "Relentless":
            return "https://icons.wowdb.com/retail/large/inv_chest_plate04.jpg?39653";
         case "Infested":
            return "https://assets.rpglogs.com/img/warcraft/abilities/achievement_nazmir_boss_ghuun.jpg";
         case "Reaping":
            return "https://assets.rpglogs.com/img/warcraft/abilities/ability_racial_embraceoftheloa_bwonsomdi.jpg";
         case "Beguiling":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_shadow_mindshear.jpg";
         case "Awakened":
            return "https://assets.rpglogs.com/img/warcraft/abilities/trade_archaeology_nerubian_obelisk.jpg";
         case "Prideful":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_animarevendreth_buff.jpg";
         case "Inspiring":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_holy_prayerofspirit.jpg";
         case "Spiteful":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_holy_prayerofshadowprotection.jpg";
         case "Storming":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_nature_cyclone.jpg";
         case "Tormented":
            return "https://assets.rpglogs.com/img/warcraft/abilities/spell_animamaw_orb.jpg";
         default:
            return "https://icons.wowdb.com/retail/medium/inv_misc_questionmark.jpg?39653";
      };
   };

   const fightSummary = (item) => {
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
      <>
         {(item.affixes == "none") ? 
            <TableRow onClick={() => fightSummary(item)} style={{color: 'white'}}>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">
                  {item.difficulty}
               </TableCell>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">
                  <Typography style={{display:"flex", textAlign: "left"}}>
                     <img style={{height: "48px", align: "center"}} src={bossImage(item.name)} alt={item.name} title={item.name}/>
                     <Typography style={{align:"left", marginTop: "auto", marginBottom: "auto"}}>&nbsp;&nbsp;{item.name}</Typography>
                  </Typography>
               </TableCell>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">
                  {millisToMinutesAndSeconds(item.length)}
               </TableCell>
            </TableRow>
         :
            <TableRow onClick={() => fightSummary(item)} style={{color: 'white'}}>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">
                  {item.difficulty} {item.keystoneLevel} <br />
                  {item.affixes.map((affix) => {
                     return <img style={{height: "24px"}} src={affixesHandler(affix)} alt={affix} title={affix}/>
                  })}
               </TableCell>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">
                  <Typography style={{display:"flex", textAlign: "left"}}>
                     <img style={{height: "48px", align: "center"}} src={bossImage(item.name)} alt={item.name} title={item.name}/>
                     <Typography style={{align:"left", marginTop: "auto", marginBottom: "auto"}}>&nbsp;&nbsp;{item.name}</Typography>
                  </Typography>
               </TableCell>
               <TableCell style={{color: 'white', border: "1px solid white", fontSize: "18px"}} align="left">{millisToMinutesAndSeconds(item.length)}</TableCell>
            </TableRow>
         }
      </> 
   );
}; // end of main function for this page


export default ReportItem;