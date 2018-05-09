import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../services/api-helper';
import {ADD_COMMENT, EDIT_COMMENT, addComment, editComment} from "../actions/index";

class AddEditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	author: '',
    	body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const {initialComment} = this.props;
    if (initialComment) {
		this.setState({
			author: initialComment.author, 
			body: initialComment.body
		});
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
		  default:
			  break
	  }
  }
  onSubmit(event) {
    event.preventDefault();
	const {author, body} = this.state;
	const {initialComment} = this.props;
    if (author.length < 1 || body.length < 1)
      return;
    if (initialComment) {
	    API.editComment(initialComment.id, author, body).then(newComment => {
	      this.props.editComment({
	        type: EDIT_COMMENT,
	        comment: newComment
	      });
	    });
    } else {
	    const {post_id} = this.props;
	    API.createComment(post_id, author, body).then(newComment => {
	      this.props.addComment({
	        type: ADD_COMMENT,
	        comment: newComment
	      });
	      this.setState({
    		  author: '',
    		  body: ''
	      });
	    })
    }
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
  render() {
	const {author, body} = this.state
    return (
        <form onSubmit={this.onSubmit}>
			<div>
	          <label>Author:</label>
	          <input type="text" name="author" placeholder="Enter Author Name" value={author} onChange={this.onChange} />
			</div>
          	<div>
	          <label>Comment:</label>
	          <textarea name="body" placeholder="Enter Comment" value={body} onChange={this.onChange} />
			</div>
          	<button type="submit">Save</button>
        </form>
    )
  }
}
function mapStateToProps ({ comment }) {
  return {comment}
}
function mapDispatchToProps (dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditComment)
