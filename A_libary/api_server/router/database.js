const express = require('express')
const router = express.Router()

const poisHandle = require('../router_handle/database')
router.get('/pois', poisHandle.getAllPois)
router.get('/pois2', poisHandle.getAllPois2)
router.get('/users', poisHandle.getAllUsers)
module.exports = router