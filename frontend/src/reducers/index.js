import { combineReducers } from 'redux'
import { GET_CATEGORIES, LOAD_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, SORT_BY_DATE, SORT_BY_SCORE } from '../actions/index'
import { objectFromArray } from "../utils/helpers"

export const categories = (state = {}, action) => {
    const {categories} = action;
    if(action.type === GET_CATEGORIES)
        return objectFromArray(categories, 'name');
    return state;
};
export const comments = (state = {}, action) => {
    const {comments, comment_id, comment} = action;
    switch (action.type) {
        case LOAD_COMMENTS:
            return {
                ...state,
                ...objectFromArray(comments, 'id')
            };
        case ADD_COMMENT:
        case EDIT_COMMENT:
            return {
                ...state,
                [comment.id]: comment
            };
        case DELETE_COMMENT:
            var newState = {...state}
            delete newState[comment_id]
            return newState;
        default:
            return state;
    }

};
export const posts = (state = {}, action) => {
    const {posts, post_id, post} = action;

    switch (action.type) {
        case GET_POSTS:
            const filteredPosts = posts.filter(p => (p.deleted !== true))
            return {
                ...state,
                ...objectFromArray(filteredPosts, 'id')
            }
        case ADD_POST:
        case EDIT_POST:
            return {
                ...state,
                [post.id]: post
            };
        case DELETE_POST:
            var newState = {...state}
            delete newState[post_id]
            return newState;
        default:
            return state;
    }
};
export const prefrences = (state = {}, action) => {
    switch (action.type) {
        case SORT_BY_DATE:
            return {
                ...state,
                ['sorting']: 'byDate'
            };
        case SORT_BY_SCORE:
            return {
                ...state,
                ['sorting']: 'byScore'
            };
        default:
            return state;
    }
};
export default combineReducers({posts, comments, categories, prefrences});
