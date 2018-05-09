export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const SORT_BY_DATE = 'SORT_BY_DATE'
export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const getCategories = ({categories}) => {
    return {type: GET_CATEGORIES, categories};
};
export const addComment = ({comment}) => {
    return {type: ADD_COMMENT, comment};
};
export const editComment = ({comment}) => {
    return {type: EDIT_COMMENT, comment};
};
export const deleteComment = ({comment_id}) => {
    return {type: DELETE_COMMENT, comment_id};
};
export const loadComments = ({comments}) => {
    return {type: LOAD_COMMENTS, comments};
};
export const loadPosts = ({posts}) => {
    return {type: GET_POSTS, posts};
};
export const addPost = ({post}) => {
    return {type: ADD_POST, post};
};
export const editPost = ({post}) => {
    return {type: EDIT_POST, post};
};
export const deletePost = ({post_id}) => {
    return {type: DELETE_POST, post_id};
};
export const sortByDate = () => {
    return {type: SORT_BY_DATE};
};
export const sortByScore = () => {
    return {type: SORT_BY_SCORE};
};