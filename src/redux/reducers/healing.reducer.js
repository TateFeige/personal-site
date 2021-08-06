import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

const healingReducer = (state = [], action) => {
   switch (action.type) {
      case "POST_HEALING":
         //console.log('data is:', action.payload.rankings.data); // test function
         let fights = action.payload;
         //console.log('Kills are:', fightsToReturn); // test function
         //console.log('All fights are:', fights); // test function
         return fights;
      default:
         return state;
   };
};

export default healingReducer;