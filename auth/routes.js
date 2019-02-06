const { Router } = require('express')
const router = new Router()

router.post('/logins', (req, res, next) =>{
  if(!req.body){
    return res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  return res.send({
    jwt: toJWT({ userId: 1 })
  })
})

module.exports = router