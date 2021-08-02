import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* search(searchQuery) {
   const query = searchQuery.payload;
   // console.log(`Search saga has ${query}`); // test function
   try {
      const WCLResponse = yield axios.get(`/api/search/${query}`);
      console.log(WCLResponse.data);
   }
   catch(error) {
      console.log(`Error in search.saga, ${error}`);
   };
};

function* searchSaga() {
    yield takeLatest('SEARCH', search);
};
  
export default searchSaga;