const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const taskSchema = new mongoose.Schema({
  old_task_id: {
    type: Number,
  },
  name: {
    type: String,
    trim: true,
  },
  start: {
    type: Date,
  },
  finish: {
    type: Date,
  },
})

module.exports = mongoose.model('Task', taskSchema)
