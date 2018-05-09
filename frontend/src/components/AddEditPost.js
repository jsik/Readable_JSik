import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../services/api-helper';
import {ADD_POST, EDIT_POST, addPost, editPost} from "../actions/index";
import {Link} from "react-router-dom";
import {arrayFromObject} from '../utils/helpers'

class AddEditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    author: '',
	    category: 'react',
	    title: '',
	    body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const {initialPost, defaultCategory} = this.props;
    if (initialPost) {
      this.setState({
        author: initialPost.author,
        category: initialPost.category,
        title: initialPost.title,
        body: initialPost.body
	  });
    } else if (defaultCategory) {
		this.setState({category: defaultCategory})
    }
  }
  onChange(event) {
	  switch(event.target.name) {
	      case "author":
	          this.setState({"author": event.target.value})
	          break
	      case "body":
	          this.setState({"body": event.target.value})
	          break
	      case "category":
	          this.setState({"category": event.target.value})
	          break
	      case "title":
	          this.setState({"title": event.target.value})
	          break
		  default:
			  break
	  }
  }

  onSubmit(event) {
    event.preventDefault();
	const {author, category, title, body} = this.state;
	const {initialPost} = this.props;
    if (author.length < 1 && title.length < 1 && body.length < 1 && category === 'select') {
      return;
    }
    if (initialPost) {
	    API.editPost(initialPost.id, author, category, title, body).then(newPost => {
	      this.props.editPost({
	        type: EDIT_POST,
	        post: newPost
	      });
	    });
    } else {
        API.createPost(author, category, title, body).then(newPost => {
	        this.props.addPost({
	          type: ADD_POST,
	          post: newPost
	        });
	        this.setState({
			    author: '',
			    category: 'react',
			    title: '',
			    body: ''
	  	  	});
    	});
    }
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
  handleCancel() {
    if (this.props.onCancel) {
		this.props.onCancel();
    }
  }
  render() {
    const {author, category, title, body} = this.state
    const {categories} = this.props;
    const categoriesArray = arrayFromObject(categories, "name");
	
    return (
        <div>
          <form onSubmit={this.onSubmit}>
			<div>
	          	<label>Author:</label>
				<input type="text" name="author" placeholder="Author Name" value={author} onChange={this.onChange} />
            </div>
			<div>
				<label>Category:</label>
            	<select name="category" placeholder="select" value={category} onChange={this.onChange}>
	                {categoriesArray.map(c => (<option key={c.path} value={c.path}>{c.name}</option>))}
	            </select>
            </div>
			<div>
	          	<label>Title:</label>
            	<input type="text" name="title" placeholder="Title" value={title} onChange={this.onChange}/>
            </div>
			<div>
	          	<label>Body:</label>
            	<textarea name="body" placeholder="Body" value={body} onChange={this.onChange}/>
            </div>
            <button type="submit">Save</button>
            <Link to='/' ><button onClick={() => {this.handleCancel()}}>Cancel</button></Link>
          </form>
        </div>
    )
  }
}

function mapStateToProps ({ post, categories }) {
  return {
    post,
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post)),
    editPost: (post) => dispatch(editPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPost)
