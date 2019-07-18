require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const bookmarkRouter = require('./bookmark-router')
const errorHandle = require('./error-handler')
const validateBearerToken = require('./validateBearerToken')

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)
app.use(bookmarkRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})
app.use(errorHandle)

module.exports = app