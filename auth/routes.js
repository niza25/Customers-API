const { Router } = require('express')
const router = new Router()
const { toJWT, toData } = require('./jwt')
const jwt = require('jsonwebtoken')

router.post('/logins', (req, res, next) => {
  const email = req.body.email;
  const psw = req.body.password;
  if(!email && !psw){
    return res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  return res.send({
    jwt: toJWT({ userId: 1 })
  })
})

module.exports = router