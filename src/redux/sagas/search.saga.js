import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* search(searchQuery) {
   const query = searchQuery.payload;
   //console.log(`Search saga has ${query}`); // test function
   try {
      const WCLResponse = yield axios.get(`/api/search/search/${query}`);
      //console.log(WCLResponse.data); // test function
      const date = new Date(WCLResponse.data.start);
      const start = date.toLocaleDateString("en-US");
      const overview = {date: start, title: WCLResponse.data.title, zone: WCLResponse.data.zone, url: query};
      console.log(overview);
      yield put ({type: "POST_OVERVIEW", payload: overview});
      yield put ({type: "POST_SUMMARY", payload: WCLResponse.data});
   }
   catch(error) {
      console.log(`Error in search.saga, ${error}`);
   };
};

function* searchSaga() {
    yield takeLatest('SEARCH', search);
};
  
export default searchSaga;