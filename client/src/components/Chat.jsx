import React from "react";
import io from "socket.io-client";
import Modal from 'react-responsive-modal';
import { Button, Dimmer, Loader, Image, Segment, Transition, Form, Message } from 'semantic-ui-react';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: [],
      openChat: this.props.chatOpen
    };
    const addMessage = (data) => {
      this.setState({messages: [...this.state.messages, data]});
    };
    this.props.socket.on('new message', function(data) {
      addMessage(data);
    });
  }

  usernameOnChange(event) {
    this.setState({username: event.target.value});
  }

  messageOnChange(event) {
    this.setState({message: event.target.value});
  }

  handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.state.message) {
      this.props.socket.emit('message', {
        username: this.state.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }
 
  onCloseChat() {
    this.setState({ openChat: false });
    this.props.onChatClose();
  };

  render(){
      return (
          <div>
           <Modal open={this.state.openChat} onClose={this.onCloseChat.bind(this)} id="loginModal">
            <div className="title">Chat</div>
            <hr/>
              <div className="messages">
                  {this.state.messages.map((message, index) =>
                    message instanceof Object ? (
                      <div key={index}>{message.username || 'Anonymous'}: {message.message}</div>
                    ) : (
                      <div key={index}>{message}</div>
                    )
                  )}
              </div>
            <div>    
                <Form><Form.Field> <label>Username</label>  
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.usernameOnChange.bind(this)}/>
                </Form.Field></Form>
                <br/>
                <Form><Form.Field> <label>Message</label> 
                <input type="text" placeholder="Message" value={this.state.message} onChange={this.messageOnChange.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                </Form.Field></Form>
                <br/>
                <Button onClick={this.sendMessage.bind(this)} basic color='green'>Send</Button>
            </div>
            </Modal>
          </div>
      );
  }
}

export default Chat;
