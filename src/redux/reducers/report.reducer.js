const reportReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "POST_REPORT":
         //console.log('POST_REPORT has:', action.payload); // test function
         state = action.payload;
         return state;
      default:
         return state;
   };
};

export default reportReducer;