const express = require('express')
const router = express.Router()

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handle/userinfo')

const expressJoi = require('@escook/express-joi')

const { update_userinfo_schema, update_password_schema, update_avatar_schema,delete_user_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserinfo)

//更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserinfo)

//修改密码
router.post('/updatepwb', expressJoi(update_password_schema), userinfo_handler.updatePassword)

//修改头像框
router.post('/updateAvatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

//删除用户信息
router.post('/deleteUser', expressJoi(delete_user_schema), userinfo_handler.deleteUser)

//添加用户信息
router.post('/addUser', expressJoi(delete_user_schema), userinfo_handler.addUser)

module.exports = router
