const mongoose = require('mongoose')
const Task = mongoose.model('Task')

const getTasks = async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
}

module.exports = {
  getTasks,
}
