import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let test = 1;
const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest}  render={(props) => (
            rest.loginReducer.success === true 
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

const mapStateToProps = ((state, ownProps) => {
    return {
        loginReducer: state.loginReducer,
    }
})

export default connect(mapStateToProps)(PrivateRoute);

