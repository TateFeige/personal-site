const favoriteReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "CHECKING_FAVORITES":
         console.log('CHECKING_FAVORITES has:', action.payload.data); // test function
         return state = action.payload.data;
      default:
         return state;
   };
};

export default favoriteReducer;