//注册新用户的处理函数
//导入数据库操作模块
const db = require('../db/index')

//导入 bcryptjs ,对密码进行加密
const bcrypt = require('bcryptjs')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')


exports.regUser = (req, res) => {
    const userinfo = req.body

    //查询用户是否被占用
    const sqlStr = `select * from users where username=?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        //执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, msg: err.message })
            return res.cc()
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, msg: '用户名被占用，请输入其他用户名' })
            return res.cc('用户名被占用，请输入其他用户名')
        }
        //对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sqlStr2 = `insert into users set ?`
        db.query(sqlStr2, { username: userinfo.username, password: userinfo.password, email: userinfo.email }, (err, results) => {
            //执行SQL语句失败
            if (err) {
                // return res.send({ status: 1, msg: err.message })
                return res.cc(err)
            }
            //判断影响行数是否为1
            if (results.affectedRows !== 1) return res.cc('注册用户失败!')
            // return res.send({ status: 1, msg: '注册用户失败' })
            //注册成功
            res.send({ status: 0, msg: '注册用户成功', data: req.body })
            // res.cc('注册用户成功!', 0)
        })
    })
}

exports.loginUser = (req, res) => {
    const userinfo = req.body

    const sql = `select * from users where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // const compareResult = bcrypt.compareSync

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }

        // TODO：登录成功，生成 Token 字符串
        // const user = { ...results[0], password: '', user_pic: '' }
        const user = { ...results[0], password: '', user_pic: '' }

        //导入配置文件
        const config = require('./config')
        //生产token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })

        res.send({
            status: 0,
            msg: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}