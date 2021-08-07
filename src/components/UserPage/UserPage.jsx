//Main imports
import React, {useState, useEffect, component, componentDidMount, componentWillReceiveProps} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import axios from 'axios';

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
import { DataGrid } from '@material-ui/data-grid';
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});
const favoritesDataColumns = [
   { field: 'Date', type: 'date', headerName: 'Date Created', flex: 2 },
   { field: 'Guild', type: 'string', headerName: 'Guild', flex: 2 },
   { field: 'ReportName', type: 'string', headerName: 'Report Name', flex: 2 },
   { field: 'Zone', type: 'string', headerName: 'Zone', flex: 2 },
   { field: 'DeleteButton', type: 'string', headerName: 'Delete', flex: 2 },
];

const favoritesTestDataRows = [
   {
   id: '1',
   Date: '8/8/2019',
   Guild: 'Disambiguation',
   ReportName: 'Sageth Rocks',
   DeleteButton: 'Delete'
   }
]


function UserPage() {
   const dispatch = useDispatch();
   const [favoritesDataRows, setFavoritesDataRows] = useState([]);
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const favoritesList = useSelector((store) => store.favorites[0]);

   const test = () => {
      console.log('testing');
      //console.log(favoritesDataRows);
      let newArray = [];
      console.log(favoritesList);
         favoritesList.map((favItem) => {
         newArray.push({id: favItem.id, Date: favItem.date, Guild: (`[${favItem.guild_faction}] ${favItem.guild_name}-${favItem.guild_server}`), ReportName: favItem.report_name, Zone: favItem.zone})
      });
      setFavoritesDataRows(newArray);
      console.log(favoritesDataRows); // test function
      };
      useEffect(() => { // get data on page load
         dispatch({type: 'GET_FAVORITES'});
      }, []);
   

   return (
      <>
         {(favoritesList === undefined || favoritesList.map === undefined) ?
            <>
            <div>Loading</div>
            </>
      :
      <Box aria-label="user page">
         <Box textAlign="center" aria-label="user information">
         <h1>Welcome, {user.username}</h1>
         <h2>Current Character:</h2>
         <h3>{user.character}</h3>
         <Button variant="contained" color="primary" disableElevation onClick={test}>Change Character</Button>
         </Box>
         <br /><br /><br />
         <Grid container justify="center" aria-label="history and favorites tables container">
         <br />
         {(favoritesList == undefined) ? <div>Waiting</div>
         :
         <Box style={{width: "85%"}} alignItems="center" aria-label="favorites table container">
         <TableContainer component={Paper}>
            <h2 align="center">Favorites</h2>
            <Table className={classes.table}  aria-label="User Favorites Table">
            <caption>Favorites Table</caption>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Date Created</StyledTableCell>
                     <StyledTableCell align="left">Guild</StyledTableCell>
                     <StyledTableCell align="left">Report Name</StyledTableCell>
                     <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {favoritesList.map((favItem) => {
                     return (
                        <FavoriteItem id={favItem.id} date={favItem.date} guild_faction={favItem.guild_faction} guild_name={favItem.guild_name} guild_server={favItem.guild_server} report_code={favItem.report_code} report_name={favItem.report_name} zone={favItem.report_zone} />
                  );})}
               </TableBody>
            </Table>
         </TableContainer>
         </Box>
         }
         <DataGrid
         autoHeight
         autoWidth
         style={{backgroundColor: '#242424', color: 'white'}}
         rows={favoritesDataRows}
         columns={favoritesDataColumns}
         />
         </Grid>
      </Box>
      }
      </>
   );
};


export default UserPage;