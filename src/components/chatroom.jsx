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
    this.test = this.test.bind(this);
    //socket
    this.socket = socketIO(`http://localhost:8080/`);
    this.socket.on('message', this.onMsgReceived);
  }
  test(msg){
    console.log(msg);
  }
  componentDidMount(){
    // this.loadMessages();
    // this.setState({room: this.props.selectedRoom.selected._id})
    this.scrollToBottom();
    console.log('when does this get called')
  }
  
  componentDidUpdate(){
    this.scrollToBottom(); 
    this.checkIfRoomUpdated();
  }

  async checkIfRoomUpdated(){
    if(this.state.room !== this.props.selectedRoom.selected._id){
      let oldRoom = this.state.room;
      // oldRoom !== null ? this.socket.emit('leaveRoom', oldRoom) : null;
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

  _sendText(message){
      //sending object of message:
      //send user id later
    this.socket.emit('message', {message: this.state.message, room_id: this.state.room, username: 'web'});
    this.props.addMessage([{message: this.state.message, room_id: this.state.room, username: 'web'}])
    this.setState({receivedMsg: this.state.receivedMsg.concat(this.state.message)})
    this.setState({message: ''})
  }

  onMsgReceived(message){
    // this.setState({receivedMsg: this.state.receivedMsg.concat(message[0])});
    console.log(message);
    this.props.addMessage(message);
  }

  renderMsg(){
    return(this.props.messages.map((msg, i) => {
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
            label="make this username???"
            placeholder="Message"
            className={classes.textField}
            value={this.state.message}
            variant="outlined"
            onChange={this.handleText}
            onKeyPress={e => e.key === 'Enter' ? this._sendText() : null}
            />
        </div>
        <button onClick={this.loadMessages}>add</button>
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
