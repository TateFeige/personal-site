const fightReducer = (state = [], action) => { // reducer that holds data for a submitted report's specific fight
   switch (action.type) {
      case "POST_BOSS_FIGHT":
         //console.log('BOSS_FIGHT has:', action.payload); // test function
         let fightToReturn = [];
         fightToReturn.push(action.payload);
         state = action.payload;
         return state;
      case "GET_FIGHT":
         return state;
      default:
         return state;
   };
};

export default fightReducer;