import React, { Component } from 'react';
import axios from 'axios';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';
import EjectWindow from '@/components/public/ejectWindow/ejectWindow';

import './profile.less';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        console.info('Profile Constructor...');
        console.dir(this);

        this.state = {
            id: localStorage.getItem('userid'),
            userName: '',
            phoneNum: '',
            homeAddress: '',
            userEmail: '',
            /**/
            alertStatus: false,
            alertTip: '',
        }
    }

    componentDidMount() {
        let userid = this.state.id;

        console.log('Profile Component DID MOUNT...');
        console.log(this.props);
        console.log('line-33-user.id === ' + userid);

        if (userid != null) {
            console.info('Already logged in');
            // 获取用户资料
            this.getUserProfile(userid);
        } else {
            this.setState({
                alertStatus: true,
                alertTip: '您尚未登录,请先登录.',
            });
        }
    }

    // \\\\\\\\\\\\\\\\\\

    /**
     * 关闭弹窗窗口
     */
    shutDownAlert = () => {
        this.setState({
            alertStatus: false,
        });
    }

    /**
     * { 打开弹窗 }
     */
    opens = () => {
        EjectWindow.opened({
            alertTip: this.state.alertTip,
            closedAlert: () => {
                console.log('弹窗准备关闭');
            }
        })
    }

    /**
     * 检验输入的表单参数
     *
     * @return     {(boolean|string)}  { description_of_the_return_value }
     */
    verifyNotNull = () => {
        let isValidate = false;
        let alertInfo = "";

        const { userName, userEmail, homeAddress, phoneNum } = this.state;

        if (!userName.toString().length) {
            isValidate = true;

        } else if (!userEmail.toString().length) {
            isValidate = true;

        } else if (!homeAddress.toString().length) {
            isValidate = true;

        } else if (!phoneNum.toString().length) {
            isValidate = true;

        }

        console.log('isValidate === ' + isValidate);
        return isValidate;
    }

    /**
     * 获取用户的资料据地址参数ID
     * @param  {[type]} uid [description]
     * @return {[type]}     [description]
     */
    getUserProfile = (uid) => {
        let url = '/api/userContro/getUserByUserid';
        console.log('参数ID==' + uid);

        axios.get(url, {
                params: {
                    userid: uid
                }
            })
            .then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    let udata = res.data.data;
                    this.setState({
                        id: udata.id,
                        userName: udata.userName,
                        phoneNum: udata.phoneNum,
                        homeAddress: udata.homeAddress,
                        userEmail: udata.userEmail,
                    })
                } else {
                    console.error('line-128-发生了未知错误...');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    // \\\\\\\\\\\\\\\\\\
    handleInput = (type, event) => {
        console.log('type');
        console.log(type);

        console.log('event');
        console.log(event);

        let value = event.target.value;
        let latestState = {};
        latestState[type] = value;
        switch (type) {}
        this.setState(latestState);
    }

    // \\\\\\\\\\\\\\\\\\
    /**
     * 点击修改资料
     * @return {[type]} [description]
     */
    clickedAlterData = () => {
        let f = this.refs.mineForm;

        // 移除input标签disabled属性
        let inpUser = f.getElementsByClassName('inp_user');
        console.log(inpUser);
        for (var i = inpUser.length - 1; i >= 0; i--) {
            inpUser[i].disabled = false;
        }

        // 显示 提交修改+取消修改 按钮
        var altering = f.getElementsByClassName('altering');
        console.log(altering);
        for (var n = altering.length - 1; n >= 0; n--) {
            altering[n].style.display = 'block';
        }

        // 隐藏 修改资料 按钮
        var alterProfile = f.getElementsByClassName('div_alter_pro');
        console.dir(alterProfile);
        alterProfile[0].style.display = 'none';

    }

    /**
     * 取消修改操作
     * 点击取消修改,恢复原状(隐藏取消+提交按钮,显示修改按钮,输入框变为不可输入)
     * @return {[type]} [description]
     */
    cancelAlterFun = () => {
        let userid = this.state.id;
        let f = this.refs.mineForm;

        // 给input标签增加disabled="disabled"属性(setAttribute)
        var inputObj = f.getElementsByClassName('inp_user');
        console.log(inputObj);
        for (var i = inputObj.length - 1; i >= 0; i--) {
            inputObj[i].disabled = true;
        }

        // 隐藏 提交修改+取消修改 按钮
        var altering = f.getElementsByClassName('altering');
        console.log(altering);
        for (var n = altering.length - 1; n >= 0; n--) {
            altering[n].style.display = 'none';
        }

        // 显示 修改资料 按钮
        var alterProfile = f.getElementsByClassName('div_alter_pro');
        console.dir(alterProfile);
        alterProfile[0].style.display = 'block';
        alterProfile[0].style.left = '42%';
        alterProfile[0].style.position = 'relative';

        // 重新加载信息
        if (userid != null || '') {
            this.getUserProfile(userid);
        }
    }

    // 提交修改后的资料
    submitData = () => {
        var nowTime = new Date().getTime();
        let url = '/api/userContro/revampUserInfo2';
        let userParam = {};

        // 校验非空
        let isValidate = this.verifyNotNull();
        if (isValidate) {
            this.setState({
                alertTip: '参数检验未通过,请检查输入的信息,是否符合规范或有空白',
                alertStatus: true
            })
            return;
        }

        userParam.userEmail = this.state.userEmail;
        userParam.userName = this.state.userName;
        userParam.id = this.state.id;
        userParam.homeAddress = this.state.homeAddress;
        userParam.phoneNum = this.state.phoneNum;
        console.info('line-238-修改后的资料:', userParam);

        axios.post(url, userParam).then(res => {
            console.log(res);
            if (res.data.code === 200) {
                let data = res.data.data;

                /* keep it for an hour */
                localStorage.setItem('userid', data.id, nowTime + 1000 * 10 * 360);

                this.setState({
                    alertTip: '修改资料成功',
                    userName: data.userName,
                    phoneNum: data.phoneNum,
                    homeAddress: data.homeAddress,
                    userEmail: data.userEmail,
                });

                // localStorage.setItem('userName', data.userName);
                // localStorage.setItem('userEmail', data.userEmail);
                // localStorage.setItem('phoneNum', data.phoneNum);
                // localStorage.setItem('homeAddress', data.homeAddress);

                this.opens();
            } else {
                this.setState({
                    alertTip: res.data.message,
                    alertStatus: true,
                });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    // \\\\\\\\\\\\\\\\\\
    render() {
        var content = <div className="mine_profile_container">
        {/**/}
        <MineHeader targetUrl="/alterPassword" targetUrlName="修改密码" />
        {/**/}
        <div className="profile_container">
            <form className="mine_form" ref="mineForm">
                <div className="title_div">
                    <legend className="title_word">我的个人资料</legend>
                </div>
                <div className="profile_items_content">
                    {/**/}
                    <div className="lab_div_comment">
                        <label htmlFor="userName">用户名称</label>
                    </div>
                    <div className="profile_item">
                        <input type="text" value={this.state.userName} className="inp_user" maxLength="52" disabled="disabled" onChange={this.handleInput.bind(this, 'userName')} />
                    </div>
                    {/**/}
                    <div className="lab_div_comment">
                        <label htmlFor="userEmail">用户邮箱</label>
                    </div>
                    <div className="profile_item">
                        <input type="text" value={this.state.userEmail} className="inp_user" maxLength="72" disabled="disabled" onChange={this.handleInput.bind(this, 'userEmail')} />
                    </div>
                    {/**/}
                    <div className="lab_div_comment">
                        <label htmlFor="phoneNum">用户电话</label>
                    </div>
                    <div className="profile_item">
                        <input type="text" value={this.state.phoneNum} className="inp_user" maxLength="48" disabled="disabled" onChange={this.handleInput.bind(this, 'phoneNum')} />
                    </div>
                    {/**/}
                    <div className="lab_div_comment">
                        <label htmlFor="homeAddress">用户住址</label>
                    </div>
                    <div className="profile_item">
                        <input type="text" value={this.state.homeAddress} className="inp_user" maxLength="80" disabled="disabled" onChange={this.handleInput.bind(this, 'homeAddress')} />
                    </div>
                </div>
                <div className="btns">
                    <div className="btn_item">
                        <input type="button" value="修改资料" id="alter_profile" className="alter_btn div_alter_pro" onClick={this.clickedAlterData} />
                    </div>
                    <div className="both_manual">
                        <div className="btn_item manual_btn">
                            <input type="button" value="取消修改" id="cancel_alter" className="alter_btn altering" onClick={this.cancelAlterFun} />
                        </div>
                        <div className="btn_item manual_btn">
                            <input type="button" value="提交修改" id="submit_alter" className="alter_btn altering" onClick={this.submitData} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        {/**/}
        <MineAlert alertStatus={this.state.alertStatus} alertTip={this.state.alertTip} closeAlert={this.shutDownAlert}
            />
        </div>;
        /**/
        return (content);
    }
}