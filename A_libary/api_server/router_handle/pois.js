const db = require("../db")

//加密密码
const bcrypt = require('bcryptjs')


exports.updatePoi = (req, res) => {
    const sql = 'update hotel_pois set ? where id=?'
    console.log(req.body, req.user.id)
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改酒店信息失败！')

        res.cc('修改酒店信息成功!', 0)
    })
}


exports.deletePoi = (req, res) => {
    const sql = 'delete from hotel_pois where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除失败')

        // 更新用户头像成功
        return res.cc('删除成功', 0)
    })
    // res.send('ok')
}

exports.addPoi = (req, res) => {
    var poi = req.body
    const sql = `insert into hotel_pois set ?`
    db.query(sql, {name: poi.name, longitude: poi.password, latitude: poi.latitude,address:poi.address,}, (err, results) => {
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加失败')

        // 更新用户头像成功
        return res.cc('添加成功', 0)
    })
    // res.send('ok')
}