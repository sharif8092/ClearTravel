// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require("../model/user.model");


// const signup = async (req, res) => {
//     try {
//         const { username, email, password , number } = req.body;
//         const user = await UserModel.findOne({ number });
//         if (user) {
//             return res.status(409)
//                 .json({ message: 'User is already exist, you can login', success: false });
//         }
//         const userModel = new UserModel({ username, email, password , number });
//         userModel.password = await bcrypt.hash(password, 10);
        

        
//         await userModel.save();
//         res.status(201)
//             .json({
//                 message: "Signup successfully",
//                 success: true
//             })
//     } catch (err) {
//         res.status(500)
//             .json({
//                 message: "Internal server errror",
//                 success: false
//             })
//     }
// }


// const login = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { number, password } = await req.body;
//         const user = await UserModel.findOne({ number });
//         console.log("user:",user)
//         const errorMsg = 'Auth failed number or password is wrong';
//         if (!user) {
//             return res.status(403)
//                 .json({ message: errorMsg, success: false });
//         }
        
//         console.log("password",password);
//         console.log("user.password",user.password);
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             console.log("bcrytPassword error")
//             return res.status(403)
//                 .json({ message: errorMsg , success: false });
//         }
//         const jwtToken = await jwt.sign(
//             { number: user.number, _id: user._id },
//             process.env.PASSWORD_SECRET_KEY,
//             { expiresIn: '24h' }
//         )

//         res.status(200)
//             .json({
//                 message: "Login Success",
//                 success: true,
//                 jwtToken,
//                 email,
//                 name: user.name
//             })
//     } catch (err) {
//         res.status(500)
//             .json({
//                 message: "Internal server errror",
//                 success: false
//             })
//     }
// }

// module.exports = {
//     signup,
//     login
// }


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");

// Signup Handler
const signup = async (req, res) => {
    try {
        const { username, email, password, number } = req.body;
        const user = await UserModel.findOne({ number });

        if (user) {
            return res.status(409).json({ message: 'User already exists, please log in', success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,  // store the hashed password
            number
        });
        
        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Error during signup:", err);  // Log the error for debugging
        res.status(500).json({
            message: "Internal server error during signup",
            success: false,
            error: err.message  // Optionally send the error message for easier debugging
        });
    }
}

// Login Handler
const login = async (req, res) => {
    try {
        const { number, password } = req.body;
        const user = await UserModel.findOne({ number });
        console.log(req.body);
        

        if (!user) {
            return res.status(403).json({ message: 'Auth failed: number or password is incorrect', success: false });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: 'Auth failed: number or password is incorrect', success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { number: user.number, _id: user._id },
            process.env.PASSWORD_SECRET_KEY,  // Ensure you are using the correct key
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email: user.email,
            username: user.username
        });
    } catch (err) {
        console.error("Error during login:", err);  // Log the error for debugging
        res.status(500).json({
            message: "Internal server error during login",
            success: false,
            error: err.message  // Optionally send the error message for easier debugging
        });
    }
}

module.exports = {
    signup,
    login
}
