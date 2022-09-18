const mongoose = require("mongoose");
require("dotenv").config();
const Url = process.env.URL
mongoose.connect(Url).then((e) => {
    console.log("DB is connected");
}).catch((e) => {
    console.log("Connection Fail");
})
