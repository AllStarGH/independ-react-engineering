import React, { Component } from 'react';
import axios from 'axios';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';
import EjectWindow from '@/components/public/ejectWindow/ejectWindow';

import './logining.less';

/**
 * This class describes a logining.
 *
 * @class      Logining (name)
 */
export default class Logining extends Component {
    constructor(props) {
        super(props);
        console.info('Logining Constructor.');
        console.dir(this);
    }

    /**
     * 在组件的更新已经同步到DOM中之后立刻被调用,该方法不会在初始化渲染的时候调用,使用该方法可以在组件更新之后操作DOM元素
     *
     * @param      {<type>}  prevProps  The previous properties
     * @param      {<type>}  prevState  The previous state
     */
    componentDidUpdate(prevProps, prevState) {
        console.info('Logining component did update...');
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    state = {
        account: "",
        password: '',
        /**/
        alertStatus: false,
        alertTip: "",
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

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
     * 关闭弹窗窗口
     */
    shutDownAlert = () => {
        this.setState({
            alertStatus: false,
        });
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    // 提交,登录
    loginEnter = () => {
        let url = '/api/userContro/logining';

        // 校验非空
        let isValidate = this.verifyNotNull();
        if (isValidate) {
            return;
        }

        console.log(this.state.account + ' , ' + this.state.password);

        // 登录成功后,需把用户数据保存至session中
        axios.post(url, { account: this.state.account , password: this.state.password })
        .then(res=>{
            console.dir(res);
            if (res.data.code===200) {
                let u = res.data.data;
                console.info('用户登录成功,即将跳转至首页');
                /**/
                this.setState({
                    alertStatus: true,
                    alertTip: '用户登录成功,即将跳转至首页',
                });
                /**/
                localStorage.setItem('id',u.id);
                localStorage.setItem('userName',u.userName);
                localStorage.setItem('userEmail',u.userEmail);
                localStorage.setItem('phoneNum',u.phoneNum);
                localStorage.setItem('homeAddress',u.homeAddress);
                /**/
                setTimeout(() => {
                    this.props.history.push('/');
                }, 15 * 1000);
            } else {
                console.log(res.data.message);
                /**/
                this.setState({
                    alertStatus: true,
                    alertTip: res.data.message,
                });
            }
        })
        .catch(err=>{
            console.error(err);
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    verifyNotNull = () => {
        let isValidate = false;
        const { account, password } = this.state;
        let alertMsg = "";

        if (!account.toString().length) {
            alertMsg = '请输入邮箱或电话';
            isValidate = true;
        } else if (!password.toString().length) {
            alertMsg = '请输入登录密码';
            isValidate = true;
        }

        this.setState({
            alertStatus: isValidate,
            alertTip: alertMsg,
        });

        console.log('isValidate ===>> ' + isValidate);
        return isValidate;
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    handleInput = (type, event) => {
        console.log('type');
        console.log(type);

        console.log('event');
        console.log(event);

        let value = event.target.value;
        let newState = {};
        newState[type] = value;
        switch (type) {}
        this.setState(newState);
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        var pageContent = <div className="loginin_container">
			<MineHeader targetUrl="/reg" targetUrlName="还没有账户,前往注册" />
			{/**/}
			<div className="loginin_form_div">
				<form className="loginin_form">
					<div className="title_form">
						<legend id="legend_title">用户登录界面</legend>
					</div>
					<div className="inputs_container">
						<div className="item_inputs">
							<input type="text" placeholder="请输入电话或邮箱" maxLength="46" className="inp_tag" value={this.state.account} onChange={this.handleInput.bind(this, 'account')} />
						</div>
						<div className="item_inputs">
							<input type="password" placeholder="请输入密码" maxLength="18" className="inp_tag" value={this.state.password} onChange={this.handleInput.bind(this, 'password')} />
						</div>
					</div>
					<div className="btns_container">
						<div className="item_button">
							<input type="button" value="登录" className="inp_btn" id="submits_enter" onClick={this.loginEnter} />
						</div>
						<div className="item_button">
							<input type="reset" value="重置" className="inp_btn" id="reset_btn" />
						</div>
					</div>
				</form>
			</div>
			{/**/}
			<MineAlert alertStatus={this.state.alertStatus} alertTip={this.state.alertTip} closeAlert={this.shutDownAlert}
			/>
		</div>;
        /**/
        return (pageContent);
    }
}