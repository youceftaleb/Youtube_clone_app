const express = require('express')
const app = express()
require('dotenv').config()
const config = require('./config/db')
const apiRoutes = require("./routes");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cookieParser())

app.use("/api", apiRoutes());

app.listen(8800, () => {
    config.connect()
    console.log(`App listening on port ${process.env.PORT}`)
})