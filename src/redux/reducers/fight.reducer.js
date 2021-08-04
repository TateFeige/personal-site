import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

const fightReducer = (state = [], action) => {
   switch (action.type) {
      case "POST_BOSS_FIGHT":
         //console.log('BOSS_FIGHT has:', action.payload); // test function
         return state = action.payload;
      default:
         return state;
   };
};

export default fightReducer;