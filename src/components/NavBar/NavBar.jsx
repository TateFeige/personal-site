import React from 'react';
import {
   HashRouter as Router,
   Route,
   Redirect,
 } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
   const classes = useStyles();
   const [auth, setAuth] = React.useState(true);
   const [anchorEl, setAnchorEl] = React.useState(null);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
               </IconButton>
            <Typography variant="h6" className={classes.title}>
               Photos
            </Typography>
            <Router>
               <div>
                  <IconButton
                     href="mailto:tatefeige@gmail.com"
                     aria-label="email"
                     color="inherit"
                  >
                     <MailOutlineIcon />
                  </IconButton>
                  <IconButton  
                     href="https://github.com/tatefeige"
                     target="_blank"
                     aria-label="GitHub"
                     color="inherit"
                  >
                     <GitHubIcon />
                  </IconButton>
                  <IconButton
                     href="https://www.linkedin.com/in/tate-feige/"
                     target="_blank"
                     aria-label="LinkedIn"
                     color="inherit"
                  >
                     <LinkedInIcon />
                  </IconButton>
               </div>
            </Router>
            </Toolbar>
         </AppBar>
      </div>
   );
};