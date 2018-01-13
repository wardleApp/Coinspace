import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };
    const addMessage = (data) => {
      this.setState({messages: [...this.state.messages, data]});
    };
    this.socket = io('https://coinspace.herokuapp.com');
    this.socket.on('new message', function(data) {
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
      this.socket.emit('message', {
        username: this.state.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }

  render(){
      return (
          <div>
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
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.usernameOnChange.bind(this)}/>
                <br/>
                <input type="text" placeholder="Message" value={this.state.message} onChange={this.messageOnChange.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                <br/>
                <button onClick={this.sendMessage.bind(this)}>Send</button>
            </div>
          </div>
      );
  }
}

export default Chat;
