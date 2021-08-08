//Main imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles((theme) => ({table: {minWidth: 700}}, {modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', color:"black"}, paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},}));
//end of MaterialUI imports


function UserPage() {
   const favoritesDataColumns = [{ field: 'date', type: 'date', headerName: 'Date Created', flex: 2 }, { field: 'guild', type: 'string', headerName: 'Guild', flex: 2 }, { field: 'title', type: 'string', headerName: 'Report Name', flex: 2,  renderCell: (params) => {return (<div style={{ cursor: "pointer" }}>{params.row.title}</div>);}}, { field: 'zone', type: 'string', headerName: 'Zone', flex: 2 }, { field: 'DeleteButton', type: 'string', headerName: 'Delete', flex: 2, renderCell: (params) => {return (<div style={{ cursor: "pointer" }}><Button variant="contained" color="secondary" onClick={() => deleteFavorite(params.row.code)}>Delete</Button></div>);}},];
   // condensed handler for datagrid columns
   const deleteFavorite = (item) => { // handles deleting the selected item
      dispatch({
         type: "DELETE_FAVORITE",
         payload: item
      });
      dispatch({type: 'GET_FAVORITES'});
   };
   // handles redirecting to report page on report name click
   const handleCellClick = (param) => { 
      if (param.colDef.headerName == "Report Name") {
        history.push(`/report/${param.row.code}`);
      };
    };
   const history = useHistory();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setOpen(true);};
   const handleClose = () => {setOpen(false);};
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const favoritesList = useSelector((store) => store.favorites);

   useEffect(() => { // get data on page load
      dispatch({type: 'GET_FAVORITES'});
   }, []);

   const changeCharacter = () => {
      console.log(user.character);
      handleOpen();
   };
   

   return (
      <>
         {(favoritesList === undefined || favoritesList.map === undefined) ?
            <>
            <div>Loading</div>
            </>
      :
      <Box aria-label="user page">
         <Box textAlign="center" aria-label="user information">
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
            >
               <Fade in={open}>
                  <div className={classes.paper}>
                  SOON(TM)
                  </div>
               </Fade>
            </Modal>
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