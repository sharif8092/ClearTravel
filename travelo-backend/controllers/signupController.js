// const CryptoJS = require('crypto-js');

// const User = require("../model/user.model");

// const singupHandler = async (req, res) => {
//     try{
//         const newUser = new User({
//             username: req.body.username,
//             number: req.body.number,
//             email: req.body.email,
//             password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString()
//         });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ message: "Error creating a user" })
//     }
// }

// module.exports = singupHandler;

// // import axios from "axios";

// // export const signupHandler = async (username, number, email, password, setAlert) => {
// //   try {
// //     const { data } = await axios.post(
// //       "https://cleartravel.onrender.com/api/auth/register",
// //       {
// //         username: username,
// //         number: number,
// //         email: email,
// //         password: password,
// //       }
// //     );
    
// //     console.log("Signed Up:", data);

// //     // Show success alert with message from backend
// //     setAlert({
// //       open: true,
// //       message: `Account Created:: username - ${username}`,
// //       type: "success"
// //     });

  
    
// //   } catch (err) {
// //     console.log("Error during signup:", err);

// //     // Extract error message from the backend response
// //     const errorMessage = err.response?.data?.message || "Error signing up, please try again";

// //     // Show alert with backend error message
// //     setAlert({
// //       open: true,
// //       message: errorMessage,
// //       type: "error"
// //     });
// //   }
// // };

