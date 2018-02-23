import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

// when exports component, wrap it with redux-form helper
// inside the helper we place field definitions!!!
// first put the helper at the bottom!!

// also redux-form must be hooked as a reducer

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log( email, password );
        // need to do smthng to log user in!
        this.props.signinUser({ email, password });

    }
    render() {
        const { handleSubmit, fields: { email, password }} = this.props;
        return ( 
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email: </label>
                    <input {...email} className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password: </label>
                    <input {...password} className="form-control"/>
                </fieldset>
                <button className="btn btn-primary" action="submit">Sign in</button>
            </form>
        )
    }
}

// redux-form is behaving like connect,
// first arg: mapStateToProps,
// second arg: mapDispatchToprops (actions) 

export default reduxForm({
    form: 'signin',
    fields: [ 'email', 'password' ]
}, null, actions)(Signin);