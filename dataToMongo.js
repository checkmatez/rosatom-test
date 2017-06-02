const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const fs = require('fs')
const util = require('util')

require('dotenv').config()
mongoose.connect(process.env.MLAB_URL)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(err.message)
})

require('./models/Task')
const Task = mongoose.model('Tasks')

const readFile = util.promisify(fs.readFile)

async function doSmth() {
  // const newTask = new Task({
  //   old_task_id: 123,
  //   name: 'lol',
  //   start: null,
  //   finish: null,
  // })
  // const saved = await newTask.save()
  // console.log(saved)
  // return undefined

  const result = {}
  try {
    const content = await readFile('./График СМР.xer', 'utf-8')
    const array = content.split('\n').map(str => str.split('\t'))
    let currentTableName = ''
    let currentTableShape = []
    array.forEach(row => {
      if (row.length === 0) return
      switch (row[0]) {
        case '%T':
          currentTableName = row[1].trim()
          result[currentTableName] = []
          break
        case '%F':
          currentTableShape = row.slice(1)
          break
        case '%R':
          let rowResult = {}
          for (let i = 1; i < row.length; i++) {
            rowResult[currentTableShape[i - 1]] = row[i]
          }
          result[currentTableName].push(rowResult)
        default:
          break
      }
    })

    const insertArray = result.TASK.map(task => {
      // console.log(task)
      return {
        old_task_id: task.task_id,
        name: task.task_name,
        start: task.act_start_date ? Date.parse(task.act_start_date) : null,
        finish: task.act_end_date ? Date.parse(task.act_end_date) : null,
      }
    })
    // console.log(insertArray.length)
    // insertArray.forEach(async task => {
    //   const newTask = new Task(task)
    //   //console.log(newTask)
    //   const saved = await newTask.save()
    //   console.log(saved)
    // })
    //const res = await Task.create(insertArray)
    const res = await Task.insertMany(insertArray)
    console.log('done!', res.length)
  } catch (error) {
    console.error(error)
    return
  }
}

doSmth()
