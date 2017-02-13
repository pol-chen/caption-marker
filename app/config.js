'use strict'

const nconf = require('nconf')

nconf.argv().env().file({file: getUserHome() + '/Documents/caption-marker-config.json'})

function saveConfig(settingKey, settingValue) {
  nconf.set(settingKey, settingValue)
  nconf.save()
}

function readConfig(settingKey) {
  nconf.load()
  return nconf.get(settingKey)
}

function hasError(location) {
  nconf.load()
  const errors = nconf.get('errors')
  if (errors.indexOf(location) != -1) {
    return 1
  } else {
    return 0
  }
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

module.exports = {
  saveConfig: saveConfig,
  readConfig: readConfig,
  hasError: hasError
}
