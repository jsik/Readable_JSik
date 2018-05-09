import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../services/api-helper';
import SinglePost from './SinglePost';
import SingleComment from './SingleComment';
import AddEditComment from './AddEditComment';
import {LOAD_COMMENTS, loadComments} from "../actions/index";
import {Redirect} from "react-router-dom";
import {arrayFromObject} from '../utils/helpers'

class PostDetailView extends Component {
  constructor(props) {
    super(props);
    this.getComments();
  }
  getComments() {
    const {post_id} = this.props.match.params
    API.fetchPostComments(post_id).then(comments => {
      this.props.loadComments({
		  type: LOAD_COMMENTS, 
		  comments
	  });
    });
  }
  render() {
    const {post_id} = this.props.match.params
    const {posts, comments} = this.props
    const postDetail = posts[post_id];
    const commentsList = arrayFromObject(comments, "id").filter(c => (c.parentId === post_id));
    if (postDetail) {
      return (
        <div>
          <SinglePost post={postDetail}/>
		  <div>
		  	  <h2>Comments</h2>
	          <span>{commentsList.length > 0 ? "" : "No comment for this post"}</span>
	          <ol>
	            {commentsList.map((c) => (<SingleComment key={c.id} comment={c}/>))}
	          </ol>
		  </div>
          <div>
            <h2>Add Comment</h2>
            <AddEditComment post_id={post_id}/>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />
  }
}

function mapStateToProps({posts, comments}) {
  return {posts, comments}
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: (comments) => dispatch(loadComments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
