import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { getMessages } from '../controller/chatroom';
import * as actions from '../redux/actions';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';


class Chatroom extends Component {
  constructor(props){
    super(props);

    this.state ={
      message: '',
      receivedMsg: ['test'],
      room: '',
      oldRoom: '',
    }

    //fix redux issue laterr


    //bind
    this._sendText = this._sendText.bind(this);
    this.handleText = this.handleText.bind(this);
    this.onMsgReceived = this.onMsgReceived.bind(this);
    this.checkIfRoomUpdated = this.checkIfRoomUpdated.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    //socket
    this.socket = socketIO(`https://chatweb-chatweb.7e14.starter-us-west-2.openshiftapps.com`);
    // this.socket=socketIO('http://localhost:8080')
    this.socket.on('message', this.onMsgReceived);
  }
  
  componentDidMount(){
    // console.log(this.props);
    this.scrollToBottom();
    this.loadMessages();    
  }
  
  componentDidUpdate(){
    this.scrollToBottom(); 
    this.checkIfRoomUpdated();
  }

  async checkIfRoomUpdated(){
    if(this.state.room !== this.props.selectedRoom.selected._id){
      // console.log('updating room info')
      this.loadMessages();
      let oldRoom = this.state.room;
      this.socket.emit('leaveRoom', oldRoom);
      await this.setState({room: this.props.selectedRoom.selected._id})
      this.socket.emit('joinRoom', this.state.room);
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleText(e){
    this.setState({
      message: e.target.value
    })
  }

  loadMessages(){
    getMessages(this.props.selectedRoom.selected._id)
      .then(res => res.json())
      .then(data => {
          this.props.loadMessages(data.messages)
      })
      .catch(err => console.log(err));
  }

  _sendText(message){
    this.socket.emit('message', {message: this.state.message, room_id: this.state.room, username: this.props.loginReducer.username});
    this.props.addMessage([{message: this.state.message, room_id: this.state.room, user: [this.props.loginReducer.username]}])
    this.setState({receivedMsg: this.state.receivedMsg.concat(this.state.message)})
    this.setState({message: ''})
  }

  onMsgReceived(message){
    // this.setState({receivedMsg: this.state.receivedMsg.concat(message[0])});
    this.props.addMessage(message);
  }

  renderMsg(){
    return(this.props.messages.map((msg, i) => {
      // console.log(msg);
      return (
        <ListItem>
          <h1>{msg.message}</h1>
          <p>{msg.user}</p>
        </ListItem>
      )
    }))
  } 

  render() {
    const { classes } = this.props;
    // console.log(classes);
    return (
      <div className='chat_container'>
        <Paper className={classes.chatPaper}>
          <List className={classes.messages}>
            <div>{this.renderMsg()}</div>
            <div ref={(el) => { this.messagesEnd = el; }}></div>
          </List>
        </Paper>
        <div className='textArea_container'>
          <TextField
            id="outlined-textarea"
            label="Message"
            placeholder="Message"
            className={classes.textField}
            value={this.state.message}
            variant="outlined"
            onChange={this.handleText}
            onKeyPress={e => e.key === 'Enter' ? this._sendText() : null}
            />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (payload) => dispatch(actions.loadMessages(payload)),
    addMessage: (payload) => dispatch(actions.addMessage(payload)),
})

const mapStateToProps = ((state, ownProps) => {
    return {
        selectedRoom: state.chatroomReducer,
        messages: state.messageReducer,
        loginReducer: state.loginReducer,
    }
})

const styles = theme => ({
  root: {
    display: 'flex',
  },
  chatPaper: {
    padding: 5,
    textAlign: 'right',
    height: 'fill',
  },
  button: {
    // margin: theme.spacing.unit,
    height: '100%'
  },
  textField: {
    // padding: 0,
    marginTop: 10,
    width: '100%',
  },
  messages: {
    maxHeight: '100%',
    overflow: 'auto',
    height: 400,
  }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Chatroom));
