const express = require('express')
const router = express.Router()

// 导入用户信息的处理函数模块
const poi_handler = require('../router_handle/pois.js')

const expressJoi = require('@escook/express-joi')

const { add_poi_schema, edit_poi_schema, delete_poi_schema } = require('../schema/user')


//更新酒店信息
router.post('/updatePoi', expressJoi(edit_poi_schema), poi_handler.updatePoi)

//删除酒店信息
router.post('/deletePoi', expressJoi(delete_poi_schema), poi_handler.deletePoi)

//添加酒店信息
router.post('/addPoi', expressJoi(add_poi_schema), poi_handler.addPoi)

module.exports = router