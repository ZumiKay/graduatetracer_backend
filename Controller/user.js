import { refreshToken, role } from "../Model"
import User from "../Model/user.model"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const refreshtoken = []

const randompassword = (length) => {
    let result = ''
    const character = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * character.length))
    }
    return result
}


export const registerAdmin = async (req, res) => {
    const { email } = req.body
    const salt = await bcrypt.genSalt(10)
    const password = randompassword(10)
    const hashedpassword = bcrypt.hashSync(password, salt)
    const user = new User({
        email: email,
        password: hashedpassword
    })
    user.save((err, users) => {
        if (err) {
            res.status(500).json({ message: err })
            return
        } else {
            role.find({ name: 'admin' }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err })
                }
                if (roles) {
                    
                    users.role = roles.map((role) => role._id)
                    

                    users.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.status(200).json({ message: "User registered" , password: password})
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
        return res.status(500).json({ message: "User Not Existed" })
        
    } else {
        bcrypt.compare(password, user.password, async(err, match) => {
            if (err) {
               return res.status(500).json({ message: err })
                
            }
            if (!match) {
               return res.status(500).json({ message: "Wrong Credential" })
                
            } else {
                const accesstoken = jwt.sign({id : user._id , role: user.role.name , email: user.email} , process.env.JWT_SECRET , {expiresIn: '7d'})
                const refreshToken = jwt.sign({id : user._id , role: user.role.name ,email: user.email} , process.env.JWT_SECRET , {expiresIn: '14d'})
                refreshtoken.push(refreshToken)
                
                res.status(200).json({
                    accessToken: accesstoken,
                    refreshToken: refreshToken,
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
export const refresh_Token = (req , res) => {
    const {refreshToken} = req.body
    if(!refreshtoken.includes(refreshToken)) {
        return res.status(401).send({message:"Ivalid Request"})
    } else {
        jwt.verify(refreshToken , jwtconfig.secret , (err , decode) => {
            if (err) return res.status(401).send("Invalid Request Token")
            const accessToken = jwt.sign({id:  decode.id}, jwtconfig.secret , {expireIn:'10m'})
            return res.status(200).json({accessToken})
        })
    }
}
export const logout = (req, res) => {
   const {refreshToken} = req.body
   refreshtoken.filter((token) => token != refreshToken)
   return res.status(200).json({ message: "Logged Out" })
}