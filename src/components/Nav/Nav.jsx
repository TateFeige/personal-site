//Main imports
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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


function Nav() {    
   const homeHandler = () => {history.push('/'); setSearchURL('');};
   const loginHandler = () => {history.push('/login'); setSearchURL('');};
   const aboutHandler = () => {history.push('/about'); setSearchURL('');};
   const logoutHandler = () => {dispatch({ type: 'LOGOUT' }); setSearchURL('');};
   const history = useHistory();
   const getSearchQueryByFullURL = (url) => {return url.split('/')};
   const [searchURL, setSearchURL] = useState('');
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = useSelector((store) => store.user);

    const search = () => {
      let searchQuery = getSearchQueryByFullURL(searchURL);
      if (searchURL == '' || searchURL == ' ' || searchURL.length < 8) {
         alert("Please enter a valid search");
         setSearchURL(''); // clear search field
         return false;
      };
      if (searchQuery[0] !== "https:" && searchQuery[0] !== ""  && searchQuery[0]) {
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
               <InputLabel style={{color:"white"}} htmlFor="searchInput">Search</InputLabel>
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
            <a href="tatefeige.com"><Button variant="contained" color="primary" style={{height: "70px"}}>Home</Button></a>
            <Button variant="contained" color="primary" style={{height: "70px"}} onClick={aboutHandler}>About</Button>
            {(user.id == null) ? <Button variant="contained" color="primary" style={{height: "70px"}} onClick={loginHandler}>Log In</Button> :
            <Button variant="contained" color="primary" style={{height: "70px"}} onClick={logoutHandler}>Log Out</Button>
            }
         </Box>
      </Box>
   );
};


export default Nav;
