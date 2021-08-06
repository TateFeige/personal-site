const reportReducer = (state = [], action) => { // reducer that holds data for a submitted report
   switch (action.type) {
      case "POST_REPORT":
         //console.log('POST_REPORT has:', action.payload); // test function
         return action.payload;
      default:
         return state;
   };
};

export default reportReducer;