import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable'; // 保证数据的不可变

import './regist.less';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';

/**
 * This class describes a regist.
 *
 * @class      Regist (name)
 */
export default class Regist extends Component {
    componentDidMount() {
        console.info('Regist component did mount...');
    }

    constructor(props) {
        super(props);
        console.dir(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 判断是否要更新render, return true 更新  return false不更新
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    static propType = {
        userInfo: PropTypes.object.isRequired,
    }

    state = {
        userData: {
            userName: '',
            userEmail: "",
            homeAddress: '',
            phoneNum: "",
            password: '',
            repassword: "",
        },
        alert: {
            alertStatus: false,
            alertTip: "",
        },
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    // 提交注册用户数据
    registHandler = async () => {
        console.log('提交注册用户数据.');

        let isValidate = false;
        let alertTip = '';

        const { userName, userEmail, homeAddress, phoneNum, password, repassword } = this.state.userData;

        if (repassword !== password) {
            alertTip = '两次输入的密码不一致';
            isValidate = true;
        } else if (!userName.toString().length) {
            alertTip = '用户名称禁止为空!';
            isValidate = true;
        } else if (!userEmail.toString().length) {
            alertTip = '邮箱地址禁止为空!';
            isValidate = true;
        } else if (!homeAddress.toString().length) {
            alertTip = '住址禁止为空!';
            isValidate = true;
        } else if (!phoneNum.toString().length) {
            alertTip = '电话号码禁止为空!';
            isValidate = true;
        } else if (!password.toString().length) {
            alertTip = '密码禁止为空!';
            isValidate = true;
        } else if (!this.state.userData.repassword.toString().length) {
            alertTip = '请再次输入密码!';
            isValidate = true;
        }

        if (isValidate) {
            this.setState({
                alert: {
                    alertStatus: true,
                    alertTip: alertTip,
                }
            })
            return;
        }

        await console.dir(this.state.userData);
    }

    /**
     * { 将表单数据保存至redux，保留状态 }
     *
     * @param      {<type>}  type    The type
     * @param      {<type>}  event   The event
     */
    handleInput = (type, event) => {
        console.log(type);
        console.log(event);

        let value = event.target.value;
        let tempState = {};
        tempState[type] = value;
        this.setState(tempState);
    }

    // 关闭弹窗
    closeAlert = () => {
        this.setState({
            alert: {
                alertStatus: false,
                alertTip: ""
            }
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <div className="reg_container" ref = "own_reg_html" >

            <MineHeader targetUrl="/login" targetUrlName="已有账户,前往登录" />

            <div className="sub_contain">
            <form className="mine_form">
                <div>
                    <fieldset>
                        <legend id="legend_tip">填写用户资料</legend>
                        <div>
                            <label htmlFor="userName">Name:</label>
                            <input maxLength="24" type="text" id="userName" value={this.state.userData.userName} onChange={this.handleInput.bind(this,'userName')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="userEmail">Email Address:</label>
                            <input maxLength="52" type="email" id="userEmail" value={this.state.userData.userEmail} onChange={this.handleInput.bind(this,'userEmail')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="homeAddress">Address:</label>
                            <input maxLength="56" type="text" id="homeAddress" value={this.state.userData.homeAddress} onChange={this.handleInput.bind(this,'homeAddress')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="phoneNum">Phone Number:</label>
                            <input maxLength="16" type="tel" id="phoneNum" value={this.state.userData.phoneNum} onChange={this.handleInput.bind(this,'phoneNum')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input maxLength="12" type="password" id="password" value={this.state.userData.password} onChange={this.handleInput.bind(this,'password')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="repassword">Password Again:</label>
                            <input maxLength="12" type="password" id="repassword" value={this.state.userData.repassword} onChange={this.handleInput.bind(this,'repassword')} />
                            <br />
                        </div>
                    </fieldset>
                </div>
                <div className="btn_container">
                    <div className="action_btn_ele">
                        <input type="reset" value="Reset" className="reset_button btn_part" />
                    </div>
                    <div className="action_btn_ele">
                        <input type="button" value="Submit" className="submit_button btn_part" id="submit_button_only" onClick={this.registHandler} />
                    </div>
                </div>
            </form>
       	 </div>

		<MineAlert alertStatus = { this.state.alert.alertStatus } alertTip = { this.state.alert.alertTip } closeAlert = { this.closeAlert }
            />

       </div>
        );
    }
}