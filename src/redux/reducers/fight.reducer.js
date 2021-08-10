const fightReducer = (state = [], action) => { // reducer that holds data for a submitted report's specific fight
   switch (action.type) {
      case "POST_BOSS_FIGHT":
         state = action.payload;
         return state;
      default:
         return state;
   };
};


export default fightReducer;