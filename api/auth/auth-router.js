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
 
 
  

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
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
        console.log("inside else")
        res.status(401).json({
          message:'invalid credentials'
        })
      }
  
  })
});
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

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
