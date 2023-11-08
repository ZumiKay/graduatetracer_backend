const { updateForm, deleteForm, createAnswer, createForm, getAnswerset, getForm } = require('../Controller/FromController')
const { regsiter, getstudent, deletestudent, updatestudent } = require('../Controller/Student')
const { registerAdmin, AdminLogin, logout, refreshtoken } = require('../Controller/user')
const usermiddleware = require('../middleware/Usermiddleware')


const router = require('express').Router()


router.get('/', (req, res) => {
    res.status(200).send("Hello not qoeld")
})
router.post('/register', [usermiddleware.isAdmin], regsiter)
router.post('/adminregister', registerAdmin)
router.post('/login', AdminLogin)
router.post('/logout', logout)
router.get('/getstudent', [usermiddleware.isAdmin], getstudent)
router.put('/updatestudent', [usermiddleware.isAdmin], updatestudent)
router.delete('/deletestudent', [usermiddleware.isAdmin], deletestudent)
    //Form
router.post('/createForm', [usermiddleware.isAdmin], createForm)
router.put('/updateform', [usermiddleware.isAdmin], updateForm)
router.delete('/deleteform', [usermiddleware.isAdmin], deleteForm)
router.post('/createAnswer', createAnswer)
router.get("/getanswer/:formid", [usermiddleware.isAdmin], getAnswerset)
router.get("/getform", getForm)


module.exports = router