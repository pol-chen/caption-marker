'use strict'

const fs = require('fs')

const logPath = getUserHome() + '/Documents/caption-marker-log.txt'

function append(content) {
  const time = new Date
  const log = `[${time}] ${content}\n`
  fs.appendFile(logPath, log, 'utf8', (err) => {
    if (err) throw err
    console.log('Apppended', content)
  })
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

module.exports = {
  append: append
}
