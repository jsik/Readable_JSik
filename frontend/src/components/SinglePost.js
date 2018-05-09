import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import * as API from '../services/api-helper';
import AddEditPost from './AddEditPost';
import {DELETE_POST, deletePost} from "../actions/index";
import {dateFormatter} from '../utils/helpers';

class SinglePost extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
    	isModalOpen: false,
      	commentsCount: 0
    };
  }

  deletePost() {
    if(window.confirm('Delete Post?')) {
      const post_id = this.props.post.id
      API.deletePost(post_id).then(() => {
        this.props.deletePost({
          type: DELETE_POST,
          post_id
        });
        this.props.history.push('/');
      });
    };
  }

  editPost() {
    this.openModel();
  }

  openModel() {
    this.setState({isModalOpen: true})
  }

  closeModal() {
    this.setState({isModalOpen: false})
  }

  generateModal(post) {
    const {isModalOpen} = this.state;
    const modalStyle = {
      content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: 'auto',
      }
    };
    return (
      <Modal
        style={modalStyle}
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        closeTimeoutMS={0}
        shouldCloseOnOverlayClick={true}
        contentLabel="Edit Post">
        <h2>Edit Post</h2>
        <AddEditPost initialPost={post} onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}} />
      </Modal>
    )
  }
  render() {
      const {post} = this.props;
      const date = dateFormatter(post.timestamp);

    return (
      <div className="post">
        <Link to={`/${post.category}/${post.id}`} >
          <h2 className="postTitle">{post.title}</h2>
        </Link>
        <p>Published on {date} by {post.author}</p>
        <p>{post.body}</p>
        {this.generateModal(post)}
        <button onClick={() => {this.editPost()}}>edit</button>
        <button onClick={() => {this.deletePost()}}>delete</button>
        <hr/>
      </div>
    );
  };
}


function mapStateToProps ({ posts }) {
  return {posts}
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (post_id) => dispatch(deletePost(post_id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost))
