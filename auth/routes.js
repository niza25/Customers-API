const { Router } = require('express')
const router = new Router()
const { toJWT, toData } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require ('../users/model')

router.post('/logins', (req, res) => {
  const email = req.body.email
  const psw = req.body.password
  if (!email || !psw) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    // 1. find user based on email address
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
    /* res.send({
      jwt: toJWT({ userId: 1 })
    }) */
  }
})

// secret-endpoint
router.get('/secret-endpoint', (req, res) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      res.send({
        message: 'Thanks for visiting the secret endpoint.',
        data
      })
    }
    catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

module.exports = router