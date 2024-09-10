const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const path = require("path");
const bodyParser = require('body-parser')
dotenv.config();


const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");
const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHoterRouter = require("./routes/singlehotel.router");
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.route");

const connectDB = require("./config/dbconfig");

const app = express();
// const _dirname = path.dirname("")
// const buildpath = path.join(_dirname,"../travelo-frontend")
// app.use(express.static(buildpath))

app.use(cors({
  origin: "*"
}));
app.use(express.json());

connectDB();
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHoterRouter);
app.use("/api/auth", authRouter);
// app.use("/api/wishlist", wishlistRouter);

app.set("trust proxy", 1)

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server is Up and Running on port ${PORT}`);
  });
});

// Optional: Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broken!');
});


// const crypto = require('crypto');
// const key = crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
// console.log(key);