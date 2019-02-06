const { Router } = require('express')
const router = new Router()
const { toJWT, toData } = require('./jwt')

router.post('/logins', (req, res) => {
  const email = req.body.email
  const psw = req.body.password
  if(!email || !psw){
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  res.send({
    jwt: toJWT({ userId: 1 })
  })
})

module.exports = router