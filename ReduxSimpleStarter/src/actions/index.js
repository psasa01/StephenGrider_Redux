export const selectBook = (book) => {
    // selectBook is an anctionCreator, it needs to retur an action!
    return {
        type: "BOOK_SELECTED",
        payload: book
    }
}

