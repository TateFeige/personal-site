//Main imports
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

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


function ReportItem(item) {
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const report = useSelector((store) => store.search);
   const bossImage = (bossName) => {
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
         
      }
   }


   return (
      <TableRow>
        <StyledTableCell align="left">{item.difficulty}</StyledTableCell>
        <StyledTableCell align="left"><img src={bossImage(item.name)} />{item.name}</StyledTableCell>
        <StyledTableCell align="left">{item.length}</StyledTableCell>
      </TableRow>
      
   );
};


export default ReportItem;