import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* report(reportItem) {
   const removeTilde = (amount) => {
      if (amount[0] == "~") {
         return amount.split('~').pop();
      }
      else return amount;
   };
   let reportToSend = [];
   const boss = reportItem.payload;
   try {
      const WCLResponse = yield axios.get(`/api/search/search/${boss.url}`);
      for (let x = 0; x < WCLResponse.data.data.reportData.report.rankings.data.length; x++) {
         if (boss.id == WCLResponse.data.data.reportData.report.rankings.data[x].fightID) {
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.tanks.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, DPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.healers.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, DPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.dps.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, DPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
         };
      };
      yield put({type: "POST_BOSS_FIGHT", payload: reportToSend});
   }
   catch(error) {
      console.log('Error in bossResponse:', error); // catches any errors and logs them
   };
};


function* healingReport(reportItem) {
   const removeTilde = (amount) => {
      if (amount[0] == "~") {
         return amount.split('~').pop();
      }
      else return amount;
   };
   let reportToSend = [];
   const boss = reportItem.payload;
   try {
      const WCLResponse = yield axios.get(`/api/search/healing/${boss.url}`);
      for (let x = 0; x < WCLResponse.data.data.reportData.report.rankings.data.length; x++) {
         if (boss.id == WCLResponse.data.data.reportData.report.rankings.data[x].fightID) {
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.tanks.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, HPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.healers.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, HPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
            WCLResponse.data.data.reportData.report.rankings.data[x].roles.dps.characters.map((player) => {
               ( // pushes DPS players to damage array
                  reportToSend.push({RankPercent: player.rankPercent, Rank: removeTilde(player.rank), RankTotal: player.totalParses, id: player.name + " " + player.spec + " " + player.class, HPS: player.amount, ilvl: player.bracketData, bracketPercent: player.bracketPercent})
               )});
         };
      };
      yield put({type: "POST_HEALING", payload: reportToSend});
   }
   catch (error) { // catches any errors and logs them
      console.log("Error in healingReport:", error); 
   };
};


function* bossReportSaga() { // listens for calls and runs a given function when one is heard
    yield takeLatest('BOSS_REPORT', report);
    yield takeLatest('HEALING_REPORT', healingReport);
};

  
export default bossReportSaga;