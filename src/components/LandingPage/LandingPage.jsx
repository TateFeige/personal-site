import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import MyStack from '../MyStack/MyStack';
import MyProjectsHeader from '../MyProjectsHeader/MyProjectsHeader';
import WCLCarousel from '../WCLCarousel/WCLCarousel';
import STEMtellCarousel from '../STEMtellCarousel/STEMtellCarousel';
import { Grid } from '@material-ui/core';


function LandingPage() {
  return (
   <>
      <AboutMe />
      <br /><br /><br />
      <MyStack />
      <br /><br /><br />
      <center>
         <MyProjectsHeader />
         <br />
         <Grid container spacing={3} >
            <Grid item xs={12} sm={6}><WCLCarousel />
            </Grid>
            <Grid item xs={12} sm={6}><STEMtellCarousel />
            </Grid>
         </Grid> 
      </center>
   </>
  );
};


export default LandingPage;