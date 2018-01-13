import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';
import { Button } from 'semantic-ui-react';
import PasswordMask from 'react-password-mask';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: false,
      success: null,
    }
  }

  onOpenModal() {
    this.setState({ open: true });
  };
 
  onCloseModal() {
    this.setState({ open: false });
  };

  onClickSignUp() {
  	var newEmailAddress = document.getElementById('signUpEmail').value;
    var newEnteredPassword = document.getElementById('signUpPassword').value;
    this.onSignUp(newEmailAddress, newEnteredPassword);
  }

  onSignUp(newEmail, newPassword) {
    var that = this;
  	axios.post('/sign/up', {
  		email: newEmail,
  		password: newPassword
  	})
    .then(function(response) {
    	response.data === 'New Sign Up Successful' ? that.onSuccessfulSignUp() :
    	response.data === 'Username Already In Use!' ? that.onUnsuccessfulSignUp() : null
    })
    .catch(function(error) {
      console.log('this is the error on sign up', error);
    })
  }

  onSuccessfulSignUp() {
  	this.props.userLogin()
  }

  onUnsuccessfulSignUp() {
    this.setState({success: false})
  }

  onClickSignIn() {
  	var emailAddress = document.getElementById('signInEmail').value;
    var enteredPassword = document.getElementById('signInPassword').value;
    this.onSignIn(emailAddress, enteredPassword);
  }

  onSignIn(emailAddress, enteredPassword) {
    var that = this;
  	axios.post('/sign/in', {
  		email: emailAddress,
  		password: enteredPassword
  	})
  	.then(function(response) {
    	response.data ? that.onSuccessfulSignUp() : that.onUnsuccessfulSignUp()
    })
    .catch(function(error) {
      console.log('this is the error on sign in', error);
    })
  }

  render() {
  	const { open } = this.state;
  	return (
  		<div>
        <Button onClick={this.onOpenModal.bind(this)} color='green' fluid>Login</Button>
        <Modal open={open} onClose={this.onCloseModal.bind(this)} id="loginModal">
          <h2>Become a CryptoMillionaire!</h2>
          <input id="signUpEmail" type="text" placeholder="Email Address"></input>
          <PasswordMask id="signUpPassword" placeholder="Enter Password" useVendorStyles={false}/>
          <button onClick={this.onClickSignUp.bind(this)}>Sign Up!</button>
          <h2>Check Your Altcoin Losses!</h2>
          <input id="signInEmail" type="text" placeholder="Email Address"></input>
          <PasswordMask id="signInPassword" placeholder="Enter Password" useVendorStyles={false}/>
          <button onClick={this.onClickSignIn.bind(this)}>Sign In!</button>
        </Modal>
      </div>
  	)
  }
}

export default Login;