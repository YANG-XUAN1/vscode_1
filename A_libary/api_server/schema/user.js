//导入验证规则
const joi = require('joi')
//定义验证规则
const username = joi.string().alphanum().min(3).max(12).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const email = joi.string().pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).required()

//定义验证规则对象
exports.reg_reguser_schema = {
    body: {
        username,
        password,
        email
    },
}

exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()

exports.update_userinfo_schema = {
    body: {
        id,
        username,
        password,
        email
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

//定义头像验证规则
const avatar = joi.string().dataUri().required()
exports.update_avatar_schema = {
    body: {
        avatar,
    },
}

exports.delete_user_schema = {
    body: {
        id,
    },
}


const longitude = joi.number().integer().min(1).required()
const latitude = joi.number().integer().min(1).required()
const name = joi.string().alphanum().required()
const address = joi.string().alphanum().required()

exports.add_poi_schema = {
    body: {
        longitude,
        latitude,
        name,
        address
    },
}
exports.delete_poi_schema = {
    body: {
        id
    },
}
exports.edit_poi_schema = {
    body: {
        id,
        longitude,
        latitude,
        name,
        address
    },
}