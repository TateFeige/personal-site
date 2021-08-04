import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* report(reportItem) {
   const boss = reportItem.payload;
   //console.log(`report saga has:`, boss); // test function
   try {
      const bossResponse = yield axios.get(`/api/search/report/bossreport/`, {
         params: { // data to send to our axios call, since we need this data for the API call
            difficulty: boss.difficulty,
            end_time: boss.end_time,
            start_time: boss.start_time,
            id: boss.id,
            url: boss.url,
            name: boss.name
         }
      });
      //console.log('bossResponse is:', bossResponse); // test function
      yield put({type: "POST_BOSS_FIGHT", payload: bossResponse});
   }
   catch(error) {
      console.log('Error in bossResponse:', error);
   };
};

function* bossReportSaga() {
    yield takeLatest('BOSS_REPORT', report);
};
  
export default bossReportSaga;