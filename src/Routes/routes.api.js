const express = require('express');
const router = express.Router();
const user=require('../Controller/user.controller')

router.get('/get',user.getUser)
router.post('/post',user.setUser)


module.exports=router