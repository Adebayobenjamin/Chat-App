const jwt = require('jsonwebtoken');
const { connect } = require('../router/authRoutes');
require('dotenv').config();

module.exports.RequiresAuth = (req, res, next) =>{
    const token = req.cookies.DrellConnect;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.status(400).redirect('/')
            }else{
                console.log(decodedToken);
                next();
            }
        })

    }else{
        res.status('400').redirect('/')
    }
}