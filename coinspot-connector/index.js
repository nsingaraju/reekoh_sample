'use strict'
const BPromise = require('bluebird')

let _helper
let _config

exports.pluginInit = (helper, config) => {
  _helper = helper
  _config = config

  /**
   * Example code:
   * _config.username = 'user'
   * _config.password = 'password'
   * return BPromise.resolve()
  **/

  return BPromise.resolve()
}

exports.processData = (data) => {
  /**
   * Example code:
   * let result = 0
   * result = data.num1 + data.num2
   * return BPromise.resolve(result)
   */

  return BPromise.resolve()
}
