import React, {Component} from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl} from '../../form/formFramework'
import {connect} from 'react-redux'
import {createQuizQuestion , finishCreateQuiz} from '../../store/actions/create'

function createOptionControl(number) {
  return createControl ({

    label : `Answer ${number}`,
    errorMessage : 'Answer field can`t be empty',
    id : number,
    }, {required : true})
}

function createFormControl() {
  return {
    isFormValid: false,
    rightAnswerId : 1,
    formControls: {
      question : createControl ({
        label : 'Enter your question',
        errorMessage : 'Question field can`t be empty'
        }, {required : true}),
      option1 : createOptionControl(1),
      option2 : createOptionControl(2),
      option3 : createOptionControl(3),
      option4 : createOptionControl(4)
    }
  }
}
 class QuizCreator extends Component{

  state = createFormControl()

  submitHandler = (event) =>{
    event.preventDefault()
  }


  addQuestionHandler = () =>{

    const formControls = this.state.formControls
    const questionItem = {
      question : formControls.question.value,
      id : this.props.quiz.length + 1,
      rightAnswerId : this.state.rightAnswerId,
      answers : [
        {text : formControls.option1.value , id : formControls.option1.id},
        {text : formControls.option2.value , id : formControls.option2.id},
        {text : formControls.option3.value , id : formControls.option3.id},
        {text : formControls.option4.value , id : formControls.option4.id}
      ]
    }
    this.props.createQuizQuestion(questionItem)
    this.setState(
      createFormControl(),

    )
    
  }



  createQuizHandler =  () =>{
      this.setState(
        createFormControl()
      )
      console.log(this.props)
    this.props.finishCreateQuiz()
  }


  renderInputs =  () => {

    return (
      Object.keys(this.state.formControls).map( (controlName , index) => {

        const control = this.state.formControls[controlName]

        return (
          <React.Fragment key = {index + controlName}>
            <Input
              key = {index}
              label = {control.label}
              value = {control.value}
              valid = {control.valid}
              shouldValidate = {!!control.validation}
              touched = {control.touched}
              errorMessage = {control.errorMessage}
              onChange = {event => this.changeHandler(event.target.value, controlName)}
            />
            {index === 0? <hr /> : null}
          </React.Fragment>
        )
      })
    )
  }

  validateControl(value , validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    return isValid;
  }

  changeHandler = (value , controlName) =>{

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value , control.validation);


    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(this.state.formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({formControls , isFormValid})


  }

  handlerSelectChange = (event) => {

    this.setState({
      rightAnswerId : event.target.value
    })

  }

  render() {
    const select = <Select
                      label = 'Choose correct answer'
                      value = {this.state.rightAnswerId}
                      onChange = {this.handlerSelectChange}
                      options = {[
                                  {text: 'Answer1' , value : 1},
                                  {text: 'Answer2' , value : 2},
                                  {text: 'Answer3' , value : 3},
                                  {text: 'Answer4' , value : 4}
                                ]}
                    />
    return(
      <div className = {classes.wrapper}>
      <div className = {classes.QuizCreator}>
        <div>
          <h1>Make your quiz</h1>
          <form onSubmit = {this.submitHandler} className = {classes.QuizCreatorForm}>

            {this.renderInputs()}
            {select}
            <Button
              type = 'primary'
              onClick = {this.addQuestionHandler}
              disabled = {!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type = 'success'
              onClick = {this.createQuizHandler}
              disabled = {this.props.quiz.length < 1}
            >
              Create quiz
            </Button>


          </form>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz : state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {

  return {
    createQuizQuestion : (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz : () => dispatch(finishCreateQuiz())
  }

}

export default connect(mapStateToProps , mapDispatchToProps )(QuizCreator)
