import React, { PureComponent } from 'react';
import axios from 'axios';

import MineAlert from '@/components/public/alert/alert';
import MineHeader from '@/components/public/header/header';
// import EjectWindow from '@/components/public/ejectWindow/ejectWindow';

import './index.less';

export default class AlterKwd extends PureComponent {
    // \\\\\\\\\\\\\\\\\\\\\\
    constructor(props) {
        super(props);
        console.log('==== AlterKwd ====');
        console.log(this);
        // 
        this.state = {
            id: localStorage.getItem('userid'),
            oldPass: '',
            newPass: '',
            reNewPass: '',
            alertTip: '',
            alertStatus: false
        }
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    componentDidMount() {
        console.log('AlterKwd Component DID MOUNT...');
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    killingAlertWindow = () => {
        this.setState({
            alertStatus: false
        });
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    sendDataForRevamp = () => {
        var url = "/api/userContro/alterPwd";

        if (this.state.id == null || '' || undefined) {
            this.setState({
                alertTip: '您尚未登录,请重新登录',
                alertStatus: true,
            });
            return;
        }

        // 校验参数
        var checks = this.verifiesParams();
        if (checks.flag) {
            console.info('stop it === ' + checks.info);
            this.setState({
                alertTip: checks.info,
                alertStatus: checks.flag,
            });
            return;
        }

        // 提交新旧密码+id
        axios.post(url, {
                oldPass: this.state.oldPass,
                newPass: this.state.newPass,
                id: this.state.id
            })
            .then(response => {
                console.log(response);
                if (response.data.code === 200) {
                    let sec = 5;

                    this.setState({
                        alertTip: '密码修改成功,请重新登录, ' + sec + ' 秒钟后跳转至登录页',
                        alertStatus: true,
                    });

                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, sec * 1000);
                } else {
                    this.setState({
                        alertTip: response.data.message+',首先排查session',
                        alertStatus: true,
                    });
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    formReset = () => {
        this.setState({
            oldPass: "",
            newPass: "",
            reNewPass: "",
        })
    }

    // \\\\\\\\\\\\\\\\\\\\\\
    verifiesParams = () => {
        var checks = { flag: false, info: '' };
        var { oldPass, newPass, reNewPass } = this.state;
        console.log('old pass== ' + oldPass + ',new pass== ' + newPass + ',retry new pass== ' + reNewPass);
        // 
        if (!oldPass.toString().length || oldPass.toString().length < 3) {
            checks.info = '旧密码未输入或旧密码长度小于3个字符';
            checks.flag = true;
        } else if (!newPass.toString().length || oldPass.toString().length < 3) {
            checks.info = '新密码未输入或新密码长度小于3个字符';
            checks.flag = true;
        } else if (!reNewPass.toString().length || oldPass.toString().length < 3) {
            checks.info = '重复确认的新密码空白或长度小于3个字符,请再次输入';
            checks.flag = true;
        } else if (newPass !== reNewPass) {
            checks.info = '新密码确认有误!';
            checks.flag = true;
        }

        console.log(checks)
        return checks;
    }

    // \\\\\\\\\\\\\\\\\\
    /**
     * [不绑定此函数就无法输入参数]
     * @param  {[type]} type  [description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
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

    // \\\\\\\\\\\\\\\\\\\\\\
    render() {
        var content = <div className="major_container">
        {/**/}
        <MineHeader targetUrl="/profile" targetUrlName="返回个人信息页" />
        {/**/}
        <div className="official_container">
        <div className="mine_container">
            <form className="mine_alt_form">
                <div className="title_div">
                    <b className="form_title">
                        修改密码
                    </b>
                </div>
                <div className="keyword_divs">
                    <div className="kwd_item">
                        <div className="item_for_inp">
                            <label htmlFor="oldPass"> 请输入旧密码 </label>
                        </div>
                        <div className="inp_item">
                            <input type="password" maxLength="16" name="oldPass" className="inputs" value={this.state.oldPass} onChange={this.handleInput.bind(this,'oldPass')} />
                        </div>
                    </div>
                    <div className="kwd_item">
                        <div className="item_for_inp">
                            <label htmlFor="newPass"> 请输入新密码 </label>
                        </div>
                        <div className="inp_item">
                            <input type="password" maxLength="16" name="newPass" className="inputs" value={this.state.newPass} onChange={this.handleInput.bind(this,'newPass')} /></div>
                    </div>
                    <div className="kwd_item">
                        <div className="item_for_inp">
                            <label htmlFor="reNewPass"> 请再次输入新密码 </label>
                        </div>
                        <div className="inp_item">
                            <input type="password" maxLength="16" name="reNewPass" className="inputs" value={this.state.reNewPass} onChange={this.handleInput.bind(this,'reNewPass')} /></div>
                    </div>
                </div>
                <div className="btns_div">
                    <div className="btn_item">
                        <input type="button" className="submitt_btn common_btn" id="btn_committ" onClick={this.sendDataForRevamp} value="提交" />
                    </div>
                    <div className="btn_item">
                        <input type="reset" value="重置" className="common_btn" id="btn_reset" onClick={this.formReset} />
                    </div>
                </div>
            </form>
        	</div>
    		</div>
    		{/**/}
			<MineAlert alertStatus={this.state.alertStatus} alertTip={this.state.alertTip} closeAlert={this.killingAlertWindow} />
        	{/**/}
    		</div>;
        /**/
        return (content);
    }

}