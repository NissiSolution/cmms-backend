    const express = require('express');
    const router = express.Router();
    const user=require('../Controller/user.controller')
    const emp=require('../Controller/employee.controller')
    const work=require('../Controller/workorder.controller')
    const vendor=require('../Controller/vendor.controller')
    const multer = require('multer');
    const remark=require('../Controller/remarks.controller')
    const role=require('../Controller/roles.controller')
    const locations=require('../Controller/location.controller')
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
    router.put('/pass/:id',user.updatePassword)
    router.put('/users/:id',user.updateUserProfile)
    //employee
    router.get('/emp/get',emp.getEmp)
    router.post('/emp/post',emp.setEmp)
    router.put('/emp/:id',emp.setEmp)
    router.post('/emp/atd',emp.markAttendance)
    router.get('/emp/atd/get',emp.getatd)
    //work

    router.get('/work/get',work.getWorkOrders)
    router.post('/work/post',work.addWorkOrder)
    router.put('/work/update',work.updateWorkOrder)
//assets

    router.get('/assets/get', assets.getAssets);
    router.post('/assets/post', upload.single('thumbnail'), assets.addAsset);
    router.put('/assets/update/:id',upload.single('thumbnail'),assets.editAsset)
    router.delete('/assets/delete/:id',assets.deleteAsset)
    router.get('/assets/get/:id',assets.getAssetById)
//vendor
   router.get('/vendors/get',vendor.getVendors)
   router.post('/vendors/post',vendor.addVendor)
   router.delete('/vendors/dlt/:id',vendor.deleteVendor)


   router.post('/remark',remark.addRemarks)
   router.get('/remark/get',remark.getRemarks)
   router.delete('/remark/:id',remark.deleteRemark)


   //roles
   router.post('/roles/post',role.addRole)
   router.get('/roles',role.getRoles)
   router.delete('/roles/:id',role.deleteRole)


   router.get('/location', locations.getLocations);
router.post('/location/post', locations.addLocation);
router.put('/locations/:id', locations.updateLocation);
router.delete('/locations/dlt/:id', locations.deleteLocation);

    module.exports=router