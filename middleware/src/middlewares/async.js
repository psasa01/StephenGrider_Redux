export default ({ dispatch }) => {
    return next => action => {
        // if the action does not have a payload
        // or payload does not have a .then property
        // we don't care, send it on
        if(!action.payload || !action.payload.then) {
            return next(action);
        }

        // make sure the action's promise resolve
        action.payload
            .then((response) => {
                // create new action with the old type 
                // but replace promise with response data
                const newAction = { ...action, payload: response };
                // make sures new action through all middlewares again
                dispatch(newAction);
            })
    }
}