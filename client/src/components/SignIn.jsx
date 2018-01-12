import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: false,
    }
  }

  onOpenModal() {
    this.setState({ open: true });
  };
 
  onCloseModal() {
    this.setState({ open: false });
    
  };

  onClickSignIn() {
  	var emailAddress = document.getElementById('emailInputField').value;
    var enteredPassword = document.getElementById('passwordInputField').value;
    this.onSignIn(emailAddress, enteredPassword);
  }

  onSignIn(emailAddress, enteredPassword) {
  	axios.post('/sign/in', {
  		email: emailAddress,
  		password: enteredPassword
  	})
  }

  render() {
  	const { open } = this.state;
  	return (
  		<div>
        <button onClick={this.onOpenModal.bind(this)}>Sign In!</button>
        <Modal open={open} onClose={this.onCloseModal.bind(this)} little>
          <h2>Check Your Altcoin Losses!</h2>
          <input id="emailInputField" type="text" defaultValue="Email Address"></input>
          <input id="passwordInputField" type="text" defaultValue="Please Put Your Password Here"></input>
          <button onClick={this.onClickSignIn.bind(this)}>Sign In!</button>
        </Modal>
      </div>
  	)
  }
}

export default SignIn;