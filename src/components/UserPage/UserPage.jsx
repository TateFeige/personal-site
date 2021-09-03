import React, { useEffect } from "react";
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function UserPage() {
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   const dispatch = useDispatch();
   const history = useHistory();
   const stemtells = useSelector((store) => store.stemtells);

   useEffect(() => {
      dispatch({ type: "FETCH_USER_STEMTELLS", payload: user.id });
    }, []);

    const editStemtell = (stemtellID) => {
       dispatch({ type: "GET_STEMTELL", payload: user.id });
       history.push(`/edit/${stemtellID}`);
    }

   return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3}> 
          <Paper className={classes.paper}>
            <img src={user.profile_picture_url}></img>
            <h2>{user.name}</h2> 
            <LogOutButton className="btn" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>Your STEMtells</Paper>
          <Grid container>
            {stemtells.map((stemtell) => {
               return (
                  <Grid item >
                     <Card className="StemCard">
                        <Avatar className="Avatar" />
                        <section className="UserName">{stemtell.username}</section>
                        <div className="UserName" id="userClass">
                           {stemtell.class_name}
                        </div>
                        <h3>{stemtell.title}</h3>
                        <img src={stemtell.media_url} />
                        <section id="cardReactions">{stemtell.reaction_name}</section>
                        <section id="stemDescription">{stemtell.body_text}</section>
                        <button value={stemtell.id} className="btn" onClick={event => {editStemtell(event.target.value)}}>
                           Edit
                        </button>
                     </Card>
                  </Grid>
               )
            })}
         </Grid>
        </Grid>
      </Grid>
    </div>
  );
}


export default UserPage;