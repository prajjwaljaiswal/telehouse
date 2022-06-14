const otpService = require('../services/otp-service');
const hashService = require('../services/hashService')

class AuthController {
    async sendOtp(req, res) {

        const { phone } = req.body;
        if(!phone) {
            res.status(400).json({message: 'phone field is required !'});
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 2;

        const expires = Date.now() + ttl;

        const data = `${phone}.${otp}.${expires}`;

        const hash = hashService.hashOtp(data);

        // sent otp

        try{
            const resp = await otpService.sendBySms(phone, otp);
            console.log(resp)
            return res.json({
                hash : `${hash}.${expires}`,
                phone : phone 
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({message: `Message sending failed`})
        }
        
        // console.log(hash)

        res.json({hash: hash})
    }
}

module.exports = new AuthController();