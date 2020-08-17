import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducer';

/*
 *Store 不是类,它只是有几个方法的对象.
 *要创建它，只需要把根部的 reducing 函数 传递给 createStore
 */

/*
createStore(reducer, [preloadedState], enhancer):
创建一个 Redux store 来以存放应用中所有的state,
应用中应有且仅有一个 store
*/

/*state是一个对象，对数据进行储存*/
/*state的任何修改一定是action引起的，在追踪state时，可以查找action.*/

let store = createStore(
    userReducer,
    applyMiddleware(thunk),
)

export default store;