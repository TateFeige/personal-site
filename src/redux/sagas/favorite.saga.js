import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFavorite(reportItem) {
   const item = reportItem.payload;
   //console.log(`addFavorite saga has:`, item); // test function
   try {
      //const favoriteItem = yield axios.get(')
      //console.log(item);
      const testing = yield axios.get(`/api/search/favorite/${item.report.id}`);
      console.log('test came back:', testing);
     
   }
   catch(error) {
      console.log('Error in addFavorite:', error); // catches any errors and logs them
   };
};

function* removeFavorite(reportItem) {
   const boss = reportItem.payload;
   console.log(`removeFavorite saga has:`, boss); // test function
};


function* favoriteSaga() { // listens for calls and runs a given function when one is heard
    yield takeLatest('ADD_TO_FAVORITES', addFavorite);
    yield takeLatest('REMOVE_FROM_FAVORITES', removeFavorite)
};
  
export default favoriteSaga;