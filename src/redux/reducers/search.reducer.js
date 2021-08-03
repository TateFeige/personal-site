import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

const searchReducer = (state = [], action) => {
   switch (action.type) {
      case "POST_OVERVIEW":
         let fights = action.payload.fights;
         let fightsToReturn = [];
         for (let x = 0; x < fights.length; x++) {
            if (fights[x].kill === true) {
               console.log(fights[x]);
               axios.post('/api/database/allfights', fights[x]);
               fightsToReturn.push(fights[x]);
            }
         }
         console.log('Kills are:', fightsToReturn);
         console.log('All fights are:', fights);
         return fights;
      default:
         return state;
   };
};

export default searchReducer;