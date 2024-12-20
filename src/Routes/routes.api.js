const express = require('express');
const router = express.Router();
const user=require('../Controller/user.controller')
const emp=require('../Controller/employee.controller')
const work=require('../Controller/workorder.controller')
router.get('/get',user.getUser)
router.post('/post',user.setUser)
//employee
router.get('/emp/get',emp.getEmp)
router.post('/emp/post',emp.setEmp)

//work

router.get('/work',work.getWorkOrders)
router.post('/work',work.addWorkOrder)

module.exports=router