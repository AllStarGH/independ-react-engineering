import * as user from './actionType';

/*reducer是一个函数，用于通过action对state进行更新*/

let defaultState = {
    userInfo: {}
}

/**
 * 用户消息
 */
export default (state = defaultState, action = {}) => {
    console.info('<<=== store.reducer ===>>');
    console.dir(action);
    console.dir(state);

    switch (action.type) {
        case user.SAVE_USERINFO:
            return { ...state, userInfo: action.userInfo }

        case user.SAVE_ATTR_INFO:
            return { ...state,
                ...{
                    [action.dataType]: action.value
                }
            };

        case user.MODIFY_USERINFO:
            return { ...state, userInfo: { ...state.userInfo, [action.key]: action.value } };

        default:
            return state;
    }
}