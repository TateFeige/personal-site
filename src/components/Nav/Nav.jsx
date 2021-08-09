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
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({root:{display: 'flex', flexWrap: 'wrap'}, margin:{width: '600px',  margin: theme.spacing(1), justifyContent:"flex-start",}, withoutLabel:{marginTop: theme.spacing(3)}}));
//end of MaterialUI imports


function Nav() {
   const history = useHistory();
   const getSearchQueryByFullURL = (url) => {return url.split('/')};
   const [searchURL, setSearchURL] = useState('');
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   let loginLinkData = {path: '/login', text: 'Login / Register'};
   if (user.id != null) {loginLinkData.path = '/user'; loginLinkData.text = 'Home'};
    const search = () => {
      let searchQuery = getSearchQueryByFullURL(searchURL);
      //console.log(getSearchQueryByFullURL(searchURL));
      if (searchURL == '' || searchURL == ' ' || searchURL.length < 8) {
         alert("Please enter a valid search");
         setSearchURL(''); // clear search field
         return false;
      };
      if (searchQuery[0] !== "https:" && searchQuery[0] !== ""  && searchQuery[0]) {
            //console.log('searching for:', searchQuery[0]);
            dispatch({ // main API call for the search query, returns some core information and the damage report
               type: 'SEARCH',
               payload: searchQuery[0]
            });
            dispatch({ // API call to add some core info of the report to our database for storage
               type: 'ADD_TO_DATABASE',
               payload: searchQuery[0]
            })
            history.push(`/report/${searchQuery[0]}`);
            setSearchURL(''); // clear search field
            return false;
      };
      if (searchQuery[2] !== "www.warcraftlogs.com" && searchQuery[2] !== undefined) {
         alert('Please enter a valid warcraftlogs URL');
         return false;
      };
      if (searchQuery[2] == "www.warcraftlogs.com") {
            //console.log('searching for:', searchQuery[4]);
            dispatch({ // main API call for the search query, returns some core information and the damage report
               type: 'SEARCH',
               payload: searchQuery[4]
            });
            dispatch({ // API call to add some core info of the report to our database for storage
               type: 'ADD_TO_DATABASE',
               payload: searchQuery[4]
            })
            history.push(`/report/${searchQuery[4]}`);
            setSearchURL(''); // clear search field
            return false;
      };
      alert("An unknown error has occurred. Please try again");
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
                  {/* <Link className="navLink" to="/info">Info Page</Link> */}
                  <LogOutButton className="navLink" />
                  </>)}
         </Box>
      </Box>
   );
};

export default Nav;