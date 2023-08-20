const express = require("express")
const router = express.Router()
const myMailer = require('../controllers/emailAccessController')

router.route('/')
    .post(myMailer.sendMail)

module.exports = router