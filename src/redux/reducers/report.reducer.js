import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

const reportReducer = (state = [], action) => {
   switch (action.type) {
      case "POST_REPORT":
         console.log('POST_REPORT has:', action.payload);
         return action.payload;
      default:
         return state;
   };
};

export default reportReducer;