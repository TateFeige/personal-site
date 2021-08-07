import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFavorite(favoriteItem) {
   const favorite = favoriteItem.payload;
   console.log(`addFavorite saga has:`, favorite); // test function
   yield axios.get(`/api/database/addfavorite/${favorite}`);
};

function* removeFavorite(favoriteItem) {
   const favorite = favoriteItem.payload;
   console.log(`removeFavorite saga has:`, favorite); // test function
};


function* favoriteSaga() { // listens for calls and runs a given function when one is heard
   yield takeLatest('ADD_TO_FAVORITES', addFavorite);
   yield takeLatest('REMOVE_FROM_FAVORITES', removeFavorite);
};
  
export default favoriteSaga;