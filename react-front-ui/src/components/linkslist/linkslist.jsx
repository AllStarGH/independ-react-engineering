import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable'; // 保证数据的不可变
import { Link } from 'react-router-dom';
import './linkslist.less'

export default class LinksList extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        console.log('LinksList Component did MOUNT!')
        console.log(this);
    }

    componentWillUnmount() {
        console.log('LinksList Component WILL UNMOUNT!')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info(nextProps);
        console.info(nextState);
        // 判断是否要更新render,true=更新;false=不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillReceiveProps(newProps) {
        console.log('LinksList Component WILL RECEIVE PROPS!');
        console.dir(newProps);
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        urlWrapper: PropTypes.object.isRequired,
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <div className="nav_owner">
        <ul className="ul_owner">
            <li className="li_owner">
                <Link className="address_owner" to={this.props.urlWrapper.storeTraining.to} title={this.props.urlWrapper.storeTraining.title}> {this.props.urlWrapper.storeTraining.text} </Link>
            </li>
            <li className="li_owner">
                <Link className="address_owner" to={this.props.urlWrapper.storeTraining2.to} title={this.props.urlWrapper.storeTraining2.title}> {this.props.urlWrapper.storeTraining2.text} </Link>
            </li>
            <li className="li_owner">
                <Link className="address_owner" to={this.props.urlWrapper.site3.to} title={this.props.urlWrapper.site3.title}> {this.props.urlWrapper.site3.text} </Link>
            </li>
            <li className="li_owner">
                <Link className="address_owner" to="#" title="暂未定">等待...</Link>
            </li>
        </ul>
    </div>
        )
    }
}