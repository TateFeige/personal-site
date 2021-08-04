//Main imports
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

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
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});


function FightPage() {
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const fightInfo = useSelector((store) => store.fight);
   const test = () => {
      console.log(fightInfo);
   }
   //{fightInfo.data.damageDone.icon}{fightInfo.data.damageDone.name}{fightInfo.data.damageDone.total}

   return (
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
               {fightInfo.data.damageDone.map((reportItem) => {
                  return (
                     <TableRow>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell>{reportItem.icon}</StyledTableCell>
                     <StyledTableCell>{reportItem.name}</StyledTableCell>
                     <StyledTableCell>{reportItem.total}</StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     </TableRow>
                  );})}
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
                     <StyledTableCell>Rank %</StyledTableCell>
                     <StyledTableCell align="left">Rank</StyledTableCell>
                     <StyledTableCell align="left">Player</StyledTableCell>
                     <StyledTableCell align="left">HPS</StyledTableCell>
                     <StyledTableCell align="left">ilvl</StyledTableCell>
                     <StyledTableCell align="left">ilvl %</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
               {fightInfo.data.healingDone.map((reportItem) => {
                  return (
                     <TableRow>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell>{reportItem.icon}</StyledTableCell>
                     <StyledTableCell>{reportItem.name}</StyledTableCell>
                     <StyledTableCell>{reportItem.total}</StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                     </TableRow>
                  );})}
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         </Grid>
      </Box>
   );
};


export default FightPage;