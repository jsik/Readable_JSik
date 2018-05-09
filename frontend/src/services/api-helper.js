export const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};
export const base_url = "http://localhost:3001/";

export const fetchCategories = () => {
    return _getObject(`${base_url}categories/`, 'categories');
};

export const fetchCategoryPosts = (category_name) => {
    return _getObject(`${base_url}${category_name}/posts/`);
};

export const fetchPosts =() => {
    return _getObject(`${base_url}posts/`);
}

export const createPost = (author, category, title, body) => {
    return _postObject(`${base_url}posts/`, {
        id: guid(),
        timestamp: Date.now(),
        author: author,
        category: category,
        title: title,
        body: body
    });
}

export const editPost = (post_id, newAuthor, newCategory, newTitle, newBody) => {
    return _putObject(`${base_url}posts/${post_id}/`, {
        author: newAuthor,
        category: newCategory,
        title: newTitle,
        body: newBody
    });
}

export const fetchPost = (post_id) => {
    return _getObject(`${base_url}posts/${post_id}/`);
}

export const deletePost= (post_id) => {
    return _deleteObject(`${base_url}posts/${post_id}/`);
}

export const fetchPostComments = (post_id) => {
    return _getObject(`${base_url}posts/${post_id}/comments`);
}

export const createComment = (post_id, author, body) => {
    return _postObject(`${base_url}comments/`, {
        id: guid(),
        timestamp: Date.now(),
        parentId: post_id,
        author: author,
        body: body,
    });
}

export const editComment = (comment_id, newAuthor, newBody) => {
    return _putObject(`${base_url}comments/${comment_id}/`, {
        body: newBody,
        author: newAuthor,
    });
}

export const fetchComment = (comment_id) => {
    return _getObject(`${base_url}comments/${comment_id}/`);
}

export const deleteComment = (comment_id) => {
    return _deleteObject(`${base_url}comments/${comment_id}/`);
}

export const _makeRequest = (url, method, body = null, keyPath = null) => {
    return new Promise((resolve, reject) => {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "whatever");
        var init = {
            method: method,
            headers: headers
        };
        if (body) {
            init.body = JSON.stringify(body)
        }
        fetch(url, init).then((response) => {
            return response.text().then(text => {
                return text
                    ? JSON.parse(text)
                    : {}
            });
        }).then((data) => {
            if (keyPath) {
                resolve(data[keyPath]);
            } else {
                resolve(data);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

export const _getObject = (url, keyPath = null) =>{
    return _makeRequest(url, 'GET', null, keyPath);
}

export const _postObject = (url, body, keyPath = null) =>{
    return _makeRequest(url, 'POST', body, keyPath);
}

export const _deleteObject = (url, keyPath = null) =>{
    return _makeRequest(url, 'DELETE', null, keyPath);
}

export const _putObject = (url, body, keyPath = null) => {
    return _makeRequest(url, 'PUT', body, keyPath);
}