import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToDatabase(reportItem) {
   const item = reportItem.payload;
   console.log(`addToDatabase saga has:`, item); // test function
   try {
      //const favoriteItem = yield axios.get(')
      //console.log(item);
      const itemToAdd = yield axios.get(`/api/database/newitem/${item}`);
      console.log('test came back:', itemToAdd);
      yield axios.post(`/api/database/additem`, itemToAdd);
     
   }
   catch(error) {
      console.log('Error in addToDatabase:', error); // catches any errors and logs them
   };
};

function* getDB() {
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