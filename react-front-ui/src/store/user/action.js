import * as user from './actionType';

/*action简单的说就是一种描述行为的数据结构*/

//保存用户数据
export const saveUserInfo = (userInfo) => {
    console.info(userInfo);
    return {
        type: user.SAVE_USERINFO,
        userInfo
    }
}

//更改用户信息
export const modifyUserInfo = (key, value) => {
    console.info(key);
    console.info(value);
    return {
        type: user.MODIFY_USERINFO,
        key,
        value
    }
}