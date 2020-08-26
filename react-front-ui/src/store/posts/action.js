import { NEW_POSTS, FETCH_POSTS } from './actionType'

/* es6语法 */

export const fetchPosts = () => dispatch => {
    fetch('http://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts =>
            // 当操作成功时,通过dispatch将数据提交至store中的reducer
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        )
}

export const createPost = postData => dispatch => {
    console.log(postData);
    fetch('http://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(res => console.dir(res))
        .then(post =>
            // 当操作成功时,通过dispatch将数据提交至store中的reducer
            dispatch({
                type: NEW_POSTS,
                payload: post
            })
        )
}