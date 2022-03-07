import React, { useState, useEffect } from 'react';
import './style.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const checkIsHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const checkSameValue = dice.every(die => die.value === firstValue)
    if (checkIsHeld && checkSameValue) {
      setTenzies(true);
      console.log('you won!')
    }
  }, [dice])

  function generateRandomDie() {
    let randomNum = Math.ceil(Math.random() * 6)
    return {
      value: randomNum,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let newDice = [];
    let counter = 0;
    while (counter < 10) {
      newDice.push(generateRandomDie())
      counter += 1;
    }
    return newDice
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return !die.isHeld ? generateRandomDie() : die
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-btn' onClick={rollDice}>{tenzies ? 'New Game' : 'ROLL'}</button>
    </main>
  );
}

export default App;
