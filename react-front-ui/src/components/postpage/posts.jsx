import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types';
// 保证数据的不可变
import { is, fromJS } from 'immutable';

import { fetchPosts } from '@/store/posts/action';
import MineHeader from '@/components/public/header/header';

class Posts extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        console.log('component did mount...')
        // 触发action操作actions.js
        this.props.fetchPosts()
    }

    /**
     * 在组件接收到一个新的 prop更新后时被调用,这个方法在初始化render时不会被调用
     *
     * @param      {<type>}  nextProps  The next properties
     */
    componentWillReceiveProps(nextProps) {
        console.log('...Component Will Receive Props...')
        console.info(nextProps);
        if (nextProps.newPost) {
            console.dir(nextProps.newPost)
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info(nextProps);
        console.info(nextState);
        // 判断是否要更新render,true=更新;false=不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    // \\\\\\\\\\\\\\\\\\\

    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
    }

    // \\\\\\\\\\\\\\\\\\\

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <span>userId: {post.userId}</span>
        		<h3>{post.title}</h3>
        		<p>{post.body}</p>
    		</div>
        ))
        /**/
        return (
            <div>
            <MineHeader targetUrl="/" targetUrlName="返回主页" />
            {/**/}
        		<h1>Posts</h1>
                <br/>
        		{postItems}
        	</div>
        )
    }
}

/*
进入组件后,拿到reducer身上的状态(state),通过mapStateToProps方法将state转化为props,组件中可从原来的this.props中获取数据
*/
const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

// mapStateToProps:传入所有state,返回指定的state数据
/* 使用connect可以把state和dispatch绑定到react组件,使得组件可以访问到redux的数据
 */
export default connect(mapStateToProps, { fetchPosts })(Posts);