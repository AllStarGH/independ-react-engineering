import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import PropTypes from 'prop-types';

import './index.less';

/**
 * { 缺省数据 }
 *
 * @type       {<type>}
 */
var defaultState = {
    alertStatus: false,
    alertTip: '提示',
    closedAlert: () => {},
}

/**
 * This class describes an eject window.弹窗组件
 *
 * @class      EjectWindow (name)
 */
class EjectWindow extends Component {

    state = {
        ...defaultState
    }

    /**
     * css动画组件设为目标组件
     *
     * @class      FirstChild (name)
     * @param      {<type>}  props   The properties
     * @return     {<type>}  { description_of_the_return_value }
     */
    FirstChild = props => {
        console.info('props===');
        console.info(props);

        const childrenArray = React.Children.toArray(props.children);
        console.info('childrenArray===');
        console.info(childrenArray);

        return childrenArray[0] || null;
    }

    /**
     * Closes an alert window.关闭弹窗
     */
    confirm = () => {
        this.setState({
            alertStatus: false
        })
        this.state.closedAlert();
        // this.props.closeAlert();
    }

    /**
     * Opens an alert window.
     *
     * @param      {<type>}  options  The options
     */
    opened = (options) => {
        console.info('options===');
        console.info(options);

        options = options || {};
        options.alertStatus = true;
        this.setState({
            ...defaultState,
            ...options
        })
    }

    /**
     * { 关闭 }
     */
    close() {
        this.state.closedAlert();
        this.setState({
            ...defaultState
        })
    }

    // \\\\\\\\\\\\\\\\\\

    shouldComponentUpdate(nextProps, nextState) {
        // 判断是否要更新render, return true更新; return false不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentDidMount() {
        console.log('EjectWindow Component DID MOUNT!')
        console.log(this);
    }

    // \\\\\\\\\\\\\

    render() {
        const alertHtmls = <ReactCSSTransitionGroup component={this.FirstChild} transitionName='hide' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <div className="alert-container" style={this.state.alertStatus ? { display: 'block' } : { display: 'none' }}>
                <div className="alert-context">
                    <div className="alert-context-detail" id="alert_detail">
                        {this.state.alertTip}
                    </div>
                    <hr className="hr-divide-line"/>
                    <div className="confirm" onClick={this.confirm}>

                    <div className="confirm_btn_div"> 确定 </div>

                </div>
                </div>
            </div>
        </ReactCSSTransitionGroup>;
        /**/
        return (alertHtmls);
    }

}

let div = document.createElement('div');
let props = {};
document.body.appendChild(div);
let Box = ReactDOM.render(React.createElement(EjectWindow, props), div);
export default Box;