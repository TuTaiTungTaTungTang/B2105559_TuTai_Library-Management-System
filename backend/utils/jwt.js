// const jwtConfig = require("@/config/jwt.config");
const jwt = require("jsonwebtoken");
// const secretKey = "c6baac47fa2b21f54adc5987ff982aae6e909d1751fd98b7778ec16daa420fe418f886181d7c5c7403d7054f43e2370e3132d3329a3e0996d031551e40021c30"
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
	sign(payload) {
		return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Cài thời hạn hết hạn cho token
	},
	// decode(token) {
	// 	return jwt.decode(token, secretKey);
	// },
	verify(token) {
		try {
		  return jwt.verify(token, secretKey);
		} catch (error) {
		  return null;
		}
	  },
};