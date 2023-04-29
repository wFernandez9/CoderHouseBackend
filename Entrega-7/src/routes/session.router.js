const { Router } = require('express')
const { rawListeners } = require('../models/cart.model')

const router = Router()

router.get('/', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.sessionID.counter = 1
        res.send('Bienvenido')
    }
})

module.exports = router