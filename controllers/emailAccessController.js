require('dotenv').config();
const nodemailer = require('nodemailer');

// email access methods
const sendMail = async (req,res) =>{

    //Configure Mail Structure
    const mail = {
      recever: req.body.recever,
      message: req.body.message
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.G_USER,
        pass: process.env.G_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.G_USER,
      to: mail.recever,
      subject: 'Central English Territory',
      text: mail.message
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send(mail)
    res.end()
  }

  module.exports = {
    sendMail: sendMail,
  }