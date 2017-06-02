const express = require('express')
const path = require('path')

const routes = require('./routes')
const utils = require('./utils/utils')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)
app.use(utils.renderError)

module.exports = app
