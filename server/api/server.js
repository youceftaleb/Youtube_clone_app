const express = require('express')
require('dotenv').config()
require('./config/db').connect()


const app = express()

app.listen(8800, () => console.log(`App listening on port ${process.env.PORT}`))