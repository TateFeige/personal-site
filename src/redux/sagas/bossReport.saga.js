import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* report(reportItem) {
   const removeTilde = (url) => {return url.split('~').pop()};
   let reportToSend = [];
   const boss = reportItem.payload;
   //console.log(`report saga has:`, boss); // test function
   try {
      //console.log('bossResponse is:', boss); // test function
      const WCLResponse = yield axios.get(`/api/search/search/${boss.url}`);
      //console.log("POST_BOSS_FIGHT:", WCLResponse.data.data.reportData.report);
      for (let x = 0; x < WCLResponse.data.data.reportData.report.rankings.data.length; x++) {
         //console.log("Looking for:", boss);
         //console.log (WCLResponse.data.data.reportData.report.rankings.data[x]);
         if (boss.id == WCLResponse.data.data.reportData.report.rankings.data[x].fightID) {
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.tanks.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.healers.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.dps.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, DPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
         }
      };
      //console.log(reportToSend);
      yield put({type: "POST_BOSS_FIGHT", payload: reportToSend});
   }
   catch(error) {
      console.log('Error in bossResponse:', error); // catches any errors and logs them
   };
};

function* healingReport(reportItem) {
   const removeTilde = (url) => {return url.split('~').pop()};
   let reportToSend = [];
   const boss = reportItem.payload;
   //console.log(`healing report saga has:`, boss); // test function
   try {
      //console.log('bossResponse is:', boss); // test function
      const WCLResponse = yield axios.get(`/api/search/healing/${boss.url}`);
      //console.log("POST_HEALING:", WCLResponse.data.data);
      for (let x = 0; x < WCLResponse.data.data.reportData.report.rankings.data.length; x++) {
         //console.log("Looking for:", boss);
         //console.log (WCLResponse.data.data.reportData.report.rankings.data[x]);
         if (boss.id == WCLResponse.data.data.reportData.report.rankings.data[x].fightID) {
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.tanks.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.healers.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.dps.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, img: player.spec + " " + player.class, id: player.name, HPS: player.amount.toFixed(2), ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
         };
      };
      //console.log("healing send back is:", reportToSend);
      yield put({type: "POST_HEALING", payload: reportToSend});
   }
   catch (error) {
      console.log("Error in healingReport:", error);
   };
};

function* bossReportSaga() { // listens for calls and runs a given function when one is heard
    yield takeLatest('BOSS_REPORT', report);
    yield takeLatest('HEALING_REPORT', healingReport);
};
  
export default bossReportSaga;