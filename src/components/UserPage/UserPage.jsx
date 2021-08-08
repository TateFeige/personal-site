//Main imports
import React, {useState, useEffect, component, componentDidMount, componentWillReceiveProps} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Link, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DataGrid, GridColDef, GridCellParams  } from '@material-ui/data-grid';
const StyledTableCell = withStyles((theme) => ({head:{backgroundColor: theme.palette.common.black, color: theme.palette.common.white}, body:{fontSize: 14,}}))(TableCell);
const StyledTableRow = withStyles((theme) => ({root: {'&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}}}))(TableRow);
const useStyles = makeStyles({table: {minWidth: 700}});

function UserPage() {
   const favoritesDataColumns = [
      { field: 'date', type: 'date', headerName: 'Date Created', flex: 2 },
      { field: 'guild', type: 'string', headerName: 'Guild', flex: 2 },
      { field: 'title', type: 'string', headerName: 'Report Name', flex: 2,  renderCell: (params) => {
         return (
             <div style={{ cursor: "pointer" }}>
                 {params.row.title}
              </div>
         );
      }},
      { field: 'zone', type: 'string', headerName: 'Zone', flex: 2 },
      { field: 'DeleteButton', type: 'string', headerName: 'Delete', flex: 2, renderCell: (params) => {
         return (
             <div style={{ cursor: "pointer" }}>
               <Button variant="contained" color="secondary" onClick={() => deleteFavorite(params.row.code)}>
                  Delete {params.row.code}
               </Button>
              </div>
         );
      }
   },
   ];
   const deleteFavorite = (item) => { // handles deleting the selected item
   //console.log(item); // test function
      dispatch({
         type: "DELETE_FAVORITE",
         payload: item
      });
      dispatch({type: 'GET_FAVORITES'});
   };
   const handleCellClick = (param, event) => {
      //console.log(param.row.code);
      //console.log(param.colDef.headerName);
      if (param.colDef.headerName == "Report Name") {
        //console.log("TO THE REPORT!");
        history.push(`/report/${param.row.code}`);
      }
    };
   const history = useHistory();
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const favoritesList = useSelector((store) => store.favorites);
   useEffect(() => { // get data on page load
      dispatch({type: 'GET_FAVORITES'});
   }, []);
   const changeCharacter = () => {
      console.log(user.character);
   }




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
         <Button variant="contained" color="primary" disableElevation onClick={changeCharacter}>Change Character</Button>
         {/* <Button variant="contained" color="primary" disableElevation onClick={test}>Test</Button> */}
         </Box>
         <br /><br /><br />
         <Grid container justify="center" aria-label="history and favorites tables container">
         <br />
         <DataGrid
         onCellClick={handleCellClick}
         autoHeight
         autoWidth
         style={{backgroundColor: '#242424', color: 'white'}}
         rows={favoritesList}
         columns={favoritesDataColumns}
         />
         </Grid>
      </Box>
      }
      </>
   );
};


export default UserPage;