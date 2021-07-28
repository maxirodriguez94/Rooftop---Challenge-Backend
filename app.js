const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.get('/', function (req, res) {
    res.send('hello')
})

app.listen(process.env.PORT)