'use strict'
const BPromise = require('bluebird')
const Https = require('https')
var HMac = require('crypto').createHmac
const HostName = 'www.coinspot.com.au';
const Path = '/api/v2/ro/my/balances';

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

  var nonce = new Date().getTime();

  var postdata = {}
  postdata.nonce = nonce;
  var stringmessage = JSON.stringify(postdata);
  var signedMessage = new HMac('sha512', data.API_SECRET);
  signedMessage.update(stringmessage);
  var sign = signedMessage.digest('hex');

  const options = {
    rejectUnauthorized: false,
    hostname: HostName,
    port: 443,
    path: Path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'sign': sign,
      'key': data.API_KEY
    }
  };

  let returnData = '';

  const req = Https.request(options, res => {
    console.log(`statusCode : ${res.statusCode}`);
    res.on('data', d => {
      process.stdout.write(d)
      returnData = d;
    })
  });

  req.on('error', error => {
    console.error(error)
  })

  req.write(stringmessage)
  req.end()

  return BPromise.resolve(returnData)
}
