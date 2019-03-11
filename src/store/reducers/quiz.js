import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS , FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS , SET_ANSWER_STATE , FINISH_QUIZ , CONTINUE_QUIZ , NEW_TRY} from '../actions/actionTypes'

const initialState = {
  quizes : [],
  loading : false,
  error : null,
  results : {},
  isFinished: false,
  answerState : null,
  activeQuestion : 0,
  quiz : null
}

export default function quizReduce(state = initialState , action) {

  switch (action.type) {
    case FETCH_QUIZES_START :
      return {
        ...state , loading : true
      }
    case FETCH_QUIZES_SUCCESS :
      return {
        ...state , loading : false , quizes : action.quizes
      }
    case FETCH_QUIZES_ERROR :
      return {
        ...state , loading : false , error : action.error
      }
    case FETCH_QUIZ_SUCCESS :
      return {
        ...state , loading : false , quiz : action.quiz
      }
    case SET_ANSWER_STATE :
      return {
        ...state , answerState : action.answerState , results : action.results
      }
    case  FINISH_QUIZ:
      return {
        ...state , isFinished : action.isFinished
      }
    case  CONTINUE_QUIZ:
      return {
        ...state , activeQuestion : action.activeQuestion , answerState : action.answerState
      }
    case  NEW_TRY:
      return {
        ...state , isFinished : false, results : {}, answerState : null, activeQuestion : 0
      }
    default:
      return state

  }

}
