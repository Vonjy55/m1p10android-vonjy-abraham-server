const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkJwt =
    function(req, res, next) {
        //Get the jwt token from the head
        let token = req.headers["authorization"];

        if (!token) {
            return res.status(401).send({
                status: "Error",
                message: "no token"
            })
        }
        token = token.replace("Bearer ", "");

        let jwtPayLoad;
        //Try to validate the token and get data
        try {
            jwtPayLoad = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.jwtPayLoad = jwt.decode(token);
        } catch (error) {
            res.status(401).send({
                status: "Error",
                message: "no token"
            })
            console.error(error)
        }


        //The token is valid for 1 hour
        //We want to send a new token on every request
        // const { userId, username } = jwtPayload;
        // const newToken = jwt.sign({ userId, username }, process.env.JWT_TOKEN_SECRET, {
        //     expiresIn: "1h",
        // });
        // res.setHeader("token", newToken);

        next();
    }


module.exports = checkJwt;