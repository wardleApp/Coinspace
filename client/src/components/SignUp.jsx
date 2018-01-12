import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';

class SignUp extends React.Component {
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

  onClickSignUp() {
  	var newEmailAddress = document.getElementById('emailInputField').value;
    var newEnteredPassword = document.getElementById('passwordInputField').value;
    this.onSignUp(newEmailAddress, newEnteredPassword);
  }

  onSignUp(newEmail, newPassword) {
  	axios.post('/sign/up', {
  		email: newEmail,
  		password: newPassword
  	})
  }

  render() {
  	const { open } = this.state;
  	return (
  		<div>
        <button onClick={this.onOpenModal.bind(this)}>Become a CryptoMillionaire!</button>
        <Modal open={open} onClose={this.onCloseModal.bind(this)} little>
          <h2>Simple centered modal</h2>
          <input id="emailInputField" type="text" defaultValue="Email Address"></input>
          <input id="passwordInputField" type="text" defaultValue="Please Put Your Password Here"></input>
          <button onClick={this.onClickSignUp.bind(this)}>Sign Up!</button>
        </Modal>
      </div>
  	)
  }
}

export default SignUp;