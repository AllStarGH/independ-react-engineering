import { NEW_POSTS, FETCH_POSTS } from './actionType'

/* reducer之作用:返回新的状态 */

const initialState = {
    items: [],
    item: {},
}

// store会拿之前的状态和action交给reducer,reducer会进行判断,看执行的是哪个action-type,然后返回相应数据
// 然后进入reducer内
export default function(state = initialState, action) {
    console.info('there are posts.reducer')
    console.log(action)
    console.dir(state);

    switch (action.type) {
        case NEW_POSTS:
            return {
                ...state,
                item: action.payload
            }

        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}