const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const words = authHeader.split(" ")
    const token = words[1]
    const decodedValue = jwt.verify(token, JWT_SECRET)

    if (decodedValue.username) {
        req.username = decodedValue.username
        next()
    } else {
        res.status(403).json({ message: "You are not authenticated!" })
    }

}

module.exports = { authMiddleware }