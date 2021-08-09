import axios from 'axios';

const searchReducer = (state = [], action) => { // reducer that holds our search query and its data returned
   switch (action.type) {
      case "POST_SUMMARY":
         //console.log('POST_SUMMARY data is:', action.payload.rankings.data); // test function
         state = action.payload.rankings.data;
         return state;
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