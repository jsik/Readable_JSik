import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sortedBy} from '../utils/helpers';
import Modal from 'react-modal';
import SinglePost from './SinglePost';
import SortBy from './SortBy';
import AddEditPost from './AddEditPost';

class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	isModalOpen: false
    };
  }
  addPost() {
    this.setState({isModalOpen: true})
  }
  closeModal() {
    this.setState({isModalOpen: false})
  }
  generateModal() {
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
        contentLabel="Add Post">
        <h2>Add Post</h2>
        <AddEditPost onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}} />
      </Modal>
    )
  }
  render() {
    const {posts, prefrences} = this.props
	const {category_name} = this.props.match.params
    const allPosts = sortedBy(posts, prefrences.sorting)
	const displayPosts = category_name ? allPosts.filter(p => (p.category === category_name)) : allPosts;
    return (
      <div>
        <SortBy/>
        <ul>
          {displayPosts.map((post) => (<SinglePost key={post.id} post={post}/>))}
        </ul>
        <button onClick={() => {this.addPost()}}>Add Post</button>
        {this.generateModal()}
      </div>
    )
  }
}

function mapStateToProps({posts, prefrences}) {
  return {posts, prefrences}
}

export default connect(mapStateToProps)(ListPosts);