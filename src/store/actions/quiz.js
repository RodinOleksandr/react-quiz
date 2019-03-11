import axios from 'axios'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS , FETCH_QUIZES_ERROR , FETCH_QUIZ_SUCCESS, SET_ANSWER_STATE , FINISH_QUIZ , CONTINUE_QUIZ , NEW_TRY} from './actionTypes'

export  function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {

      const response = await axios.get('https://it-quiz-35066.firebaseio.com/quizes.json')
      const quizes = []

      Object.keys(response.data).forEach((key , index) =>{
        quizes.push({
          id : key,
          name: `Quiz №${index + 1}`
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {

  return async dispatch =>{
    dispatch(fetchQuizesStart())
    try {

      const response = await axios.get(`https://it-quiz-35066.firebaseio.com/quizes/${quizId}.json`)
      const quiz = response.data
      console.log('quiz' , quiz)
      dispatch(fetchQuizSuccess(quiz))

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  };
}

export  function fetchQuizSuccess(quiz) {
  return{
    type :  FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export  function fetchQuizesStart() {
  return{
    type :  FETCH_QUIZES_START
  }
}

export  function fetchQuizesSuccess(quizes) {
  return{
    type :  FETCH_QUIZES_SUCCESS,
    quizes : quizes
  }
}

export  function fetchQuizesError(e) {
  return{
    type :  FETCH_QUIZES_ERROR,
    error : e
  }
}

export function setAnswerState(answerState , results) {
  return {
    type : SET_ANSWER_STATE,
    answerState , results
  }
}

export function finishQuiz() {
  return {
    type : FINISH_QUIZ,
    isFinished : true
  }
}

export function continueQuiz(activeQuestion) {
  return {
    type : CONTINUE_QUIZ,
    activeQuestion,
    answerState : null

  }
}

export function quizAnswerClick(answerId) {

  return  (dispatch , getState) => {

    const state = getState().quiz
    if (state.answerState){

      if (state.answerState[answerId] === 'success') return
    }
    const results = state.results

    if (+state.quiz[state.activeQuestion].rightAnswerId === +answerId){

      if (!results[state.activeQuestion]){
        results[state.activeQuestion] = 'success';
      }

      dispatch(setAnswerState({[answerId] : 'success'} , results))

      const timeout = window.setTimeout(()=>{
        if(isFinished(state)){
          dispatch(finishQuiz())

        } else {
          dispatch(continueQuiz(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout);
      },500);

    } else {
      results[state.activeQuestion] = 'error';

      dispatch(setAnswerState({[answerId] : 'error'} , results))
  }
  }
}

export function newTry() {
  return {
    type : NEW_TRY
  }
}

export function tryAgain() {

  return (dispatch) => {
    dispatch(newTry())
  }
}

const isFinished = (state) => {
  return  (state.quiz.length === state.activeQuestion +1 )? true : false;
}
