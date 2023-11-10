const { updateForm, deleteForm, createAnswer, createForm, getAnswerset, getForm, sendform } = require('../Controller/FromController')
const { regsiter, getstudent, deletestudent, updatestudent } = require('../Controller/Student')
const { registerAdmin, AdminLogin, logout } = require('../Controller/user')
const { verifyToken, checkRole } = require('../middleware/Usermiddleware')



const router = require('express').Router()


router.get('/', (req, res) => {
    res.status(200).send("Hello not qoeld")
})
router.post('/register', verifyToken, checkRole("admin"), regsiter)
router.post('/adminregister', registerAdmin)
router.post('/login', AdminLogin)
router.post('/logout', logout)
router.get('/getstudent', verifyToken, checkRole("admin"), getstudent)
router.put('/updatestudent', verifyToken, checkRole("admin"), updatestudent)
router.delete('/deletestudent', verifyToken, checkRole("admin"), deletestudent)
    //Form
router.post('/createForm', verifyToken, checkRole("admin"), createForm)
router.put('/updateform', verifyToken, checkRole("admin"), updateForm)
router.delete('/deleteform', verifyToken, checkRole("admin"), deleteForm)
router.post('/createAnswer', createAnswer)
router.get("/getanswer/:formid", verifyToken, checkRole("admin"), getAnswerset)
router.get("/getform", getForm)
router.post("/sendform" , verifyToken, checkRole("admin") ,sendform)


module.exports = router