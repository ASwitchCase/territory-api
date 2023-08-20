require('dotenv').config();
const express = require('express')
const cors = require('cors');
const handleAuth = require('./middleware/auth');
const app = express()
const PORT = process.env.PORT || 3500
const {logger} = require('./middleware/logEvents')

app.use(cors())
app.use(express.json())
app.use('/cards',express.static(__dirname + '/public/images/TerritoryCards'))

app.get('/',(req,res) =>{
    res.send('welcome!')
})



//auth with username and password in body of req
app.use(handleAuth)
app.use(logger)

// Service Routes
app.use('/sendmail',require("./routes/emailSender"))
// API Routes
app.use('/territories',require('./routes/api/territories'))
app.use('/users',require('./routes/api/users'))


app.listen(PORT, () => console.log(`listening at port: ${PORT}`))