const tokenService = require("../services/token-service");

module.exports = async function(req, res, next) {
    try{

        const { accessToken } = req.cookies;
        if(!accessToken) {
            throw new Error();
        }

        const userData = await tokenService.verifyAccessToken(accessToken);

        if(!userData) {
            throw new Error();
        }

        req.user = userData;

        next();
        console.log(userData)

    }catch (err){
        return res.status(401).json({messsage: 'invalid token'});
    }

}