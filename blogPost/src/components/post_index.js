import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        return this.props.posts.map((post) => {
            return (<li className="list-group-item" key={post.id}>
                <Link to={"posts/" + post.id}>
                    <span className="pull-xs-right">{post.categories}</span>
                    <strong>{post.title}</strong>
                </Link>
            </li>)
        })
    }
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new/">
                        Add a POST!!!
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts.all }
}

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ fetchPosts }, dispatch)
// }

export default connect(mapStateToProps, { fetchPosts })(PostsIndex); // same as bindActionCreators / mapDispatchToProps