import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';


const mainListItems = (rooms) => {
    return(
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText 
          // primary={rooms.owner.username ? rooms.owner.username : 'no username'}
          secondary={rooms._id}
           />
      </ListItem>
  )
}



  
export default mainListItems;