import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* report(reportItem) {
   const boss = reportItem.payload;
   //console.log(`report saga has:`, boss); // test function
   try {
      //console.log('bossResponse is:', boss); // test function
      yield put({type: "POST_BOSS_FIGHT", payload: boss});
   }
   catch(error) {
      console.log('Error in bossResponse:', error);
   };
};

function* healing(reportItem) {
   const boss = reportItem.payload;
   //console.log(`report saga has:`, boss); // test function
   try {
      //console.log('bossResponse is:', boss); // test function
      yield put({type: "POST_HEALING", payload: boss});
   }
   catch(error) {
      console.log('Error in bossResponse:', error);
   };
};


function* bossReportSaga() {
    yield takeLatest('BOSS_REPORT', report);
    yield takeLatest('BOSS_HEALING', healing)
};
  
export default bossReportSaga;