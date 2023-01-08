const express = require('express')
const router = express.Router()

//// 导入用户路由处理函数模块
const userHandle = require('../router_handle/user')

//导入验证数据中间件
const expressJoi = require('@escook/express-joi')
//导入验证规则对象
const { reg_reguser_schema, reg_login_schema } = require('../schema/user')

router.post('/reguser', expressJoi(reg_reguser_schema), userHandle.regUser)

router.post('/login', expressJoi(reg_login_schema), userHandle.loginUser)

module.exports = router
