import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function FightPage() {
   const fightInfo = useSelector((store) => store.fight);
   const test = () => {
      console.log(fightInfo);
   }

  return (
    <div className="container">
      <div>
        <p>This is the fight page</p>
        <button onClick={test}>test</button>
      </div>
    </div>
  );
}

export default FightPage;