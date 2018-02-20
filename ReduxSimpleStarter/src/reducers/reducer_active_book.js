// state argument is not app state, only the state this reducer is responsible
export default (state = null, action) => {
    switch (action.type) {
        case 'BOOK_SELECTED':
        return action.payload;
    }
    
    return state;
}