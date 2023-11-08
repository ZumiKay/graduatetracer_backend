const jwt = require('jsonwebtoken')
const { user, role } = require('../Model')





isAdmin = (req, res, next) => {
    let token = req.headers['x-access-token']
    const auth = jwt.decode(token)
   
    user.findOne({ email: auth.email }, (err, match) => {
        if (err) {
            return res.status(500).json({ message: err })
            
        }
        if (match) {
            role.findOne({ _id: match.role._id }, (err, role) => {
                if (err) {
                    return res.status(500).json({ message: err })
                    
                }
                if (role.name === 'admin') {
                    next()
                } else {
                    return res.status(500).json({ message: "Restricted Data" })
                    
                }
            })
        }
    })
}
const usermiddleware = {

    isAdmin
}
module.exports = usermiddleware