const otpService = require('../services/otp-service');
const hashService = require('../services/hashService');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service')

class AuthController {
    async sendOtp(req, res) {

        const { phone } = req.body;
        console.log(req.body);
        if(!phone) {
            return res.status(400).json({message: 'phone field is required !'});
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 2;

        const expires = Date.now() + ttl;

        const data = `${phone}.${otp}.${expires}`;

        const hash = hashService.hashOtp(data);

        // sent otp

        // try{
        //     const resp = await otpService.sendBySms(phone, otp);
        //     // console.log(resp)
        //     return res.json({
        //         hash : `${hash}.${expires}`,
        //         phone : phone 
        //     })
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json({message: `Message sending failed`})
        // }
        
        console.log(otp);

        return res.json({hash:  `${hash}.${expires}`, phone : phone, otp: otp })
    }


       async verifyOtp(req, res){
        const {otp, hash, phone} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({message: 'All fields are required !'});
        }

        const [hashedOtp, expires] = hash.split('.');

        if(Date.now > +expires) {
            res.status(400).json({message: 'otp expired !'})
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data)

        if(!isValid) {
            return res.status(400).json({message: 'invalid otp'})
        }

        let user;
        // let accessToken;
        // let refreshToken;

        try {
           user = await userService.findUser({phone: phone});

           if(!user){
               const user = await userService.createUser({
                    phone: phone
                });
           }

        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Db error'})
        }

        // generate jwt Token

        const { accessToken, refreshToken } = tokenService.generateTokens({id: user._id, activated: false});

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true
        });

        res.json({accessToken})

    }
}

module.exports = new AuthController();