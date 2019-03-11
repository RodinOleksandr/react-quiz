import React from 'react';
import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
  let counter = 0;
  let checkIcon = null;

  return (
    <div className = {classes.FinishedQuiz}>
    <h1>Result</h1>
    <ul>
      {props.quiz.map((quizItem, index) =>{
        if ((props.results[index] === 'error')) {
          checkIcon = <i className = {'fa fa-times ' + classes.error} />
        } else {
          checkIcon  = <i className = {'fa fa-check ' + classes.success}  />
          counter++
        }
        return(
          <li key = {index}>
            <strong>{index + 1}. </strong>
            <span>
            {quizItem.question}
            {checkIcon}
            </span>
          </li>
        )
      })}

      </ul>

      <p> {counter} questions  of {props.quiz.length} are correct</p>
      <div>
        <Button onClick = {props.newGame} type = 'primary'>
          <span>Try again</span>
        </Button>
        <Link to = '/'>
          <Button type = 'success' onClick = {props.newGame} >
            <span>Show quiz list</span>
          </Button>
        </Link>

      </div>
    </div>
  )
}

export default FinishedQuiz
