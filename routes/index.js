const express = require('express')
const router = express.Router()

const controller = require('../controllers/mainController')
const { catchErrors } = require('../utils/utils')

router.get('/tasks', catchErrors(controller.getTasks))

module.exports = router
