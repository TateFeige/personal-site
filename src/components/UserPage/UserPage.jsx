//Main imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


//MaterialUI imports
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles((theme) => ({table: {minWidth: 700}}, {modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', color:"black"}, paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},}));
import './UserPage.css';


function UserPage() { // main function for this page
   const favoritesDataColumns = [{ field: 'date', type: 'date', headerName: 'Date Created', flex: 2 }, { field: 'guild', type: 'string', headerName: 'Guild', flex: 2 }, { field: 'title', type: 'string', headerName: 'Report Name', flex: 2,  renderCell: (params) => {return (<div style={{ cursor: "pointer" }}>{params.row.title}</div>);}}, { field: 'zone', type: 'string', headerName: 'Zone', flex: 2 }, { field: 'DeleteButton', type: 'string', headerName: 'Delete', flex: 2, renderCell: (params) => {return (<div style={{ cursor: "pointer" }}><Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteFavorite(params.row)}>Delete</Button></div>);}},];
   // condensed handler for datagrid columns
   const deleteFavorite = (item) => { // handles deleting the selected item
      if (confirm(`Remove <${item.title}> from your favorites?`) === false) { // pop up asking for confirmation of delete, if cancel is hit decline to delete
         return false;
     };
      dispatch({
         type: "DELETE_FAVORITE",
         payload: item.code
      });
      dispatch({type: 'GET_FAVORITES'});
   };
   // handles redirecting to report page on report name click
   const handleCellClick = (param) => { if (param.colDef.headerName == "Report Name") {history.push(`/report/${param.row.code}`)}}; // redirects to report code when cell a cell under the Report Name column is clicked
   const getSearchQueryByFullURL = (url) => {return url.split('/')}; // isolate the text after the final "/" in our input URL, since our API only takes that final string and not the whole URL
   const [armoryLink, setArmoryLink] = useState('');
   const history = useHistory();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setOpen(true);};
   const handleClose = () => {setOpen(false); setArmoryLink('')};
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const favoritesList = useSelector((store) => store.favorites);
   useEffect(() => {dispatch({type: 'GET_FAVORITES'});}, []);
   // get data on page load
   
   const saveCharacter = () => { // handles input character link breakdown for database storage and DOM use
      let characterToSend = '';
      let characterRegion = '';
      let characterRealm = '';
      let characterName = '';
      let profileLink = '';
      if (getSearchQueryByFullURL(armoryLink)[2] == "www.warcraftlogs.com") { // checks if input URL warcraftlogs.com and then isolates data to set as user character
         characterRegion = (getSearchQueryByFullURL(armoryLink)[4].toUpperCase());
         characterRealm = (getSearchQueryByFullURL(armoryLink)[5].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[5].slice(1));
         characterName = (getSearchQueryByFullURL(armoryLink)[6].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[6].slice(1));
         profileLink = (`https://www.warcraftlogs.com/character/${characterRegion}/${characterRealm}/${characterName}`);
         characterToSend = {
            Name: `(${characterRegion}) ${characterName}-${characterRealm}`,
            Armory: profileLink
         };
      };
      if (getSearchQueryByFullURL(armoryLink)[2] == "raider.io") { // checks if input URL is raider.io and then isolates data to set as user character
         characterRegion = (getSearchQueryByFullURL(armoryLink)[4].toUpperCase());
         characterRealm = (getSearchQueryByFullURL(armoryLink)[5].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[5].slice(1));
         characterName = (getSearchQueryByFullURL(armoryLink)[6].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[6].slice(1));
         profileLink = (`https://raider.io/characters/${characterRegion}/${characterRealm}/${characterName}`);
         characterToSend = {
            Name: `(${characterRegion}) ${characterName}-${characterRealm}`,
            Armory: profileLink
         };
      };
      if (getSearchQueryByFullURL(armoryLink)[2] == "worldofwarcraft.com") { // // checks if input URL is worldofwarcraft.com and then isolates data to set as user character
         characterRegion = (getSearchQueryByFullURL(armoryLink)[5].toUpperCase());
         characterRealm = (getSearchQueryByFullURL(armoryLink)[6].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[6].slice(1));
         characterName = (getSearchQueryByFullURL(armoryLink)[7].charAt(0).toUpperCase() + getSearchQueryByFullURL(armoryLink)[7].slice(1));
         profileLink = (`https://worldofwarcraft.com/${getSearchQueryByFullURL(armoryLink)[3]}/character/${characterRealm}/${characterName}`);
         characterToSend = {
         Name: `(${characterRegion}) ${characterName}-${characterRealm}`,
         Armory: profileLink
         };
      };
      if (characterToSend == '' || characterRegion == '' || characterRealm == '' || characterName == '' || profileLink == '') {
         alert("Invalid link");
         setArmoryLink('');
         return false;
      }
      dispatch({
         type: "CHANGE_CHARACTER",
         payload: characterToSend
      });
      handleClose();
      dispatch({
         type: "FETCH_USER"
      });
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
               align="center"
               aria-labelledby="player link modal"
               aria-describedby="transition-modal-description"
               className={classes.modal}
               open={open}
               onClose={handleClose}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{timeout: 500}}
            >
               <Fade in={open}>
                  <Box className={classes.paper} style={{width: "35%", height: "10%", minHeight:"150px"}} aria-labelledby="Change Character Input">
                     <TextField style={{width: "100%"}} autoComplete="off" id="SetLink" label="Link" helperText={<>
                        <a href="https://www.warcraftlogs.com" target="_blank" style={{fontSize: "16px"}}>WarcraftLogs</a><a style={{fontSize: "16px"}}>, </a>
                        <a href="https://worldofwarcraft.com" target="_blank" style={{fontSize: "16px"}}>WorldofWarcraft</a><a style={{fontSize: "16px"}}>, or </a>
                        <a href="https://raider.io" target="_blank" style={{fontSize: "16px"}}>Raider.io</a>
                     </>} 
                     placeholder="E.g. https://worldofwarcraft.com/en-us/character/us/kelthuzad/Asmongold"  variant="outlined" value={armoryLink} onChange={(event) => setArmoryLink(event.target.value)}/><br />
                     <br />
                     <Button style={{width: "30%", height:"35%", display: "flex"}} variant="contained" color="primary" disableElevation onClick={saveCharacter}>Save</Button>
                  </Box>
               </Fade>
            </Modal>
            <h1>Welcome, {user.username}</h1>
            <h2>Current Character:</h2>
            <h3><a href={user.armory} target="_blank_" style={{color:"pink"}}>{user.character}</a></h3>
            <Button variant="contained" color="primary" disableElevation onClick={handleOpen}>Change Character</Button>
            </Box>
            <br /><br /><br />
            <Grid container justifyContent="center" aria-label="history and favorites tables container">
            <br />
            <Box style={{width: "85%"}}>
               <DataGrid
                  style={{backgroundColor: '#242424', color: 'white'}}
                  showColumnRightBorder
                  hideFooter
                  onCellClick={handleCellClick}
                  disableSelectionOnClick
                  autoHeight
                  autoWidth
                  rows={favoritesList}
                  columns={favoritesDataColumns}
               />
            </Box>
         </Grid>
      </Box>
      }
      </>
   );
}; // end of main function for this page


export default UserPage;