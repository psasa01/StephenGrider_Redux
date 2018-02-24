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
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oooops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        const { handleSubmit, fields: { email, password }} = this.props;
        return ( 
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email: </label>
                    <input type="email" {...email} className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password: </label>
                    <input type="password" {...password} className="form-control"/>
                </fieldset>
                {this.renderAlert()}
                <button className="btn btn-primary" action="submit">Sign in</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}

// redux-form is behaving like connect,
// first arg: mapStateToProps,
// second arg: mapDispatchToprops (actions) 

export default reduxForm({
    form: 'signin',
    fields: [ 'email', 'password' ]
}, mapStateToProps, actions)(Signin);