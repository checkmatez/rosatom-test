const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

function parseFile(relativePath) {
  return new Promise(async (resolve, reject) => {
    const result = {}
    try {
      const content = await readFile(relativePath, 'utf-8')
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
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

const renderError = (err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
  })
}

module.exports = {
  catchErrors,
  parseFile,
  renderError,
}
