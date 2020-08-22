import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import postReducer from './posts/reducer';

/*
 combineReducers 辅助函数的作用是,把一个由多个不同 reducer 函数作为 value 的 object,合并成一个最终的 reducer 函数,然后就可以对这个 reducer 调用 createStore.
合并后的 reducer 可以调用各个子 reducer,并把它们的结果合并成一个 state 对象.state 对象的结构由传入的多个 reducer 的 key 决定.
 */

/*
 *Store不是类,它只是有几个方法的对象.
 *要创建它,只需要把根部的 reducer 函数 传递给 createStore
 */

/*
createStore(reducer, [preloadedState], enhancer):
创建一个 Redux store 来以存放应用中所有的state,
应用中应有且仅有一个 store
*/

/*state是一个对象,对数据进行储存*/
/*state的任何修改一定是action引起的,在追踪state时,可以查找action.*/

// let store = createStore(
//     userReducer,
//     applyMiddleware(thunk),
// )

//redux的combineReducers()可以方便的将redux的reducer拆分为各个小的reducer文件,统一调用各个子reducer,方便统一管理
let store = createStore(
    combineReducers({ userReducer, ...postReducer }),
    applyMiddleware(thunk)
);

export default store;