import React from 'react'
import PropTypes from 'prop-types'

export default function Questions(props) {
  const styles = {
    backgroundColor: '#94D7A2',
    border: 'none',
  };

  const answerOptions = props.answer.map((answer, index) => {
    const isCorrect = props.correctAnswer.includes(answer)
    const isSelected = props.selectedAnswers.includes(answer)

    return (
      <div key={index} className="container--answer">
        <input
          value={answer}
          onChange={(event) => props.handleChange(event)}
          checked={isSelected}
          disabled={props.showScore}
          type="radio"
          name="answer"
          id={answer}
          className={!isCorrect && props.showScore ? 'incorrect-answer' : ''}
        />
        <label style={isCorrect && props.showScore ? styles : {} } htmlFor={answer}>
          {answer}
        </label>
      </div>
    )
  })

  return (
    <>
      <div className="container">
        <h2>{props.question}</h2>
        <form className="container--answers">{answerOptions}</form>
      </div>
    </>
  )
}

Questions.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  showScore: PropTypes.bool.isRequired,
}

// When check answer button is clicked, the correct answers are shown in green and the incorrect answers are switched to red  with nonclickable status .

// for the incorerect answer to be red, we need to add a style to the label element.
// for the incorrect answer to be in nonclickable status, we need to add a disabled attribute to the input element. 
//=>> Accomplished the conditional rendering of : 
// 1.The checkAnser button is clicked => the correct answers are shown in green and the SELECTED incorrect answers are shown in red and disabled
// 2. The checkAnswer button is clicked => the correct answers are shown in green and the UNSELECTED incorrect answers are greyed out and disabled
