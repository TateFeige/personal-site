import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* search(searchQuery) { // main search function, this is where we sort our data received from the API
   const query = searchQuery.payload;
   try {
      const WCLResponse = yield axios.get(`/api/search/search/${query}`); // sets a variable to our response
      const report = {id: query, name: WCLResponse.data.data.reportData.report.title, data: WCLResponse.data.data, keystoneLevel: WCLResponse.data.data.reportData.report.rankings};
      // sets a new variable report and gives it data we want to send
      yield put ({type: "POST_REPORT", payload: report}); // POST_REPORT
      yield put ({type: "POST_SUMMARY", payload: WCLResponse.data.data.reportData.report}); // POST_SUMMARY
   }
   catch(error) { // catches any errors and logs them
      console.log(`Error in search.saga, ${error}`); 
   };
};


function* searchHealing(searchQuery) { // main search healing function, also used alongside the main search function in order to keep our data together
   const query = searchQuery.payload;
   try {
      const WCLResponse = yield axios.get(`/api/search/healing/${query}`); // sets a variable to our response
      yield put ({type: "BOSS_HEALING", payload: WCLResponse.data.data}); // POST_BOSS_HEALING
   }
   catch(error) { // catches any errors and logs them
      console.log(`Error in healing.saga, ${error}`); 
   };
};


function* searchSaga() { // listens for calls and runs a given function when one is heard
    yield takeLatest('SEARCH', search);
    yield takeLatest('HEALING', searchHealing);
};

  
export default searchSaga;