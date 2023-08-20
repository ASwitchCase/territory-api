const express = require('express')
const router = express.Router();
const mongo = require('../../controllers/dataAccessController')

router.route('/')
    .post(mongo.load_data)
    .put(mongo.upload_data)

module.exports = router