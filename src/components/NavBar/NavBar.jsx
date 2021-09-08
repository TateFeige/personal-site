import React from 'react';
import {
   BrowserRouter as Router,

 } from 'react-router-dom';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import '../App/palette.scss';

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

const theme = createTheme({
   palette: {
     primary: {
       pinklace: '#ffd6ff',
       mauve: '#e7c6ff',
       main: '#c8b6ff',
       lavenderblue: '#b8c0ff',
       lavenderblue2: '#bbd0ff',
       contrastText: '#fff',
     },
     secondary: {
       light: '#ff7961',
       main: '#f44336',
       dark: '#ba000d',
       contrastText: '#000',
     },
   },
 });

export default function NavBar() {
   const classes = useStyles();

   return (
      <ThemeProvider theme={theme}>
      <div className={classes.root}>
         <AppBar position="sticky">
            <Toolbar>
                  {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                     <MenuIcon />
                  </IconButton> */}
            <Typography variant="h6" className={classes.title}>
            </Typography>
            <Router>
               <div>
                  <IconButton
                     href="mailto:tate@tatefeige.com"
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
      </ThemeProvider>
   );
};