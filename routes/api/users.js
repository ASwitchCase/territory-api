const express = require('express')
const router = express.Router()
const {MongoClient} = require('mongodb');
require('dotenv').config();

import UsersController from '../../controllers/usersController';
import UsersRepository from '../../data/usersRepository';
import Mongo from '../../data/mongo';

// TODO, consider replacing with DI framework
// this is demonstrating inversion of control, which makes unit testing easier, and it's also easier to replace implementation details
// example, if you switched from mongo DB to something else, you wouldn't have to rewrite all your code, just what gets passed into your constructor
// dependency injection frameworks make this easier, as you codify the concrete implementations to each dependency in one place
// and then they are constructed automatically without having to type all this in each time
const users = new UsersController(
    new UsersRepository(
        new Mongo(
            new MongoClient(process.env.URI), 'users')));

// TODO split up base routes to more logic groupings... this should be under /users
// GET /users would return all users. Rather than returning an array, you'd want to return an object https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html
//      Consider: { data: [{},{}...], count:100....} 
//          an added advantage of ^ is that you can expand metadata easily to add more details, such as if you start paging
router.route('/')
    .get(async(req,res) =>{        
        let data = await users.get_users()
        res.send({users:data})
    })

module.exports = router