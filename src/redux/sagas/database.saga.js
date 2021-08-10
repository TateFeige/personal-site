import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToDatabase(reportItem) { // main call for adding an item to our report database
   const item = reportItem.payload;
   try {
      const itemToAdd = yield axios.get(`/api/database/newitem/${item}`);
      yield axios.post(`/api/database/additem`, itemToAdd);
   }
   catch(error) {
      console.log('Error in addToDatabase:', error); // catches any errors and logs them
   };
};

function* getDB() { // sends report database back to user page for displaying info
   try {
      const db = yield axios.get('/api/database/getdb');
   }
   catch(error) {
      console.log('Error in getDB:', error);
   };
};


function* databaseSaga() { // listens for calls and runs a given function when one is heard
   yield takeLatest('ADD_TO_DATABASE', addToDatabase);
   yield takeLatest('GET_DB', getDB);
};
 
export default databaseSaga;