const reportReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "POST_REPORT":
         state = action.payload;
         return state;
      default:
         return state;
   };
};

export default reportReducer;