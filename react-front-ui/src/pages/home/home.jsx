import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.less';

import LinksList from '@/components/linkslist/linkslist';

/**
 * This class describes a home.
 *
 * @class      Home (name)
 */
class Home extends Component {
    componentDidMount() {
        console.info('Home component did mount...');
    }

    constructor(props) {
        super(props);
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    state = {
        urls: {
            regURL: '/reg',
            loginURL: '/login',
            picturesProcessURL: '/picturesProcess',
            videoProcessURL: '/videoProcess',
            userListURL: '/userList',
        },
        urlWrapper: {
            storeTraining: {
                text: 'Store Training',
                title: "store训练",
                to: '/store-training'
            },
        }
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <div ref="mineHomePage" className="home_container">
    <header id="the_header" className="clz_header">
        <div id="mine_header_1">
            <div className="mine_header_div2">
                <div className="title_i_div head_div" id="title_header">
                    <i>AllStarGH</i>
                </div>
                <div className="a_header_div mine_a_div head_div">
                    <div className="address_div head_div">
                        <div className="target_a_div mine_header_div mine_header_a_div">
                            <Link to={this.state.urls.loginURL}>登录</Link>
                        </div>
                        <div className="target_a_div mine_header_div mine_header_a_div">
                            {/*<Link to={this.state.urls.regURL}>注册</Link>*/}
                            <Link className="link_offical" to={this.state.urls.regURL} > 注册 </Link>
                        </div>
                        <div className="target_a_div mine_header_div mine_header_a_div">
                            <Link to={this.state.urls.userListURL}>用户列表</Link>
                        </div>
                        <div className="target_a_div mine_header_div mine_header_a_div" id="special_target_div">
                            <Link to={this.state.urls.videoProcessURL}>改名并迁徙bilibili视频</Link>
                        </div>
                        <div className="mine_header_div mine_header_a_div">
                            <Link to={this.state.urls.picturesProcessURL}>图片处理</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </header>
    <main id="mine_main">
        <div className="welcome2" id="welcome_2">
            <h1 id="welcome_h_1">Welcome to My React's Engineering</h1>
        </div>
        {/**/}
        <LinksList urlWrapper={this.state.urlWrapper}></LinksList>
    </main>
    <footer id="mine_footer">
        <div className="footer_div_01">
            Copy Right by @AllStarGH
        </div>
    </footer>
</div>

        )
    }
}

export default Home;