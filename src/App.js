import React, { useState, useEffect } from 'react';
import './style.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollsNumber, setRollsNumber] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const checkIsHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const checkSameValue = dice.every(die => die.value === firstValue)
    if (checkIsHeld && checkSameValue) {
      setTenzies(true);
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
    if (!tenzies) {
      setRollsNumber(prevRollsNumber => prevRollsNumber + 1)
      setDice(prevDice => prevDice.map(die => {
        return !die.isHeld ? generateRandomDie() : die
      }))
    } else {
      setDice(allNewDice())
      setTenzies(false)
      setTime(new Date())
      setRollsNumber(0)
    }
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
      {!tenzies ? <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> : <h4 className='win'>YOU WON WITH {rollsNumber} TRIES IN {Math.round(((new Date() - time) / 1000)*100)/100} SECONDS!</h4>}
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-btn' onClick={rollDice}>{tenzies ? 'New Game' : 'ROLL'}</button>
    </main>
  );
}

export default App;
