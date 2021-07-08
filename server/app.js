const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const apiRouter = require('./routes/api.js')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client')))

var expressSession = require('express-session');
app.use(expressSession({secret: 'your secret', saveUninitialized: true, resave: false}));

app.use('/api/', apiRouter)

module.exports = app
