import React, {Component} from 'react';
import ListPosts from './components/ListPosts';
import './App.css';
import AddEditPost from './components/AddEditPost';
import {Switch, Route, withRouter} from 'react-router-dom';
import ListCategories from './components/ListCategories';
import PostDetailView from './components/PostDetailView';
import {connect} from 'react-redux';
import * as API from "./services/api-helper";
import {GET_CATEGORIES, GET_POSTS, loadPosts, getCategories} from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        categories:[]
    };
    this.getPosts();
    this.getCategories();
  }

  getPosts() {
      API.fetchPosts().then((posts) => {
          this.props.onLoadPosts({type: GET_POSTS, posts});
      });
  }

  getCategories() {
      API.fetchCategories().then(categories => {
      this.props.onLoadCategories({type: GET_CATEGORIES, categories});
      this.setState({categories});
    });
  }

  render() {
    return (
      <div className="App">
          <ListCategories categories={this.state.categories}/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={ListPosts}/>
            <Route exact path='/add_post' component={AddEditPost}/>
            <Route exact path='/:category_name' component={ListPosts}/>
            <Route exact path='/:category_name/:post_id' component={PostDetailView}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadPosts: (posts) => dispatch(loadPosts(posts)),
    onLoadCategories: (categories) => dispatch(getCategories(categories))
  }
};

export default withRouter(connect(null, mapDispatchToProps)(App));

