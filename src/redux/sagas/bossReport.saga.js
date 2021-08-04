import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* report(reportItem) {
   const boss = reportItem.payload;
   console.log(`report saga has:`, boss); // test function
};

function* bossReportSaga() {
    yield takeLatest('BOSS_REPORT', report);
};
  
export default bossReportSaga;