import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* addFavorite(favoriteItem) {
   const favorite = favoriteItem.payload;
   try {
      const favorites = yield axios.get('/api/database/getfavorites');
      for (let x = 0; x < favorites.data.length; x++) { // checks user's current favorites for a match and declines to post if there is one
         if (favorites.data[x] == favorite) { // alert user with a popup if there is a match
            alert(`Looks like you're trying to add a duplicate!
Why would you need this twice?`);
            return true;
         };
      };
      yield axios.post(`/api/database/addfavorite/${favorite}`); // if there isn't a match then post it
   }
   catch (error) { // catches any errors and logs them
      console.log('Error in addFavorites:', error);
   };
};


function* deleteFavorite(favoriteItem) {
   const favorite = favoriteItem.payload;
   console.log(`deleteFavorite saga has:`, favorite); // test function
   try {
      console.log(favorite);
      yield axios.post(`/api/database/removefavorite/${favorite}`);
   }
   catch (error) { // catches any errors and logs them
      console.log("Error in deleteFavorite:", error);
   };
};


function* getFavorites() {
   try {
      const favorites = yield axios.get('/api/database/getfavorites');
      const db = yield axios.get('/api/database/getdb');
      let favoritesDetails = [];
      for (let x = 0; x < db.data.length; x++) {
         for (let y = 0; y < favorites.data.length; y++) {
            if (favorites.data[y] == db.data[x].report_code)
            {
               favoritesDetails.push(db.data[x]);
            };
         };
      };
      yield put ({type: "POST_FAVORITES_LIST", payload: favoritesDetails});
   }
   catch (error) { // catches any errors and logs them
      console.log('Error in getFavorites:', error);
   };
};


function* favoriteSaga() { // listens for calls and runs a given function when one is heard
   yield takeLatest('ADD_TO_FAVORITES', addFavorite);
   yield takeLatest('DELETE_FAVORITE', deleteFavorite);
   yield takeLatest('GET_FAVORITES', getFavorites);
};

  
export default favoriteSaga;