const searchReducer = (state = [], action) => {
   switch (action.type) {
      case "OVERVIEW":
         let fights = [action.payload.fights];
         console.log('fights is', fights[0]);
         return fights[0];
      default:
         return state;
   };
};

export default searchReducer;