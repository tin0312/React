import React from 'react'
import './App.css'
import Questions from './Questions'
import { nanoid } from 'nanoid'
import { decode } from "html-entities"



export default function App() {

  const [selectedAnswers , setSelectedAnswers] = React.useState([""])
  const [correctAnswer, setCorrectAnswer] = React.useState([""])
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [result, setResult] = React.useState([{}]);
  const [score, setScore] = React.useState([""])
  const [showScore, setShowScore] = React.useState(false)
  const [refetch, setRefetch] = React.useState(false)
 
  


  

  const apiUrl = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple" 
  //fetching data from the api and saving it in the result state
  React.useEffect(() => {
    async function getData(){
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // shuffles all the answer options once fetched from the api
        const shuffledResults = data.results.map((question) => {
          const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
          const decodedQuestion = decode(question.question)
          const decodedAnswers = allAnswers.map((answer) => decode(answer))
          const correctAnswer = decode(question.correct_answer)

          
          return { ...question, question: decodedQuestion, allAnswers: decodedAnswers, correctAnswer: correctAnswer }
          
        })
        setResult(shuffledResults)
        setCorrectAnswer(shuffledResults.map((question) => question.correctAnswer))
        
        
       
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [refetch])
// Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }
// Start the quiz
  function handleStartQuiz(){
    setStartQuiz(preState => !preState)
  }
  // save all correct answers in an array and show the core as well as the color of the correct answer

  function handleCheckAnswer(){  
    setShowScore(true)
  }
  //listen for user selection and save all selected answers in an array
  function handleChange(event) {
    const { checked, value } = event.target
    setSelectedAnswers(prevState => {
        return checked ? [...prevState, value] : prevState.filter((answer) => answer !== value)
    })
    
  }
  // filter only the matching values of selected answers and correct answers and save them in an array
  React.useEffect(() => {
    function showResult(){
      const userResult = selectedAnswers.filter((answer) => correctAnswer.includes(answer))
      setScore(userResult)
    
    }
    showResult()
  }, [correctAnswer, selectedAnswers])


  //handleCheckAnswer() is executed, the check answer is changed to play again and print  `You got ${correctAnswer.length}  correct` 
  function handlePlayAgain(){
    setRefetch(prevState => !prevState)
    setShowScore(false)
    setSelectedAnswers([])
    setCorrectAnswer([])
    setScore([])
  }
  //map through the result state and render the Questions component
  const quizElements = result.map((question) => {
    const id = nanoid()
    return (

        <Questions
          key={id}
          question={question.question}
          answer={question.allAnswers}
          selectedAnswers={selectedAnswers}
          handleChange={handleChange}
          correctAnswer={correctAnswer}
          showScore={showScore}
          
        
        />
    
        
      
      
    )
  })


  return (
    <div className="main-container">
      {startQuiz ? (
        <>
          {quizElements}
          
          {showScore ? (
            <div className="show-score">
              <h3 className="user-score">You scored {score.length}/5 correct answer</h3>
              <button id="play-again-btn" onClick={handlePlayAgain}>Play Again</button>
              
            </div>
          ) : (
            <button id="check-btn" onClick={handleCheckAnswer}>Check Answer</button>
          )}
        </>
      ) : (
        <>
          <div className="start-container">
            <h1 className="start-container--name">Quizzical</h1>
            <p className="start-container--info">Some description if needed</p>
            <button id="start-button" onClick={handleStartQuiz}>Start Quiz</button>
          </div>
          <h2 className="developer">Developed by Hoang Nhat Truong</h2>
        </>
        

      )}
    </div>
  )
  
}
//-Encountered behaviours of the app
// 1.Refreshing the page makes the whole page go blank
// 2. Hitting start quiz button makes the whole page go blank
// 3.Hitting play again button make the whole page go blanl
//=>> Behaviours DEBUGGED by decode the question and answers right after the fetch
//--Current behaviours of the app after the first debug
// 1.Correct answers are shown in green (2) options per question after the check answer button 
// 2.Only one correct answer option is shown for only one question after the check answer button
// 3. Two correct answers are shown in green for only one question after the check answer button 
// 4. One of the answer would not show the correct answer after the check answer button
//Behaviours DEBBUGED by adding the correctAnswer state to the Questions component, the main
//fix is to save the data fecthed from the api in the correctAnswer state and pass it down to the Question component for accurate comparison 

