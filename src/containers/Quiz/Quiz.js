import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById , quizAnswerClick , tryAgain} from '../../store/actions/quiz'

class Quiz extends Component {


  componentDidMount (){

    this.props.fetchQuizById(this.props.match.params.id)
  }

  render(){

    const i = this.props.activeQuestion
    return(

      <div className = {classes.Quiz}>
        <div className = {classes.QuizWrapper}>
          <h1>Quiz</h1>
          {
            this.props.loading || !this.props.quiz
            ?<Loader />
            : this.props.isFinished
              ?<FinishedQuiz
                  quiz = {this.props.quiz}
                  results = {this.props.results}
                  newGame = {this.props.tryAgain}
                />
              :<ActiveQuiz answers = {this.props.quiz[i].answers}
              question = {this.props.quiz[i].question}
              checkAnswer = {this.props.quizAnswerClick}
              quizLength = {this.props.quiz.length}
              currentQuestion = {this.props.activeQuestion}
              state = {this.props.answerState}
              />
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    results : state.quiz.results,
    isFinished: state.quiz.isFinished,
    answerState : state.quiz.answerState,
    activeQuestion : state.quiz.activeQuestion,
    quiz : state.quiz.quiz,
    loading : state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return{

    fetchQuizById : id => dispatch(fetchQuizById(id)),
    quizAnswerClick : answerId => dispatch(quizAnswerClick(answerId)),
    tryAgain : () => dispatch (tryAgain())
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Quiz);
