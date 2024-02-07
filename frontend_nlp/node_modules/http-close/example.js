
var http = require('http')
  , httpClose = require('./')
  , assert = require('assert')

var server = http.createServer(function (req, res) {
  setTimeout(function () {
    assert(false, 'The socket should be closed before the timeout')
  }, 1000).unref()
})

// Add http-close hook
httpClose({ timeout: 10 }, server)


server.listen(function () {
  var port = server.address().port
  var req = http.get({port: port}, function (res) {
    assert.equal(res.statusCode, 500)
  })

  setTimeout(function () {
    server.close()
  }, 100)
})
