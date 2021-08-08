const favoriteReducer = (state = [], action) => { // reducer that holds data for a user favorites list
   switch (action.type) {
      case "POST_FAVORITES_LIST":
         const favHandler = action.payload;
         let newFavList = [];
         //console.log('POST_FAVORITES_LIST has:', favHandler); // test function
         for (let x = 0; x < favHandler.length; x++)  {
            let guildName = ``;
            //console.log(favHandler[x]); // test function
            if (favHandler[x].guild_faction == "Horde") {
               guildName = `[H] ${favHandler[x].guild_name}-${favHandler[x].guild_server}`;
            }
            else if(favHandler[x].guild_faction == "Alliance") {
               guildName = `[A] ${favHandler[x].guild_name}-${favHandler[x].guild_server}`;
            }
            else {
               guildName = 'No guild';
            }
            //console.log(shortGuildFaction); // test function
            //console.log(guildName); // test function
            newFavList.push({id: favHandler[x].id, code: favHandler[x].report_code, date: favHandler[x].date, guild: guildName, title: favHandler[x].report_name, zone: favHandler[x].zone});
         }
         //console.log(newFavList); // test function
         state = newFavList;
         return state;
      default:
         return state;
   };
};

export default favoriteReducer;