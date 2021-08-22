import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

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

function App() {
   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            <NavBar />
         </div>
         <div>
         </div>
      </ThemeProvider>
   );
};

export default App;