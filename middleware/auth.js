const mongo = require('../controllers/dataAccessController')

// Authenticate access to API 
const handleAuth = async (req,res,next) =>{
    //get users
    const users = await mongo.get_users()

    //find target user
    const currentUser = users.filter(user => {if(user.username === req.body.username && user.password === req.body.password) return user})

    if(currentUser.length < 1) return res.sendStatus(401)
    next()
}
module.exports = handleAuth