const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../auth/secret')
const { findBy } = require('../auth/auth-model.js');

const restrict = (req, res, next) => { 
  const token = req.headers.authorization
if(!token) {
   return next({status: 401, message: "Token required"})
} 
jwt.verify(token, JWT_SECRET, (err, token) => {
  if (err) {
    next({status: 401, message: "Token invalid"})
  } else {
    req.decodedToken = token
     next()
  }
})
}



module.exports = {
  restrict
} 