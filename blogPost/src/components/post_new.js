import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                // blogpost has been created, navigate user to the index
                // we navigate by calling this.context.router.push with new path
                this.context.router.push('/');
            })
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Create a new post!</h3>

                    <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                        <label>Title</label>
                        <input type="text" className="form-control" {...title} />
                        <div className="text-help">
                            {title.touched ? title.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                        <label>Categories</label>
                        <input type="text" className="form-control" {...categories} />
                        <div className="text-help">
                            {categories.touched ? categories.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <label>Content</label>
                        <textarea type="text" className="form-control" {...content} />
                        <div className="text-help">
                            {content.touched ? content.error : ''}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>

                </form>
            </div>
        )
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'You must specify the title!'
    }
    if (!values.categories) {
        errors.categories = 'You must specify at least one category!'
    }
    if (!values.content) {
        errors.content = 'You must enter the text!'
    }

    return errors;
}


// reduxForm is behaving same as connect
// formConfig, mapStateToProps, mapDispatchToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);