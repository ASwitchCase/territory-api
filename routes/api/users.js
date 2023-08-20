const express = require('express')
const router = express.Router()
const mongo = require('../../controllers/dataAccessController')

router.route('/')
    .get(async(req,res) =>{
        let data = await mongo.get_users()
        res.send({users:data})
    })

module.exports = router