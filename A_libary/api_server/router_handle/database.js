const db = require('../db')

exports.getAllPois = (req, res) => {

    const sql = 'select * from hotel_pois'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        // if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            msg: '获取数据基本信息成功！',
            total: results.length,
            data: results,
        })

    })
}

exports.getAllPois2 = (req, res) => {

    const sql = 'select * from hotel'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        // if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            msg: '获取数据基本信息成功！',
            total: results.length,
            data: results,
        })

    })
}

exports.getAllUsers = (req, res) => {

    const sql = 'select * from users'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        // if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            msg: '获取用户基本信息成功！',
            total: results.length,
            data: results,
        })

    })
}