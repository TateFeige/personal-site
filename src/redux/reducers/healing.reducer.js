const healingReducer = (state = [], action) => { // reducer that holds our healing ranking info from the API cal;
   switch (action.type) {
      case "POST_HEALING":
         //console.log("POST_HEALING has:", action.payload.data); // test function
         state = action.payload;
         return state;
      default:
         return state;
   };
};

export default healingReducer;