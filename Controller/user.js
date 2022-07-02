import { refreshToken, role } from "../Model"
import User from "../Model/user.model"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



export const registerAdmin = (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    console.log(password)
    const hashedpassword = bcrypt.hashSync(password, salt)
    const user = new User({
        email: email,
        password: hashedpassword
    })
    user.save((err, users) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        } else {
            role.find({ name: 'admin' }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err })
                }
                if (roles) {
                    let token = jwt.sign({
                        data: user._id,

                    }, process.env.JWT_SECRET, { expiresIn: 3600 })
                    users.role = roles.map((role) => role._id)
                    users.token = token

                    users.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).send({ message: "User registered" })
                    })
                }
            })
        }

    })
}
export const AdminLogin = async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate('role', "-__v").exec()
    if (!user) {
        res.status(500).send({ message: "User with " + email + " Not Existed" })
        return
    } else {
        bcrypt.compare(password, user.password, async(err, match) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (!match) {
                res.status(500).send({ message: "Incorrect Password" })
                return
            } else {

                req.session.token = user.token
                    // let RefreshToken = await refreshToken.createToken(user)
                res.status(200).json({
                    accessToken: user.token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role.name.toUpperCase()
                    }
                })
            }
        })

    }

}
export const logout = (req, res) => {
    req.session = null
    res.status(200).send({ message: "Logged Out" })
}