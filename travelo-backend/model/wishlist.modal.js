const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema({
    hotelId: {type:String , required: true}
})

const Wishlist = mongoose.model("wishlist" , wishListSchema);

module.exports = Wishlist;