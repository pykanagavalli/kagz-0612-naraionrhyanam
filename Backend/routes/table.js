var express = require('express');
var router = express.Router();
var tableController=require('../controllers/table')


router.post('/insertTable',tableController.insertTable);
router.post('/updateTable',tableController.updateTable);

module.exports = router;
