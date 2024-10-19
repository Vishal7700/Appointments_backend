const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(`${process.env.MONGO_URI}/appointments`)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error(error.message));

module.exports = mongoose.connection; 
