    const express = require('express');
    const router = express.Router();
    const user=require('../Controller/user.controller')
    const emp=require('../Controller/employee.controller')
    const work=require('../Controller/workorder.controller')
    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/'); // Ensure this path exists
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    const fileFilter = (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type!'), false);
        }
    };

    const upload = multer({
        storage,
        limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
        fileFilter,
    });

    const assets=require('../Controller/assets.controller')
    router.get('/get',user.getUser)
    router.post('/post',user.setUser)
    //employee
    router.get('/emp/get',emp.getEmp)
    router.post('/emp/post',emp.setEmp)
    router.put('/emp/:id',emp.setEmp)
    router.post('/emp/atd',emp.markAttendance)
    router.get('/emp/atd/get',emp.getatd)
    //work

    router.get('/work/get',work.getWorkOrders)
    router.post('/work/post',work.addWorkOrder)
//assets

    router.get('/assets/get', assets.getAssets);
    router.post('/assets/post', upload.single('thumbnail'), assets.addAsset);
    router.put('/assets/update/:id',upload.single('thumbnail'),assets.editAsset)
    router.delete('/assets/delete/:id',assets.deleteAsset)

    module.exports=router