import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { is, fromJS } from 'immutable'; // 保证数据的不可变

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
        console.log('MineAlert Component DID MOUNT!');
        console.log(this);
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
        // console.dir(React);
        const childrenArray = React.Children.toArray(props.children);

        // console.info(props);
        // console.info(childrenArray);

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
            <div className="alert-context" id="mine_alert_cont">
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