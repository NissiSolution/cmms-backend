const express = require('express');
const router = express.Router();
const user=require('../Controller/user.controller')
const emp=require('../Controller/employee.controller')
router.get('/get',user.getUser)
router.post('/post',user.setUser)
//employee
router.get('/emp/get',emp.getEmp)
router.post('/emp/post',emp.setEmp)

module.exports=router