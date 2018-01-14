import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';
import PasswordMask from 'react-password-mask';
import { Button, Dimmer, Loader, Image, Segment, Transition, Form, Message } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: false,
      success: '',
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
    	response.data === 'New Sign Up Successful' ? that.onSuccessfulSignUp() : that.onUnsuccessfulSignUp()
    })
    .catch(function(error) {
      console.log('this is the error on sign up', error);
    })
  }

  onSuccessfulSignUp() {
    this.setState({success: 'true'})
  	setTimeout(() => {this.props.userLogin()}, 5000);
  }

  onUnsuccessfulSignUp() {
    this.setState({success: 'false'})
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
    	response.data === 'Success!' ? that.onSuccessfulSignUp() : that.onUnsuccessfulSignUp()
    })
    .catch(function(error) {
      console.log('this is the error on sign in', error);
    })
  }

  onSuccessfulSignIn() {
    this.setState({success: 'true'})
    setTimeout(() => {this.props.userLogin()}, 5000);
  }

  onUnsuccessfulSignIn() {
    this.setState({success: 'false'})
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
          {this.state.success === 'true' ? (<Form success>
            <Message
              success
              header='Success!'
              content="You can now view your Portfolio!"
            />
          </Form>) : this.state.success === 'false' ? (<Form error>
            <Message
              error
              header='Unsuccessful'
              content='There was an issue with the sign in.'
            />
          </Form>) : null}
        </Modal>
      </div>
  	)
  }
}

export default Login;