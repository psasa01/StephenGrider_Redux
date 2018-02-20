import React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

class BookDetail extends Component {
    render() {
        if(!this.props.book) {
            return <div>Select book to get started!</div>
        }
        return (
            <div>
                <h3>Book Detail: </h3>
                <div>{this.props.book.title}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.activeBook
    }
}

export default connect(mapStateToProps)(BookDetail)