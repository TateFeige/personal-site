import axios from 'axios';

const searchReducer = (state = [], action) => { // reducer that holds our search query and its data returned
   switch (action.type) {
      case "POST_SUMMARY":
         //console.log('data is:', action.payload.rankings.data); // test function
         let fights = action.payload.rankings.data;
         //console.log('Kills are:', fightsToReturn); // test function
         //console.log('All fights are:', fights); // test function
         return fights;
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