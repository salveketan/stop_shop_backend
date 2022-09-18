const express = require("express");
const cors = require('cors')
const app = express();
var cookieParser = require('cookie-parser')
app.use(cors());
require("./db/config")
require("dotenv").config();
app.use(cookieParser());
app.use(express.json())
const Port = process.env.PORT || 5000

app.use("/", require("./routers/UserRouter"))

app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
})