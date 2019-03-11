import React from 'react';
import classes from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList'
const ActiveQuiz = props => (
  <div className = {classes.ActiveQuiz}>
    <p className = {classes.Question}>
      <span>
      <strong> {props.currentQuestion + 1}. </strong>
      {props.question}
      </span>
      <small>{props.currentQuestion + 1}/{props.quizLength}</small>
    </p>
    <AnswersList answers = {props.answers}
                 checkAnswer = {props.checkAnswer}
                 state = {props.state}
                 />
  </div>
)

export default ActiveQuiz;
