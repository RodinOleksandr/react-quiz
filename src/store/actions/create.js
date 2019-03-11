import {CREATE_QUIZ_QUESTION , RESET_QUIZ} from './actionTypes'
import axios from 'axios'

export function createQuizQuestion(item) {
  return {
    type : CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuiz() {
  return {
      type : RESET_QUIZ
  }

}

export function finishCreateQuiz() {
  return async (dispatch , getState) => {
    const quiz = getState().create.quiz
    await axios.post('https://it-quiz-35066.firebaseio.com/quizes.json', quiz)
    dispatch(resetQuiz())
  }

}
