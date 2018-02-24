import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR , UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

// redux-thunk allows us to return function instead of object
// from the action-creator. 
// That function is automaticaly called with a dispatch method
// dispatch is method inside redux that accepts an action and forwards it to all reducers
// its basicaly main pipeline of redux!!!
// purpose of redux thunk is to allow us to dispatch multiple different actions inside action creator

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/pass to server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // if req is good, 
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER })
                // - save the JWT token to localStorage
                localStorage.setItem('token', response.data.token)
                // - redirect to the '/feature'
                browserHistory.push('/feature');

            })
            .catch(() => {
                // if req is bad
                // - show an error to user
                dispatch(authError('Bad login info!'));
            })
    }
}

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const signoutUser = () => {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}

export const signupUser = ({ email, password }) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
    }
}