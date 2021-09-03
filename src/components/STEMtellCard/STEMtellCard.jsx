import { Avatar, Card, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./STEMtellCard.css";


function StemtellCard() {

  const userClasses = useSelector((store) => store.classes)
  console.log(userClasses, "user classes");

  useEffect(() => {
    dispatch({ type: "FETCH_USER_FEED"} ); //need to use the value from FETCH CLASSES
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const stemtells = useSelector((store) => store.stemtells);

  const onUserProfile = (author_id) => {
   
    history.push(`/profile/${author_id}`);
  }

  return (
    <Grid
      item
      container
    >
      {stemtells.map((stemtell) => {
        return (
      <Grid item key={stemtell.id}>
        <Card className="StemCard">
        <h6 id="stemDate">{stemtell.date_published}</h6>
          <Avatar className="Avatar"
          src={stemtell.profile_picture_url} />
          <section className="UserName" onClick={() => onUserProfile(stemtell.author_id)}>{stemtell.username}</section>
          <div className="UserName" id="userClass">
            {stemtell.class_name}
          </div>

          <h3 id="stemTitle"> {stemtell.title}</h3>

          <img src={stemtell.media_url} />
          <section id="cardReactions">{stemtell.reaction_name}</section>

          <section id="stemDescription">{stemtell.body_text}</section>
        </Card>
      </Grid>
        )
        })}
    </Grid>
)
};

export default StemtellCard;
