/* global describe, it, before, after */
'use strict'

require('dotenv').config()
const BPromise = require('bluebird')
const jsonFile = require('jsonfile')
const should = require('should')

global.Promise = BPromise

const plugin = require('../index')
const config = jsonFile.readFileSync('./config/env.json')
const rpdkPath = process.env.RPDK_PATH
const Rpdk = require(`${rpdkPath}/lib/rpdk.js`)

describe('Plugin Local Test', () => {
  before('Initialize Test', (done) => {
    const _rpdk = new Rpdk('./', config)
    plugin.pluginInit(_rpdk.helper, config.pluginConfig).then(() => done())
  })

  after('Terminate Test', (done) => {
    done()
  })

  describe('#Receive Data', () => {
    it('Should execute function', function (done) {
      const data = { name: 'Test Plugin' }
      should.equal(data.name, 'Test Plugin', 'Names do not match')
      done()
    })
  })
})
