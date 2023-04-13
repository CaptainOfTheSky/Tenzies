import Die from './Die';
import React, { useEffect } from "react";

function App() {
  const [dice, setDice] = React.useState(generate());
  const [win, setWin] = React.useState(false);

  useEffect(() => {
    let count = 0;
    let winNum = 7;

    for(let i=0; i<10; i++) {
      if(dice[i].frozen) {
        if(winNum === 7) { 
          winNum = dice[i].value 
          count++;
        }
        else if(winNum == dice[i].value) count++; 
      }
    }
    if(count==10) setWin(true);
  }, dice)

  function setFrozen (e, id) {
    setDice(dice.map((die)=> {
      if(die.id == id) {
        return {...die,  
          frozen: !die.frozen
        };
      }
      else return die;
    }))
  }

  function generate () {
    let tempArray = [];
    for(let i=0; i<10; i++){
      let die = {
        id: i,
        frozen: false,
        value: Math.floor(Math.random() * 6)
      }
      tempArray.push(die);
    }
    return tempArray;
  }

  function reroll () {
    if(win) {
      setWin(false);
      setDice(generate())
    }
    else {
      setDice(dice.map((die)=> {
        if(!die.frozen) {
          return {...die,  
            value: Math.floor(Math.random() * 6)
          };
        }
        else return die;
      }))
    }
  }
  
  const diceElements = dice.map(die => <Die id={die.id} value={die.value} frozen={die.frozen} handleClick={setFrozen}/>)

  return (
    <div className="body">
      <div className="container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
            {diceElements}
        </div>
        <button onClick={reroll}>{win ? "Play again" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
