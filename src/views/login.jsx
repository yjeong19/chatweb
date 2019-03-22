import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { login } from '../controller/login';
import { Link } from 'react-router-dom'
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
                }else{
                    //if fail dont log in --- make this private route later
                    console.log('fail');
                }
            })
            .catch(err => console.log(err));
    }

    handleInput(e){
        this.setState({[e.target.id]: e.target.value})
    }

    renderSignUp(){
        const { classes } = this.props;
        return(
        <FormControl>
            <TextField 
                required
                id='register_user'
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
                onChange={(e) => this.handleInput(e)}
            />
            <TextField 
                required
                id='password2'
                label='re-enter your password'
                placeholder='re-enter your password'
                margin='normal'
                variant='outlined'
                onChange={(e) => this.handleInput(e)}
            />
            <div className={styles.buttonContainer}>
                <Button
                    className={classes.loginButton}
                    onClick={() => this.setState({reg_or_login: 'login'})}
                >
                    Login
                </Button>
                <Button
                    className={classes.loginButton}
                    variant='contained'
                >
                    Register
                </Button>
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
            <Paper className={classes.paper}>
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
        backgroundColor: 'red',
        margin: '25%'
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

export default withStyles(styles)(LoginPage);