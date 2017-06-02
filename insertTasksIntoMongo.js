const mongoose = require('mongoose')
mongoose.Promise = global.Promise

require('dotenv').config()
mongoose.connect(process.env.MLAB_URL)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(err.message)
})

require('./models/Task')
const Task = mongoose.model('Task')

const parseFile = require('./utils/utils').parseFile
;(async () => {
  const data = await parseFile('./График СМР.xer')
  if (!data.TASK) return // Сохраняем только TASK

  // Только 4 поля
  const insertArray = data.TASK.map(task => ({
    old_task_id: task.task_id,
    name: task.task_name,
    start: task.act_start_date ? Date.parse(task.act_start_date) : null,
    finish: task.act_end_date ? Date.parse(task.act_end_date) : null,
  }))
  const res = await Task.insertMany(insertArray)
  console.log(`Inserted ${res.length} Tasks records`)
  mongoose.disconnect()
})()
