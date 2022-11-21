const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).send({ message: "You are not logged in" });
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        // ! second method
        // jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        //     if (err) return res.status(403).send({ message: 'Token is not valid' })
        //     req.user = user;
        // });
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;