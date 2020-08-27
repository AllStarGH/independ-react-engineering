import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { is, fromJS } from 'immutable'; // 保证数据的不可变

import './regist.less';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';

/**
 * This class describes a regist.
 *
 * @class      Regist (name)
 */
export default class Regist extends Component {
    constructor(props) {
        super(props);
        console.info('Constructor...');
        console.dir(this);
    }

    componentDidMount() {
        console.info('Regist component did mount...');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.info('Should Component Update..');
    //     console.info(nextProps);
    //     console.info(nextState);
    // 判断是否要更新render, return true 更新  return false不更新
    // return !is1(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    // }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    static propType = {
        userInfo: PropTypes.object.isRequired,
    }

    state = {
        userName: '',
        userEmail: "",
        homeAddress: '',
        phoneNum: "",
        password: '',
        repassword: "",
        //
        alertStatus: false,
        alertTip: "",
        //
        informationTip: '',
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    // 提交注册用户数据
    registHandler = async () => {
        console.log('提交注册用户数据.');

        let isValidate = false;
        let alertTip = '';
        var userData = {};

        const { userName, userEmail, homeAddress, phoneNum, password, repassword } = this.state;

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
        } else if (!this.state.repassword.toString().length) {
            alertTip = '请再次输入密码!';
            isValidate = true;
        }

        if (isValidate) {
            this.setState({
                alertStatus: true,
                alertTip: alertTip,
            })
            return;
        }

        userData.userName = userName;
        userData.userEmail = userEmail;
        userData.homeAddress = homeAddress;
        userData.phoneNum = phoneNum;
        userData.password = password;

        await console.dir(userData);
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
        let newState = {};
        newState[type] = value;
        console.log(newState);

        switch (type) {
            case 'userName':
                this.verifyUserName(value);
                break;

            case 'userEmail':
                this.verifyMailbox(value);
                break;

            case 'phoneNum':
                this.verifyPhone(value);
                break;

            case 'homeAddress':
                this.verifyHomeAddress(value);
                break;

            default:
                break;
        }
        this.setState({
            ...newState
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    /* 校验 */

    // 校验手机号码
    verifyPhone = (value) => {
        console.log('校验手机号码===' + value)
        // 中文、英文、数字包括横杠
        let str = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
        let reg = new RegExp(str);
        let infoTip = "";
        if (reg.test(value) === false) {
            infoTip = '请输入正确格式的手机号码';
        }
        this.setState({
            informationTip: infoTip
        })
    }

    // 校验住址
    verifyHomeAddress = (value) => {
        console.log('校验住址===' + value)
        // 中文、英文、数字包括横杠
        let str = /^[\u4E00-\u9FA5A-Za-z0-9-]+$/;
        let reg = new RegExp(str);
        let infoTip = "";
        if (reg.test(value) === false) {
            infoTip = '请输入正确格式的住址(中文、英文、数字,及横杠)';
        }
        this.setState({
            informationTip: infoTip
        })
    }

    // 校验邮箱
    verifyMailbox = (value) => {
        console.log('校验邮箱===' + value);
        let str = /\w+([-+.']\w+)*@\w+([-.]w+)*\.\w+([-.]\w+)*/;
        let reg = new RegExp(str);
        let infoTip = "";
        if (reg.test(value) === false) {
            infoTip = '请输入正确格式的邮箱地址';
        }
        this.setState({
            informationTip: infoTip
        })
    }

    // 校验用户名
    verifyUserName = (value) => {
        console.log('校验用户名===' + value)
        // 中文、英文、数字但不包括下划线等符号
        let str = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/;
        let reg = new RegExp(str);
        let infoTip = "";
        if (reg.test(value) === false) {
            infoTip = '请输入正确格式的用户名(中文、英文、数字)';
        }
        this.setState({
            informationTip: infoTip
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    // 关闭弹窗
    closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: ""
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <div className="reg_container" ref = "own_reg_html" >

            <MineHeader targetUrl="/login" targetUrlName="已有账户,前往登录" />

            <div className="sub_contain">
            <form className="mine_form">
            <p ref="information" className="information">{this.state.informationTip}</p>
                <div>
                    <fieldset>
                        <legend id="legend_tip">填写用户资料</legend>
                        <div>
                            <label htmlFor="userName">Name:</label>
                            <input maxLength="24" type="text" id="userName" value={this.state.userName} onChange={this.handleInput.bind(this,'userName')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="userEmail">Email Address:</label>
                            <input maxLength="52" type="email" id="userEmail" value={this.state.userEmail} onChange={this.handleInput.bind(this,'userEmail')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="homeAddress">Address:</label>
                            <input maxLength="56" type="text" id="homeAddress" value={this.state.homeAddress} onChange={this.handleInput.bind(this,'homeAddress')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="phoneNum">Phone Number:</label>
                            <input maxLength="16" type="tel" id="phoneNum" value={this.state.phoneNum} onChange={this.handleInput.bind(this,'phoneNum')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input maxLength="16" type="password" id="password" value={this.state.password} onChange={this.handleInput.bind(this,'password')} />
                            <br />
                        </div>
                        <div>
                            <label htmlFor="repassword">Password Again:</label>
                            <input maxLength="16" type="password" id="repassword" value={this.state.repassword} onChange={this.handleInput.bind(this,'repassword')} />
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

        <MineAlert alertStatus = { this.state.alertStatus } alertTip = { this.state.alertTip } closeAlert = { this.closeAlert }
            />

       </div>
        );
    }
}