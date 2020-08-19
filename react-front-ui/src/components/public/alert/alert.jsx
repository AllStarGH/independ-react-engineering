import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { is, fromJS } from 'immutable'; // 保证数据的不可变

import './alert.less';

/**
 * This class describes a mine alert.
 *
 * @class      MineAlert (name)
 */
export default class MineAlert extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        console.log('MineAlert Component DID MOUNT!')
        console.log(this);
    }

    componentWillUnmount() {
        console.log('MineAlert Component WILL UNMOUNT!')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info(nextProps);
        console.info(nextState);
        // 判断是否要更新render,true=更新;false=不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillReceiveProps(newProps) {
        console.log('MineAlert Component WILL RECEIVE PROPS!');
        console.dir(newProps);
    }

    // \\\\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        closeAlert: PropTypes.func.isRequired,
        alertTip: PropTypes.string.isRequired,
        alertStatus: PropTypes.bool.isRequired,
    }

    // \\\\\\\\\\\\\\\\\\\\\\\

    // css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);

        console.info(props);
        console.info(childrenArray);

        return childrenArray[0] || null;
    }

    // 关闭弹框
    closeAlertWin = () => {
        this.props.closeAlert();
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <ReactCSSTransitionGroup component={this.FirstChild} transitionName="alert" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {
        this.props.alertStatus
        &&
        <div className="alert-contain">
            <div className="alert-context">
                <div className="alert-context-detail">
                    {this.props.alertTip}
                </div>
                <div className='close_win' onClick={this.closeAlertWin}> 确认 </div>
            </div>
        </div>
        }
    </ReactCSSTransitionGroup>
        );
    }
}