const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const refreshtokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    expiryDate: Date
})
refreshtokenSchema.statics.createToken = async function(user) {
    let expiredAt = new Date()
    expiredAt.setSeconds(
        expiredAt.getSeconds() + 86400
    )
    let token = uuidv4()
    let object = new this({
        token: token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    })
    let refreshToken = await object.save()
    return refreshToken.token
}
refreshtokenSchema.statics.verifyexpireToken = (token) => {
    return token.expiryDate.getTime() < new Date().getTime()
}
const RefreshToken = mongoose.model("RefreshToken", refreshtokenSchema)
module.exports = RefreshToken