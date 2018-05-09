import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import * as API from '../services/api-helper';
import AddEditComment from './AddEditComment';
import {DELETE_COMMENT, deleteComment } from "../actions/index";

class SingleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalOpen: false,
    };
  }
  deleteComment() {
    if(window.confirm('Delete Comment?')) {
      const comment_id = this.props.comment.id
      API.deleteComment(comment_id).then(() => {
        this.props.onDeleteComment({
          type: DELETE_COMMENT,
          comment_id
        });
      });
    };
  }
  editComment() {
    this.openModel();
  }
  openModel() {
    this.setState({isModalOpen: true})
  }
  closeModal() {
    this.setState({isModalOpen: false})
  }
  render() {
    const {isModalOpen} = this.state;
    const {comment} = this.props
    const date = comment.timestamp;
    const modalStyle = {
      content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: 'auto',
      }
    };
    return (
      <div>
        <h3>{comment.body}</h3>
        <p>{date}  by {comment.author}</p>
        <button onClick={() => {this.editComment()}}>edit</button>
        <button onClick={() => {this.deleteComment()}}>delete</button>

        <Modal
            style={modalStyle}
            isOpen={isModalOpen}
            onAfterOpen={() => {}}
            onRequestClose={() => {}}
            closeTimeoutMS={0}
            shouldCloseOnOverlayClick={true}
            contentLabel="Edit Comment">
          <h1>Edit Comment</h1>
          <AddEditComment initialComment={comment} post_id={comment.parentId} onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}}/>
        </Modal>
        <hr/>
      </div>
    );
  };
}

const mapStateToProps  = ({ comments }) => {
  return {comments};
}

const  mapDispatchToProps = (dispatch) => {
  return {
    onDeleteComment: (comment_id) => dispatch(deleteComment(comment_id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleComment));
