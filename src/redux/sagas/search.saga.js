import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* search() {
    console.log('Searching for:',)

};

function* searchSaga() {
    yield takeLatest('SEARCH', search);
};
  
export default searchSaga;