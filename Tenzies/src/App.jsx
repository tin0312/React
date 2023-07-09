import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  //set time State to track the time played
  const [time, setTime] = React.useState("");
  const [record, setRecord] = React.useState([]);
  const [bestTime, setBestTime] = React.useState("");

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
    //This is to test the ability to show user the best time in the record
    // localStorage.clear()
  }, [dice]);

  //Set a timer to track the time played until user wins and form it in mm/ss  and clear the timer when the user wins
  //when tenzie => push time to record array => store that array in localStorage
  React.useEffect(() => {
    if (!tenzies) {
      const startTime = new Date().getTime();

      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - startTime;
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        setTime(`${minutes}m : ${seconds}s`);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setRecord((prevRecord) => {
        const newRecord = [...prevRecord, time];
        localStorage.setItem("record", JSON.stringify(newRecord));
        return newRecord;
      });
    }
  }, [tenzies]);



  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(0);
    }
  }

  // Dependency Array is record so that even user refreeches the page, the best time will be displayed
  React.useEffect(() => {
    let timeRecord = JSON.parse(localStorage.getItem("record"));
    if (timeRecord && timeRecord.length > 0) {
      setBestTime(
        timeRecord.reduce((min, time) => {
          const [minMins, minSecs] = min.split("m : ");
          const [timeMins, timeSecs] = time.split("m : ");

          const minTotal = parseInt(minMins) * 60 + parseInt(minSecs);
          const timeTotal = parseInt(timeMins) * 60 + parseInt(timeSecs);

          return minTotal < timeTotal ? min : time;
        })
      );
    } else {
      setBestTime("Your record goes	here!");
    }
  }, [record]);

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <h3>Playing: {time}</h3>
      {/*Only display the best time when user wins*/}
      {tenzies && <h4>Your best record: {bestTime}</h4>}
      <h2>Rolls: {count}</h2>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
