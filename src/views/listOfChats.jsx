import React, { Component } from 'react';
import { getAllRooms } from '../controller/chatroom'
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class ListOfChats extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [{username: 'testing'}],
        };

        //bind
        // this.renderRoomList() = this.renderRoomList.bind(this);
    }

    componentDidMount(){
        this.getRooms();
    }
    componentDidUpdate(){
    }

    getRooms(){
        getAllRooms()
            .then(data => data.json())
            .then(data_json => {
                //set state to list of data
                this.setState({rooms: [...data_json]})
            })
    }

    renderRoomList(){
        return(this.state.rooms.map((room, i) => {
            return (
                <li onClick={(event) => {
                    this.props.addSelectedRoom(room._id)
                }}>
                <p>{room._id}</p>
                </li>
            )
        }))
    }

    render(){
        return(
            <div>
                <ul>
                    {this.renderRoomList()}
                </ul>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    addSelectedRoom: (payload) => dispatch(actions.addSelectedRoom(payload)),
});

const mapStateToProps = ((state, ownProps) => {
    return {
        selectedRoom: state.chatroomReducer,
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListOfChats);
