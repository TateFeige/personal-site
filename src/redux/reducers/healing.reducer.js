const healingReducer = (state = [], action) => { // reducer that holds our healing ranking info from the API call;
   switch (action.type){
      case "POST_HEALING":
         state = action.payload;
         return state;
      default:
         return state;
   };
};


export default healingReducer;