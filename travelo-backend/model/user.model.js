const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true // Ensure that each number is unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that each email is unique
        
    },
    password: {
        type: String,
        required: true,
    }
    
},


);



module.exports = mongoose.model("UserModel", userSchema);

