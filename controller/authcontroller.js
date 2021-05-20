const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 3*60*60*24;
const CreateToken = (username)=>{
    return jwt.sign({username}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

// control chat login
module.exports.chatLoginPost = (req, res) =>{
    const username = req.body.username;
  try {
    const token = CreateToken(username);
    res.cookie('DrellConnect', token, {httpOnly: true, maxAge: maxAge*1000 });

    res.status(200).json({user_status: "logged in"})
    
  } catch (err) {
      console.log(err.message)
  }
}

module.exports.chatroomGet = (req, res) =>{
    const token = req.cookies.DrellConnect;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
        if(err){
            console.log(err.message)
        }
        console.log(decodedToken.username)
        res.render('chat', {username: decodedToken.username})
    })
}
module.exports.chatroomLeave = (req, res) =>{
    res.cookie("DrellConnect", null, {
        httpOnly: true, maxAge: 1
    });
    res.status(200).json({user_staus: "logged out"})
}