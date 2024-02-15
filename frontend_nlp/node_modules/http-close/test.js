var test = require('tape')
  , http = require('http')
  , httpClose = require('./')

test('close persistent connection', function(t){
  var server = http.createServer(function (req, res) {
    t.equal(req.headers.connection, 'keep-alive', 'client keep-alive')
    res.end()

    setTimeout(function () {
      t.ok(false, 'The socket should be closed before the timeout')
    }, 1000).unref()
  })

  // Add http-close hook
  httpClose({ timeout: 10 }, server)

  server.listen(function () {
    var port = server.address().port
    var params =
      { port
      , headers:
        { Connection: 'keep-alive'
        }
      }
    var req = http.get(params, function (res) {
      t.equal(res.headers.connection, 'keep-alive', 'server keep-alive')
    })

    setTimeout(function () {
      server.close(function(){
        t.ok(true, 'callback called')
      })
    }, 100)

    process.nextTick(t.end)
  })
})
