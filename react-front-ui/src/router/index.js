import React, { lazy, Component, Suspense } from 'react';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';

/*路由表*/
const Home = lazy(() => import('@/pages/home/home.jsx')); // 首页

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
                        <Redirect exact from = "/" to = {Home} />
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}