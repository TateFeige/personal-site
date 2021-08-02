import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

//MaterialUI imports
import Box from '@material-ui/core/Box';
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


function UserPage() {
   const classes = useStyles();

   // this component doesn't do much to start, just renders some user reducer info to the DOM
   const user = useSelector((store) => store.user);
   //<h2>Welcome, {user.username}!</h2>


   return (
      <Box>
         <h2>Welcome, {user.username}!</h2>
         <Grid container justify="space-between">
         <Box style={{width: "40%"}}>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Date Created</StyledTableCell>
                     <StyledTableCell align="left">Report Name</StyledTableCell>
                     <StyledTableCell align="left">View</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <StyledTableRow >
                  <StyledTableCell component="th" scope="row"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  </StyledTableRow>
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         <br />
         <Box style={{width: "40%"}} alignItems="flex-end">
         <TableContainer component={Paper}>
            <Table className={classes.table}  aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Date Created</StyledTableCell>
                     <StyledTableCell align="left">Report Name</StyledTableCell>
                     <StyledTableCell align="left">View</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <StyledTableRow >
                  <StyledTableCell component="th" scope="row"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  </StyledTableRow>
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         </Grid>
      </Box>
      );
   };

// this allows us to use <App /> in index.js
export default UserPage;
