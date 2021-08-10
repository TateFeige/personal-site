import axios from 'axios';

const searchReducer = (state = [], action) => { // reducer that holds our search query and its data returned
   switch (action.type) {
      case "POST_SUMMARY":
         state = action.payload.rankings.data;
         return state;
      case "POST_OVERVIEW":
         const overview = action.payload;
         axios.post('/api/database/postoverview', overview);
         return state;
      default:
         return state;
   };
};

export default searchReducer;