import React, { Component } from 'react';
import axios from 'axios';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';

import './regist.less';

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

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    state = {
        userName: '',
        userEmail: "",
        homeAddress: '',
        phoneNum: "",
        password: '',
        repassword: "",
        /**/
        alertStatus: false,
        alertTip: "",
        /**/
        informationTip: ''
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    /**
     * 校验非空
     *
     * @return     {(boolean|string)}  { description_of_the_return_value }
     */
    verifyNotNull = () => {
        let isValidate = false;
        let alertInfo = "";

        const { userName, userEmail, homeAddress, phoneNum, password, repassword } = this.state;

        if (repassword !== password) {
            alertInfo = '两次输入的密码不一致';
            isValidate = true;
        } else if (!userName.toString().length) {
            alertInfo = '用户名称禁止为空!';
            isValidate = true;
        } else if (!userEmail.toString().length) {
            alertInfo = '邮箱地址禁止为空!';
            isValidate = true;
        } else if (!homeAddress.toString().length) {
            alertInfo = '住址禁止为空!';
            isValidate = true;
        } else if (!phoneNum.toString().length) {
            alertInfo = '电话号码禁止为空!';
            isValidate = true;
        } else if (!password.toString().length || password.toString().length < 3) {
            alertInfo = '密码禁止为空且长度不得小于3个字符!';
            isValidate = true;
        } else if (!repassword.toString().length || repassword.toString().length < 3) {
            alertInfo = '请输入确认密码且长度不得小于3个字符!';
            isValidate = true;
        }

        this.setState({
            alertStatus: isValidate,
            alertTip: alertInfo,
        });

        console.log('isValidate === ' + isValidate);
        return isValidate;
    }

    /**
     * 提交注册用户数据
     */
    registHandler = () => {
        let url = '/api/userContro/register';
        let alertInfo = '';
        var userData = {};

        let isValidate = this.verifyNotNull();
        if (isValidate) {
            return;
        }

        userData.userName = this.state.userName;
        userData.userEmail = this.state.userEmail;
        userData.homeAddress = this.state.homeAddress;
        userData.phoneNum = this.state.phoneNum;
        userData.password = this.state.password;
        console.dir(userData);

        axios.post(url, userData)
            .then(response => {
                console.dir(response);
                if (response.data.code === 200) {
                    console.dir(response.data);
                    alertInfo = "新用户注册成功,即将跳转至登录界面.";
                    /**/
                    this.setState({
                        alertStatus: true,
                        alertTip: alertInfo,
                    });
                    /**/
                    setTimeout(() => {
                        this.props.history.push('/login');
                    }, 5 * 1000);
                } else {
                    console.dir(response.data.message);
                    this.setState({
                        alertStatus: true,
                        alertTip: response.data.message,
                    });
                }
            })
            .catch(err => {
                console.error(err);
            })
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

    /* 校验正则 */

    // 校验手机号码
    verifyPhone = (value) => {
        console.log('校验手机号码===' + value)
        // 中文、英文、数字包括横杠
        let str = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
        let reg = new RegExp(str);

        if (!reg.test(value)) {
            this.setState({
                informationTip: '请输入正确格式的手机号码'
            })
        }

    }

    // 校验住址
    verifyHomeAddress = (value) => {
        console.log('校验住址===' + value)
        // 中文、英文、数字包括横杠
        let str = /^[\u4E00-\u9FA5A-Za-z0-9-]+$/;
        let reg = new RegExp(str);

        if (!reg.test(value)) {
            this.setState({
                informationTip: '请输入正确格式的住址(中文、英文、数字,及横杠)'
            })
        }

    }

    // 校验邮箱
    verifyMailbox = (value) => {
        console.log('校验邮箱===' + value);
        let str = /\w+([-+.']\w+)*@\w+([-.]w+)*\.\w+([-.]\w+)*/;
        let reg = new RegExp(str);

        if (!reg.test(value)) {
            this.setState({
                informationTip: '请输入正确格式的邮箱地址'
            })
        }

    }

    // 校验用户名
    verifyUserName = (value) => {
        console.log('校验用户名===' + value)
        // 中文、英文、数字但不包括下划线等符号
        let str = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/;
        let reg = new RegExp(str);

        if (!reg.test(value)) {
            this.setState({
                informationTip: '请输入正确格式的用户名(中文、英文、数字)'
            })
        }

    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    formReset = () => {
        this.setState({
            userName: "",
            phoneNum: "",
            userEmail: "",
            homeAddress: "",
            password: '',
            repassword: '',
        })
    }

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
            {/**/}
            <div className="sub_contain">
            <form className="mine_form">
            <p ref="information" className="information">{this.state.informationTip}</p>
                <div>
                    <fieldset>
                        <legend id="legend_tip">填写用户资料</legend>
                                <div className="item_inp_div">
                            <label htmlFor="userName">Name:</label>
                            <input maxLength="24" type="text" id="userName" value={this.state.userName} onChange={this.handleInput.bind(this,'userName')} />
                            <br />
                        </div>
                                <div className="item_inp_div">
                            <label htmlFor="userEmail">Email Address:</label>
                            <input maxLength="52" type="email" id="userEmail" value={this.state.userEmail} onChange={this.handleInput.bind(this,'userEmail')} />
                            <br />
                        </div>
                                <div className="item_inp_div">
                            <label htmlFor="homeAddress">Address:</label>
                            <input maxLength="56" type="text" id="homeAddress" value={this.state.homeAddress} onChange={this.handleInput.bind(this,'homeAddress')} />
                            <br />
                        </div>
                                <div className="item_inp_div">
                            <label htmlFor="phoneNum">Phone Number:</label>
                            <input maxLength="16" type="tel" id="phoneNum" value={this.state.phoneNum} onChange={this.handleInput.bind(this,'phoneNum')} />
                            <br />
                        </div>
                                <div className="item_inp_div">
                            <label htmlFor="password">Password:</label>
                            <input maxLength="16" type="password" id="password" value={this.state.password} onChange={this.handleInput.bind(this,'password')} />
                            <br />
                        </div>
                                <div className="item_inp_div">
                            <label htmlFor="repassword">Password Again:</label>
                            <input maxLength="16" type="password" id="repassword" value={this.state.repassword} onChange={this.handleInput.bind(this,'repassword')} />
                            <br />
                        </div>
                    </fieldset>
                </div>
                <div className="btn_container">
                    <div className="action_btn_ele">
                        <input type="reset" value="Reset" className="reset_button btn_part" onClick={this.formReset} />
                    </div>
                    <div className="action_btn_ele">
                        <input type="button" value="Submit" className="submit_button btn_part" id="submit_button_only" onClick={this.registHandler} />
                    </div>
                </div>
            </form>
         </div>
         {/**/}
        <MineAlert alertStatus = { this.state.alertStatus } alertTip = { this.state.alertTip } closeAlert = { this.closeAlert }
            />
       </div>
        );
    }
}