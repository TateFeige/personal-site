//Main imports
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

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
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 18,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});

const dataColumns = [
   { field: 'RankPercent', headerName: 'Rank %', width: 150 },
   { field: 'Rank', headerName: 'Rank', width: 150 },
   { field: 'id', headerName: 'Player', width: 150 },
   { field: 'HPS', headerName: 'HPS', width: 150 },
   { field: 'ilvl', headerName: 'ilvl', width: 150 },
   { field: 'ilvlPercent', headerName: 'ivlv%', width: 150 }, 
];
const dataRows = [
   {RankPercent: 5,
   Rank: 200,
   id: 'Sageth',
   HPS: 2500,
   ilvl: 242,
   ilvlPercent: 50,
   
   
   }
]


function HealingRow(item) {
   const test = () => {
      console.log(item);
   }


   return (
      {
         RankPercent: item.rankPercent,
         Rank: item.rank,
         id: item.name,
         HPS: item.total,
         ilvl: item.ilvl,
         ilvlPercent: item.ilvlParse,
      }
   );
};


export default HealingRow;