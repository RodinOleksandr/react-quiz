import quizReduce from './quiz'
import createReduce from './create'
import authReduce from './auth'
import {combineReducers} from 'redux'

export default combineReducers({
  quiz : quizReduce,
  create : createReduce,
  auth : authReduce
})
