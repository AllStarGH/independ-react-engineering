React:个人设计之工程
======

---------------------

本项目是以react前端框架和typescript后端框架nest,以及ORM框架typeORM相结合的前后端分离开发项目,主要目的是上手练习react+ts,现已收尾,已实现的功能有:

+ 登录,注册
+ 全部用户以列表形式查看
+ 修改资料
+ 修改密码

*数据库是sqlite3*

---------------------


<i>创建前台工程</i>:

```

	npx create-react-app PROJECT-NAME

```

---------------------

**后端架构**

+ TypeScript
+ Nest.js
+ TypeORM

**前端架构**

+ axios
+ react-router-dom
+ redux
+ redux-thunk
+ prop-types
+ immutable
+ less
+ Material-UI
+ fetch

---------------------

#### Redux

	Redux是一个流行的JavaScript框架，为应用程序提供一个可预测的状态容器。Redux基于简化版本的Flux框架，Flux是Facebook开发的一个框架。在标准的MVC框架中，数据可以在UI组件和存储之间双向流动，而Redux严格限制了数据只能在一个方向上流动。


	在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个action。分发在这里意味着将可执行信息发送到store。当一个store接收到一个action，它将把这个action代理给相关的reducer。reducer是一个纯函数，它可以查看之前的状态，执行一个action并且返回一个新的状态

---------------------


#### immutable

	作用:
	immutable对象是不可直接赋值的对象，它可以有效的避免错误赋值的问题
	
	使用:
	在react中，immutable主要是防止state对象被错误赋值。

---------------------


#### redux-thunk

redux默认的设定是 dispatch 只能接受一个对象参数，函数和promise都是不允许的，redux-thunk中间件就是为了解决这个问题的，源码如下：


``````


function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}


``````

含义就是将 dispatch(action: object): any 签名替换成 dispatch(action: object | function): any，action creator中 dispatch, getState 等方法可以反复调用.

---------------------

#### react-router-dom

react-router:实现了路由的核心功能，而react-router-dom依赖react-router，
而react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能：

+ Link组件，会渲染一个a标签；

+ BrowserRouter组件，使用pushState和popState事件构建路由；

+ HashRouter组件，使用window.location.hash和hashchange事件构建路由。

<i>此外还有 react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。</i>

---------------------


#### fastclick

	FastClick 是一个简单易用的库，它消除了移动端浏览器上的物理点击和触发一个 click 事件之间的 300ms 的延迟。目的就是在不干扰你目前的逻辑的同时，让你的应用感觉不到延迟，反应更加灵敏。

---------------------

#### prop-types

	PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。例如, 需要使用PropTypes.string, 当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。

---------------------

#### 注意事项

	表单设计过程中,提交标签切勿使用button,因为button标签的点击事件,在表单内默认自带action动作,可能会导致强制重新渲染页面,造成麻烦. 提交动作应使用 input:type=button

---------------------