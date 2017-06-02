const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MLAB_URL)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(err.message)
})

require('./models/Task')

const app = require('./app')
app.set('port', process.env.PORT || 7777)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
