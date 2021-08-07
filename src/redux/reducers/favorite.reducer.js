const favoriteReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "POST_FAVORITES_LIST":
         let favoritesList = [];
         favoritesList.push(action.payload);
         //console.log('POST_FAVORITES has:', favoritesList); // test function
         return favoritesList
      default:
         return state;
   };
};

export default favoriteReducer;