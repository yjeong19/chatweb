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
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getAllRooms, getMessages, createChat, getUserRooms } from '../controller/chatroom';
import mainListItems from '../components/dashItems';
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import Chatroom from '../components/chatroom';
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
  }
});

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        rooms: [{username: 'testing'}],
        selected: '',
    };

    // this.socket = socketIO(`http://localhost:8080/`);
    // this.socket.on('message', this.onMsgReceived);
    // this.socket.emit('joinRoom', this.state.selected);
}

  componentDidMount(){
    this.getRooms();
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

  renderUserList(){
    return( 
    <div>{
      this.props.rooms.map((room,i) => {
        return <span onClick={async ()=> {
          console.log(room);
          await this.props.addSelectedRoom(room);
          this.setState({selected: room.room_id})
          this.loadMessages();
          // this.socket.emit('joinRoom', room._id);
        }}>{mainListItems(room)}</span>
      })
    }</div>
    )
  }

  // getRooms(){
  //   getAllRooms()
  //       .then(data => data.json())
  //       .then(data_json => {
  //           // this.setState({rooms: [...data_json]})
  //           this.props.loadRooms(data_json);
  //       })
  // }

  loadMessages(){
    console.log('line 163 selected room ',this.props.selectedRoom.selected)
    getMessages(this.props.selectedRoom.selected._id)
      .then(res => res.json())
      .then(data => {
          console.log('line 93 loading messages', data);
          this.props.loadMessages(data.messages)
      })
      .catch(err => console.log(err));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

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
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
              {/* this is to add create new chat */}
                <NotificationsIcon onClick={() => createChat({user_id: Cookies.get('user_id')})}/>
              </Badge>
            </IconButton>
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
            MAKE THIS THE PERSON THE CHAT IS TO
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
});

const mapStateToProps = ((state, ownProps) => {
  return {
    rooms: state.chatroomReducer.rooms,
    selectedRoom: state.chatroomReducer,
    messages: state.messageReducer,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Dashboard));