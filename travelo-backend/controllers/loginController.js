
// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const User = require('../model/user.model');

// const loginHandler = async (req, res) => {
//     try {
//         // Find user by mobile number
//         const user = await User.findOne({ number: req.body.number });
        
//         // If user doesn't exist, return an error for incorrect mobile number
//         if (!user) {
//             return res.status(401).json({ message: "Incorrect Mobile Number" });
//         }

//         // Decrypt stored password to compare with the input
//         const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        
//         // If password is incorrect, return an error for incorrect password
//         if (decodedPassword !== req.body.password) {
//             return res.status(401).json({ message: "Incorrect Password" });
//         }

//         // Generate JWT access token
//         const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

//         // Exclude password from user object before sending the response
//         const { password, ...rest } = user._doc;

//         // Return user details and the access token
//         res.status(200).json({ ...rest, accessToken });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Login failed due to server error" });
//     }
// };

// module.exports = loginHandler;
