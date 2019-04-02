import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { login, register } from '../controller/login';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';


const Cookies = require('js-cookie');

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state={
            reg_or_login: 'login',
            username: '',
            password: '',
            password2: '',
        }

        //bind events
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        login({username: this.state.username, password: this.state.password})
            .then(data => data.json())
            .then(res => {
                console.log(res);
                if(res.success === true){
                    Cookies.remove('user_id');
                    Cookies.remove('token');
                    Cookies.set('user_id', res.payload.id, { expires:1 });
                    Cookies.set('token', res.token, { expires: 1 });
                    this.props.addLogin(res);
                }else{
                    //if fail dont log in --- make this private route later
                    console.log('fail');
                    alert('fail');
                }
            })
            .catch(err => console.log(err));
    }

    handleInput(e){
        this.setState({[e.target.id]: e.target.value})
    }

    handleRegister(){
        register({username: this.state.username, password: this.state.password, password2: this.state.password2})
            .then(data => data.json())
            .then(res => {
                Cookies.remove('user_id');
                Cookies.remove('token');
                Cookies.set('user_id', res.payload.id, { expires:1 });
                Cookies.set('token', res.token, { expires: 1 });
                this.props.addLogin(res);
            })
            .catch(err => console.log(err));
    }

    renderSignUp(){
        const { classes } = this.props;
        return(
        <FormControl>
            <TextField 
                required
                id='username'
                label='Username'
                placeholder='username'
                margin='normal'
                variant='outlined'
                onChange={(e) => this.handleInput(e)}
            />
            <TextField 
                required
                id='password'
                label='Password'
                placeholder='password'
                margin='normal'
                variant='outlined'
                type='password'
                onChange={(e) => this.handleInput(e)}
            />
            <TextField 
                required
                id='password2'
                label='re-enter your password'
                placeholder='re-enter your password'
                margin='normal'
                variant='outlined'
                type='password'
                onChange={(e) => this.handleInput(e)}
            />
            <div className={styles.buttonContainer}>
                <Button
                    className={classes.loginButton}
                    onClick={() => this.setState({reg_or_login: 'login'})}
                >
                    Login
                </Button>
                <Link to='/chat' >
                <Button
                    className={classes.loginButton}
                    variant='contained'
                    onClick={this.handleRegister}
                >
                    Register
                </Button>
                </Link>
            </div>
        </FormControl>
        )
    }

    renderLogin(){
        const { classes } = this.props;
        return(
        <FormControl>
            <TextField
                required
                id="username"
                label="Required"
                placeholder='Username'
                margin="normal"
                variant="outlined"
                onChange={(e) => this.handleInput(e)}
            />
            <TextField
                required
                id="password"
                label="Password"
                placeholder='Password'
                margin="normal"
                variant="outlined"
                type='password'
                onChange={(e) => this.handleInput(e)}
            />
            <div className={styles.buttonContainer}>
                <Button
                    className={classes.loginButton}
                    onClick={() => this.setState({reg_or_login: 'register'})}
                >
                    SignUp
                </Button>
                <Link to='/chat'>
                <Button
                    className={classes.loginButton}
                    variant='contained'
                    onClick={this.handleLogin}
                >
                    Login
                </Button>
                </Link>
            </div>
        </FormControl>
        )
    }

    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.paper} elevation4>
                {this.state.reg_or_login === 'login' ? this.renderLogin() : this.renderSignUp()}
            </Paper>
        )
    }
};

const styles = {
    paper: {
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        backgroundColor: '#3f51b5',
        margin: '25%',
    },
    loginButton: {
        marginBottom: '2%'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}

const mapStateToProps = ((state, ownProps) => {
    return {
        login: state.loginReducer
    }
});

const mapDispatchToProps = (dispatch) => ({
    addLogin: (payload) => dispatch(actions.addLogin(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(LoginPage));