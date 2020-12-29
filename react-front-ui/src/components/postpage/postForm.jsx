import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPost } from '@/store/posts/action';

// import PropTypes from 'prop-types';
// 保证数据的不可变
import { is, fromJS } from 'immutable';
import MineHeader from '@/components/public/header/header';

import './postForm.less'

/**
 * This class describes a post form.
 *
 * @class      PostForm (name)
 */
class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            titie: "",
            body: "",
        }
    }

    componentDidMount() {
        console.log('PostForm component did mount');
        console.dir(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info(nextProps);
        console.info(nextState);
        // 判断是否要更新render,true=更新;false=不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    onChange = (e) => {
        console.dir(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        console.dir(e)
        // e.preventDefault();
        e.persist();

        const post = {
            titie: this.state.title,
            body: this.state.body,
        }
        // 触发action
        this.props.createPost(post)
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        const mineDoc = <div className="post_form_container">
        <MineHeader targetUrl="/" targetUrlName="返回主页" />
        <div className="form_container">
            <div className="add_content">
                <h1>添加内容</h1>
            </div>
            <div className="form_div_top">
                <form className="mine_post_form" onSubmit={this.onSubmit}>
                    <div className="inp_item_div element_item">
                        <div>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input type="text" name="title" className="value_local ipt" placeholder="please input the title" onChange={this.onChange} value={this.state.title||''} />
                        </div>
                    </div>
                    <div className="inp_item_div element_item">
                        <div>
                            <label htmlFor="body">Body</label>
                        </div>
                        <div>
                            <textarea name="body" className="value_local text_area" placeholder="please input some context" onChange={this.onChange} value={this.state.body}></textarea>
                        </div>
                    </div>
                    <div className="mine_btn_div element_item">
                        <div id="input_button">
                            <div className="btn_inp_div">
                                <input type="reset" className="ipt_btn" value="复位" />
                            </div>
                            <div className="btn_inp_div">
                                <input type="submit" className="ipt_btn" value="添加" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
        /**/
        return (mineDoc)
    }

}

export default connect(null, { createPost })(PostForm);