const { regsiter } = require('../Controller/Student')

const router = require('express').Router()


router.get('/', (req, res) => {
    res.status(200).send("Hello not qoeld")
})
router.post('/register', regsiter)



module.exports = router