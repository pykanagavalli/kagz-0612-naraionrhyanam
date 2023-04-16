var express=require('express');
var router=express.Router();
var websiteController=require('../controllers/website');

router.post('/insertWebsite',websiteController.insertWebsite);
router.get('/getAllWebsites',websiteController.getAllWebsites);

module.exports = router;
