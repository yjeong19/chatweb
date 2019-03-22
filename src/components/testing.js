import React, { Component } from 'react';
import socketIO from 'socket.io-client';

class Testing extends Component {
  constructor(props){
    super(props);

    this.state ={
      message: '',
      receivedMsg: ['test'],
    }


    //bind
    this._sendText = this._sendText.bind(this);
    this.handleText = this.handleText.bind(this);
    this.onMsgReceived = this.onMsgReceived.bind(this);
    //socket
    this.socket = socketIO('http://localhost:8080/5c730eb64dc668897722b128');
    this.socket.on('message', this.onMsgReceived);
  }

  componentDidMount(){
    fetch('http://localhost/test', {
      headers: {
        method: 'GET',
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err));
  }

  handleText(e){
    this.setState({
      message: e.target.value
    })
  }

  _sendText(message){
    this.socket.emit('message', this.state.message);
    this.setState({receivedMsg: this.state.receivedMsg.concat(this.state.message)})
    this.setState({message: ''})
  }

  onMsgReceived(message){
    console.log(message);
    this.setState({receivedMsg: this.state.receivedMsg.concat(message[0].text)});
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  renderMsg(){

    return(this.state.receivedMsg.map((msg, i) => {
      return (<h1>{msg}</h1>)
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type='text' onChange={this.handleText}/>
          <button onClick={this._sendText}>text</button>
          <button>add</button>
        </header>
        <p>hi</p>
        <div>{this.renderMsg()}</div>
      </div>
    );
  }
}

export default Testing;
