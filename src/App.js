import React, { useState } from 'react';
import './style.css';
import Die from './Die';
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    let newDice = [];
    let counter = 0;
    while (counter < 10) {
      let randomNum = Math.ceil(Math.random() * 6)
      newDice.push({
        value: randomNum,
        isHeld: false,
        id: nanoid()
      })
      counter += 1;
    }
    return newDice
  }

  function handleClick() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    return console.log(id)
  }

  const diceElements = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />)

  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-btn' onClick={handleClick}>ROLL</button>
    </main>
  );
}

export default App;
