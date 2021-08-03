//Main imports
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

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


function ReportPage() {
   const classes = useStyles();
   const user = useSelector((store) => store.user);


   return (
      <Box aria-label="report page">
         <Grid container justify="center" aria-label="report header">
            <IconButton color="primary" aria-label="Refresh Report"><RefreshIcon /></IconButton>
            <h1 align="center">Report (report.name)</h1>
            <IconButton color="primary" aria-label="Add to favorites"><StarBorderIcon /></IconButton>
         </Grid>
         <br /><br /><br />
         <Grid container justify="center">
         <Box style={{width: "85%"}} aria-label="history table container">
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Report Table">
            <caption>Report Table</caption>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Difficulty</StyledTableCell>
                     <StyledTableCell align="left">Boss</StyledTableCell>
                     <StyledTableCell align="left">Length</StyledTableCell>
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


export default ReportPage;