import React, { lazy, Component, Suspense } from 'react';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';

/*路由表*/
const Home = lazy(() => import('@/pages/home/home')); // 首页
const Regist = lazy(() => import('@/pages/regist/regist'));

const Posts = lazy(() => import('@/components/postpage/posts'));
const PostForm = lazy(() => import('@/components/postpage/postForm'));
// 登录页面
const Logining = lazy(() => import('@/pages/logining/logining'));

const UsersList = lazy(() => import('@/pages/userslist/usersList'));

/**
 * This class describes my router.
 *
 * @class      MyRouter (name)
 */
export default class MyRouter extends Component {
    constructor(props) {
        super(props);
        console.dir(this)
    }

    componentDidMount() {
        console.log('MyRouter component did mount')
    }

    // \\\\\\\\\\\\\\\\\\

    /**
     * 这里用 redirect 进行首页自动跳转到 /home 路由下,
     * exact 意味着精确匹配,
     * 当为 / 时才跳转 /home,
     * 不是包含 / 就跳转到 /home
     *
     * Renders the object.
     *
     * @return     {<type>}  { description_of_the_return_value }
     */
    render() {
        return (
            <HashRouter>
                <Suspense fallback={<div>Loading...</div>} maxDuration={1000}>
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/login" component={Logining} />

                        <Route exact path="/reg" component={Regist} />

                        <Route exact path="/posts" component={Posts} />

                        <Route exact path="/postForm" component={PostForm} />

                        <Route exact path="/usersList" component={UsersList} />

                        <Redirect exact from = "/" to = {Home} />
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}