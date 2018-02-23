import axios from 'axios';

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

    // if req is good, 
    // - update state to indicate user is authenticated
    // - save JWT token
    // - redirect to the '/feature'

    // if req is bad
    // - show an error to user

    }   
}