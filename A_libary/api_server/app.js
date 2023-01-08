//创建express对象
const express = require('express')
const app = express()

//配置 cors 中间件
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件:只能解析 x-www-form-urlencodeed
app.use(express.static('../../LayuiMini/'))
app.use(express.urlencoded({ extended: false }))

// 导入配置文件
const config = require('./router_handle/config')

// // 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))


// 响应数据的中间件
// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        this.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
        // res.send({
        //     // 状态
        //     status,
        //     // 状态描述，判断 err 是 错误对象 还是 字符串
        //     message: err instanceof Error ? err.message : err,
        // })
    }
    next()
})

//导入路由模块模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

const dbRouter = require('./router/database')
app.use('/database', dbRouter)

const poisRouter = require('./router/pois')
app.use('/pois', poisRouter)
// app.use('/poi', poisRouter.routes())
// app.use(poisRouter.allowedMethods())

//导入验证规则模块
const joi = require('joi')

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthoredError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
})


app.listen(8080, () => {
    console.log('http://127.0.0.1:8080')
})