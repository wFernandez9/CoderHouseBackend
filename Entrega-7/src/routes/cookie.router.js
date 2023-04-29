const { Router } = require('express')

const router = Router();

router.get('/set', (req, res) => {
    res.cookie('Cookie', 'Valor cookie', { maxAge: 10000 }).send('Cookie seteada')
})

router.get('/get', (req, res) => {
    res.send(req.cookies)
})

//con firma
router.get('/setSigned', (req, res) => {
    res.cookie('SignedCookie', 'Valor cookie', { maxAge: 10000, signed: true }).send('Cookie seteada')
})

router.get('/getSigned', (req, res) => {
    res.send(req.signedCookies)
})

router.get('/delete', (req, res) => {
    res.clearCookie('Cookie').send('Cookie removed')
})


module.exports = router;
