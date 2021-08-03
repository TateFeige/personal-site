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


function UserPage() {
   const classes = useStyles();
   const user = useSelector((store) => store.user);


   return (
      <Box aria-label="user page">
         <Box textAlign="center" aria-label="user information">
         <h1>Welcome, {user.username}</h1>
         <h2>Current Character:</h2>
         <h3>{user.character}</h3>
         <Button variant="contained" color="primary" disableElevation>Change Character</Button>
         </Box>
         <br /><br /><br />
         <Grid container justify="space-between" aria-label="history and favorites tables container">
         <Box style={{width: "40%"}} aria-label="history table container">
         <TableContainer component={Paper}>
            <h2 align="center">History</h2>
            <Table className={classes.table} aria-label="User History Table">
            <caption>History Table</caption>
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
         <Box style={{width: "40%"}} alignItems="flex-end" aria-label="favorites table container">
         <TableContainer component={Paper}>
            <h2 align="center">Favorites</h2>
            <Table className={classes.table}  aria-label="User Favorites Table">
            <caption>Favorites Table</caption>
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


export default UserPage;