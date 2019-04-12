import callback from './ajax/callback';


/**
 *获取用户列表
 */
const UserList = (history, data) => {
    return callback(history, `bank/sysUser/getPage`, 'POST', data )
}
/**
 *添加用户
 */

const UserAdd = (history, data) => {
    return callback(history, `bank/sysUser/add`, 'POST', data);
}

/**
 * 编辑用户
 */

const  UserItem = (history, data) => {
    return callback(history, `bank/sysUser/edit`, 'POST', data)
}

/**
 * 删除用户
 */
const UserDelete = (history, data, ) => {
    return callback(history, `bank/sysUser/delete?userId=${data}`, 'get')
}


export { UserList, UserAdd, UserItem, UserDelete }

