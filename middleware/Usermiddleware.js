const jwt = require('jsonwebtoken')


export const verifyToken = (req , res , next) => {
    const token = req.headers['x-access-token']
    if(token) {
        jwt.verify(token , process.env.JWT_SECRET , (err , decode) => {
            if(err) {
                return res.status(403).json({message:"Fail to verify user"})
            } else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(500).json({message: "Unauthorized"})
    }
}
export const checkRole = (role) => {
    return (req, res, next) => {
        if(req.user && req.user.role === role) {
            next()

        } else {
            return res.status(403)
        }
    }

}


