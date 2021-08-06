import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* search(searchQuery) {
   const query = searchQuery.payload;
   //console.log(`Search saga has ${query}`); // test function
   //console.log(query); // test function
   try {
      const WCLResponse = yield axios.get(`/api/search/search/${query}`);
      //console.log("data is:", WCLResponse.data.data.reportData.report); // test function
      const date = new Date(WCLResponse.data.data.reportData.report.startTime);
      const start = date.toLocaleDateString("en-US");
      const overview = {date: start, report_length: (WCLResponse.data.end - WCLResponse.data.start), title: WCLResponse.data.title, zone: WCLResponse.data.zone, url: query};
      const report = {id: query, name: WCLResponse.data.data.reportData.report.title};
      //console.log(overview); // test function
      yield put ({type: "POST_SUMMARY", payload: WCLResponse.data.data.reportData.report});
      yield put ({type: "POST_REPORT", payload: report});
      yield put ({type: "POST_OVERVIEW", payload: overview});
   }
   catch(error) {
      console.log(`Error in search.saga, ${error}`);
   };
};

function* searchHealing(searchQuery) {
   const query = searchQuery.payload;
   //console.log(`Search saga has ${query}`); // test function
   //console.log(query); // test function
   try {
      const WCLResponse = yield axios.get(`/api/search/healing/${query}`);
      console.log("healing data is:", WCLResponse.data.data.reportData.report.rankings.data); // test function
      // const date = new Date(WCLResponse.data.data.reportData.report.startTime);
      // const start = date.toLocaleDateString("en-US");
      // const overview = {date: start, report_length: (WCLResponse.data.end - WCLResponse.data.start), title: WCLResponse.data.title, zone: WCLResponse.data.zone, url: query};
      // const report = {id: query, name: WCLResponse.data.data.reportData.report.title};
      // //console.log(overview); // test function
      yield put ({type: "BOSS_HEALING", payload: WCLResponse.data.data});
      // yield put ({type: "POST_REPORT", payload: report});
      // yield put ({type: "POST_OVERVIEW", payload: overview});
   }
   catch(error) {
      console.log(`Error in healing.saga, ${error}`);
   };
};

function* searchSaga() {
    yield takeLatest('SEARCH', search);
    yield takeLatest('HEALING', searchHealing)
};
  
export default searchSaga;