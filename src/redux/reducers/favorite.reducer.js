const favoriteReducer = (state = [], action) => { // reducer that holds data for a user favorites list
   switch (action.type) {
      case "POST_FAVORITES_LIST":
         const favHandler = action.payload;
         for (let x = 0; x < favHandler.length; x++)  { // loops through guild name and converts the raw API call into a readable format
            let guildName = ``;
            if (favHandler[x].guild_faction == "Horde") { // if guild faction is Horde, create the following string
               guildName = `[H] ${favHandler[x].guild_name}-${favHandler[x].guild_server}`;
            }
            else if(favHandler[x].guild_faction == "Alliance") { // else if guild faction is Alliance, create the following string
               guildName = `[A] ${favHandler[x].guild_name}-${favHandler[x].guild_server}`;
            }
            else { // otherwise, return no guild
               guildName = 'No guild';
            }
            newFavList.push({id: favHandler[x].id, code: favHandler[x].report_code, date: favHandler[x].date, guild: guildName, title: favHandler[x].report_name, zone: favHandler[x].zone});
            // push data we want to be displayed on the favorites table to an array
         }
         state = newFavList;
         return state; 
      default:
         return state;
   };
};


export default favoriteReducer;