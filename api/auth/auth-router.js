const router = require('express').Router();
const {JWT_SECRET} = require('./secret')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('./auth-model');


const validateCreds = (req, res, next) => {
let user = req.body
if (!user.username || !user.password) {
  res.status(400).json({
    message: "username and password required"
  })
} else {
  next()
}
}

const validateUsername = (req, res, next) => {
  User.getUsername(req.body.username)
  .then(data => {
    if (data) {
      next({status:400, message: "username taken"})
    } else {
      next()
    }
  })
  .catch(next)
}





router.post('/register', validateUsername, validateCreds,  (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8) //2^8
 User.add({ username, password: hash })
 .then(newUser => {
   res.status(201).json(newUser)
 })
 .catch(next)
 
 
  

  
});

router.post('/login',  validateCreds, (req, res) => {
  const {username, password} = req.body
  User.findBy({username})
  .then(user =>{
      if(user && bcrypt.compareSync(password, user.password))
      {
        const token = buildToken(user)
        res.status(200).json({
          message:`welcome, ${user.username}`,
          token
        })
      }
      else
      {
        res.status(401).json({
          message:'invalid credentials'
        })
      }
  
  })
});
  

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
};

module.exports = router;
