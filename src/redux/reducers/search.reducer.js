import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

const searchReducer = (state = [], action) => {
   switch (action.type) {
      case "POST_SUMMARY":
         console.log ('stuff');
         console.log(action.payload);
         let fights = action.payload.fights;
         let fightsToReturn = [];
         for (let x = 0; x < fights.length; x++) {
            if (fights[x].kill === true) {
               console.log(fights[x]); // test function
               fightsToReturn.push(fights[x]);
            }
         }
         //console.log('Kills are:', fightsToReturn); // test function
         //console.log('All fights are:', fights); // test function
         return fightsToReturn;
      case "POST_OVERVIEW":
         //console.log('in POST_OVERVIEW');
         const overview = action.payload;
         //console.log(action.payload);
         axios.post('/api/database/postoverview', overview);
         return state;
      default:
         return state;
   };
};

export default searchReducer;