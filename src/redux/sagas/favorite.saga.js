import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFavorite(favoriteItem) {
   const favorite = favoriteItem.payload;
   //console.log(`addFavorite saga has:`, favorite); // test function
   try {
      const favorites = yield axios.get('/api/database/getfavorites');
      //console.log('Favorites saga has:', favorites) // test function
      for (let x = 0; x < favorites.data.length; x++) { // checks user's current favorites for a match and declines to post if there is one
         if (favorites.data[x] == favorite) { // alert user with a popup if there is a match
            alert(`Looks like you're trying to add a duplicate!
Why would you need this twice?`);
            return true;
         };
      };
      yield axios.post(`/api/database/addfavorite/${favorite}`); // if there isn't a match then post it
   }
   catch (error) {
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
   catch (error) {
      console.log("Error in deleteFavorite:", error);
   }
};

function* getFavorites() {
   //console.log('Getting favorites');
   const favorites = yield axios.get('/api/database/getfavorites');
   //console.log(favorites.data); // test function
   const db = yield axios.get('/api/database/getdb');
   //console.log(db.data); // test function
   let favoritesDetails = [];
   for (let x = 0; x < db.data.length; x++) {
      //console.log(db.data[x].report_code); // test function
      for (let y = 0; y < favorites.data.length; y++) {
         //console.log(favorites.data[y]); // test function
         if (favorites.data[y] == db.data[x].report_code) {
            //console.log(db.data[x]); // test function
            favoritesDetails.push(db.data[x]);
         };
      };
   //console.log(favoritesDetails); // test function
   };
   yield put ({type: "POST_FAVORITES_LIST", payload: favoritesDetails});
};

function* favoriteSaga() { // listens for calls and runs a given function when one is heard
   yield takeLatest('ADD_TO_FAVORITES', addFavorite);
   yield takeLatest('DELETE_FAVORITE', deleteFavorite);
   yield takeLatest('GET_FAVORITES', getFavorites);
};
  
export default favoriteSaga;