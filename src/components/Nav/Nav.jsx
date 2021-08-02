import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({root:{display: 'flex', flexWrap: 'wrap'}, margin:{width: '600px',  margin: theme.spacing(1), justifyContent:"flex-start",}, withoutLabel:{marginTop: theme.spacing(3)}}));
// materialUI style handler

function Nav() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <Box className="nav">
      <Link to="/home"><h2 className="nav-title">WarcraftLogs Visualizer</h2></Link>
      <Box>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="searchInput">Search</InputLabel>
          <OutlinedInput id="searchInput" labelWidth={60} endAdornment=
            {
            <InputAdornment position="end">
              <IconButton aria-label="search" edge="end">
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
}

export default Nav;
