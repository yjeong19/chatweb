import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { getAllRooms, getMessages, createChat, getUserRooms } from '../controller/chatroom';
import mainListItems from '../components/dashItems';
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import Chatroom from '../components/chatroom';
import FormDialog from '../components/addUser';
import socketIO from 'socket.io-client';
import { Redirect } from 'react-router-dom';

const Cookies = require('js-cookie');


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    font: "'Heebo', sans-serif",
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  dashboardList: {
    maxHeight: '100%',
    overflow: 'auto',
    height: 600,
  },
  newChat: {
    color: 'white',
  }
});

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        rooms: [{username: 'testing'}],
        selected: '',
    };
    //bind 
    this.newRoomHandler = this.newRoomHandler.bind(this);
    this._sendNewRoom = this._sendNewRoom.bind(this);
    this._onNewChat = this._onNewChat.bind(this);

    // this.socket = socketIO(`http://localhost:8080/`);
    this.socket = socketIO('https://chatweb-chatweb.7e14.starter-us-west-2.openshiftapps.com/');
    // this.socket.on('message', this.onMsgReceived);
    this.socket.emit('chatList', this.props.loginReducer.username);
    this.socket.on('newChat', this._onNewChat)
}

  // need something to handle new room and send to server
  _sendNewRoom(room){
    this.socket.emit('newChat', (room));
    this.props.addNewRoom(room);
  }
  //need something to handle server sending new room info
  _onNewChat(room){
    this.props.addNewRoom(room);
  }

  componentDidMount(){
    this.getRooms();
  }

  componentDidUpdate(){
    // console.log(this.props);
    this.checkIfRoomUpdated();
  }

  newRoomHandler(room_id){
    this.setState({selected: room_id})
  }

  getRooms(){
    const user_id = Cookies.get('user_id');
    getUserRooms(user_id)
      .then(data => data.json())
      .then(data => {
        this.props.loadRooms(data.chats)
      })
      .catch(err => console.log(err));
  }

  async checkIfRoomUpdated(){
    if(this.state.selected !== this.props.selectedRoom.selected._id){
      await this.setState({selected: this.props.selectedRoom.selected._id})
    }
  }

  //this renders list of rooms on the left panel
  renderUserList(){
    return( 
      <div>{
        this.props.rooms.map((room,i) => {
          // console.log(room);
          return <span onClick={async ()=> {
            await this.props.addSelectedRoom(room);
          }}>{mainListItems(room, this.props.loginReducer.username)}</span>
        })
      }</div>
    )
  }

  logout(){
    Cookies.set('user_id', '');
    Cookies.set('token', '');
    Cookies.set('username', '');
    // this.props.addAuth(Cookies.get('isAuth'));
      // let path = `/`;
      // this.props.history.push(path);
    this.props.addLogin({
      payload: {
        id: '',
        username: '',
      },
      success: false,
      token: '',
    })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  displayChatUser(){
    if(this.props.selectedRoom.selected.owner && this.props.loginReducer.username !== ''){
      // this.props.loginReducer.username == this.props.selectedRoom.selected.owner.username ? this.props.selectedRoom.selected.users[1].username : this.props.selectedRoom.selected.users[0].username
      if(this.props.loginReducer.username === this.props.selectedRoom.selected.owner.username) {
        return this.props.selectedRoom.selected.users[1].username;
      }else {
        return this.props.selectedRoom.selected.users[0].username;
      }
    }else {
      return 'No User'
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {this.props.loginReducer.username}
            </Typography>
            <IconButton color="inherit">
              {/* this is to add create new chat */}
                <FormDialog
                className={classes.newChat} 
                selectedReducer={this.props.addSelectedRoom}
                addNewRoom={this._sendNewRoom}
                newRoomHandler={this.newRoomHandler}
                currentUser={this.props.loginReducer.username}
                current_id={this.props.loginReducer.id}
                />
            </IconButton>
            <IconButton onClick={() => this.logout()}>Logout</IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.dashboardList}>
            {this.renderUserList()}
          </List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
          {/* this displays user the chat is too */}
            To: {this.displayChatUser()}
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            {this.state.selected ? <Chatroom room={this.state.selected}/> : null}
          </Typography>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMessages: (payload) => dispatch(actions.loadMessages(payload)),
  loadRooms: (payload) => dispatch(actions.loadRooms(payload)),
  addSelectedRoom: (payload) => dispatch(actions.addSelectedRoom(payload)),
  addNewRoom: (payload) => dispatch(actions.addNewRoom(payload)),
  addLogin: (payload) => dispatch(actions.addLogin(payload)),
});

const mapStateToProps = ((state, ownProps) => {
  return {
    rooms: state.chatroomReducer.rooms,
    selectedRoom: state.chatroomReducer,
    messages: state.messageReducer,
    loginReducer: state.loginReducer,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Dashboard));