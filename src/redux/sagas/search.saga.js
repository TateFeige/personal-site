import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* search(searchQuery) { // main search function, this is where we sort our data received from the API
   const query = searchQuery.payload;
   //console.log(`Search saga has ${query}`); // test function
   //console.log(query); // test function
   try {
      const WCLResponse = yield axios.get(`/api/search/search/${query}`); // sets a variable to our response
      console.log("data is:", WCLResponse.data.data.reportData.report); // test function
      const date = new Date(WCLResponse.data.data.reportData.report.startTime); // sets a date for the report
      const start = date.toLocaleDateString("en-US"); // converts date to a readable format
      const overview = {date: start, report_length: (WCLResponse.data.end - WCLResponse.data.start), title: WCLResponse.data.title, zone: WCLResponse.data.zone, url: query};
      // sets a new variable overview and gives it data we want to send
      const report = {id: query, name: WCLResponse.data.data.reportData.report.title, data: WCLResponse.data.data};
      // sets a new variable report and gives it data we want to send
      yield put ({type: "POST_SUMMARY", payload: WCLResponse.data.data.reportData.report}); // POST_SUMMARY
      yield put ({type: "POST_REPORT", payload: report}); // POST_REPORT
      //yield put ({type: "POST_OVERVIEW", payload: overview}); // POST_OVERVIEW
   }
   catch(error) {
      console.log(`Error in search.saga, ${error}`); // catches any errors and logs them
   };
};

function* searchHealing(searchQuery) { // main search healing function, also used alongside the main search function in order to keep our data together
   const query = searchQuery.payload;
   try {
      const WCLResponse = yield axios.get(`/api/search/healing/${query}`); // sets a variable to our response
      //console.log("healing data is:", WCLResponse.data.data.reportData.report.rankings.data); // test function
      yield put ({type: "BOSS_HEALING", payload: WCLResponse.data.data}); // POST_BOSS_HEALING
   }
   catch(error) {
      console.log(`Error in healing.saga, ${error}`); // catches any errors and logs them
   };
};

function* searchSaga() { // listens for calls and runs a given function when one is heard
    yield takeLatest('SEARCH', search);
    yield takeLatest('HEALING', searchHealing);
};
  
export default searchSaga;