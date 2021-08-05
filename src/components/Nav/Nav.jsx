//Main imports
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

//MaterialUI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({root:{display: 'flex', flexWrap: 'wrap'}, margin:{width: '600px',  margin: theme.spacing(1), justifyContent:"flex-start",}, withoutLabel:{marginTop: theme.spacing(3)}}));

function Nav() {
   const history = useHistory();
   const [searchURL, setSearchURL] = useState('');
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   let loginLinkData = {path: '/login', text: 'Login / Register'};
   if (user.id != null) {loginLinkData.path = '/user'; loginLinkData.text = 'Home'};
   function getSearchQueryByFullURL(url) {return url.split('/').pop()};
   // isolate the text after the final "/" in our input URL, since our API only takes that final string and not the whole URL
   const search = () => {
      //console.log(`URL submitted is:`, searchURL); //test function to make sure data is correct
      let searchQuery = getSearchQueryByFullURL(searchURL);
      if (searchQuery == "") {
         alert('Please enter a search URL');
         return false;
      };
      //console.log(`Searching for << ${searchQuery} >> on WarcraftLogs`); //test function to make sure data is correct
      dispatch({
         type: 'SEARCH',
         payload: searchQuery
      });
      history.push(`/report/${searchQuery}`);
    };


   return (
      <Box className="nav" aria-label="Navigation Bar">
         <Link to="/home"><h2 className="nav-title">WarcraftLogs Visualizer</h2></Link>
         <Box>
            <FormControl fullWidth className={classes.margin} variant="outlined">
               <InputLabel htmlFor="searchInput">Search</InputLabel>
               <OutlinedInput id="searchInput" labelWidth={60} value={searchURL} onChange={(event) => setSearchURL(event.target.value)} endAdornment=
               {
                  <InputAdornment position="end">
                  <IconButton aria-label="search" edge="end" onClick={search}>
                  <SearchIcon />
                  </IconButton>
                  </InputAdornment>
               }
               />
            </FormControl>
         </Box>
         <Box>
               <Link className="navLink" to={loginLinkData.path}>{loginLinkData.text}</Link>
                  {user.id && (
                  <>
                  <Link className="navLink" to="/info">Info Page</Link>
                  <LogOutButton className="navLink" />
                  </>)}
               <Link className="navLink" to="/about">About</Link>
         </Box>
      </Box>
   );
};

export default Nav;