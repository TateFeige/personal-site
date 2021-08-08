const favoriteReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "POST_FAVORITES_LIST":
         state = action.payload;
         //console.log('POST_FAVORITES has:', favoritesList); // test function
         return state;
      default:
         return state;
   };
};

export default favoriteReducer;