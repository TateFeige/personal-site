const searchReducer = (state = [], action) => { // reducer that holds our search query
   switch (action.type) {
      case "POST_SUMMARY":
         state = action.payload.rankings.data;
         return state;
      default:
         return state;
   };
};


export default searchReducer;