import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createChat } from '../controller/chatroom';

const Cookies = require('js-cookie');

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [ username, setUsername ] = React.useState('');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleInput(e){
    setUsername(e.target.value);
  }

  function createRoom(){
    createChat({user_id: Cookies.get('user_id'), username, currentUser: props.currentUser, current_id: props.current_id})
        .then(res => res.json())
        .then(data => {
            if(typeof(data) == 'string'){
                alert(data);
            }
            props.selectedReducer(data);
            props.addNewRoom(data);
            props.newRoomHandler(data._id);
            //how can i load room from here??
            handleClose();
        })
        .catch(err => console.log(err));
  }

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        New Chat
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            fullWidth
            onChange={(e) => handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={()=> createRoom()} color="inherit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;