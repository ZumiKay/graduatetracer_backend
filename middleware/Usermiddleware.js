const jwt = require('jsonwebtoken')
const { user, role } = require('../Model')





isAdmin = (req, res, next) => {
    let token = req.headers['x-access-token']
    user.findOne({ token: token }, (err, match) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (match) {
            role.findOne({ _id: match.role._id }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                if (role.name === 'admin') {
                    next()
                } else {
                    res.status(500).send({ message: "Restricted Data" })
                    return
                }
            })
        }
    })
}
const usermiddleware = {

    isAdmin
}
module.exports = usermiddleware