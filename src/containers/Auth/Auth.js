import React, {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button.js'
import Input from '../../components/UI/Input/Input.js'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

 class Auth extends Component{

  state = {
    isFormValid : false,
    formControls : {
      email : {
        value : '',
        type : '',
        label : 'Email',
        errorMessage : 'Enter correct email',
        valid : false,
        touched : false,
        validation : {
          required : true,
          email : true
        }
      },
      password : {
        value : '',
        type : 'password',
        label : 'Password',
        errorMessage : 'Enter correct password',
        valid : false,
        touched : false,
        validation : {
          required : true,
          minLength : 6
        }
      }
    }
  }
  validateControl(value , validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        isValid = is.email(value);
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength

    }

    return isValid;
  }

  onChangeHandler = (event , controlName) =>{

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value , control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(this.state.formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({formControls , isFormValid})
  }

  renderInputs() {

    return Object.keys(this.state.formControls).map((controlName , index)=>{
      const control = this.state.formControls[controlName];
      return <Input
              label = {control.label}
              key = {controlName + index}
              type = {control.type}
              value = {control.value}
              touched = {control.touched}
              shouldValidate = {!!control.validation}
              errorMessage = {control.errorMessage}
              onChange = {event => this.onChangeHandler(event, controlName)}
              valid = {control.valid}
            />

    })
  }

  signInHandler = () =>{
    this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
  }

  signUpHandler = () => {
      this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
  }

  submitHandler = event => {
    event.preventDefault()
  }

  render() {
    return(
      <div className = {classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit = {this.submitHandler} className = {classes.AuthForm}>
            {this.renderInputs()}
            <Button type = 'success' onClick = {this.signInHandler} disabled = {!this.state.isFormValid}>Sign in</Button>
            <Button type = 'primary' onClick = {this.signUpHandler} disabled = {!this.state.isFormValid}>Sign up</Button>
          </form>
        </div>
      </div>
    )
  }
}



function mapDispatchToProps(dispatch){
  return {
    auth : (email , password , isLogin) => dispatch( auth(email , password , isLogin))
  }
}

export default connect( null , mapDispatchToProps)(Auth)
