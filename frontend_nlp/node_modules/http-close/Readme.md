# http-close

http-close keeps track on open sockets and closes them gracefully when the
tcp server is closeing.

When you call `server.close()` this moudule will:

- Destroy all sockets without a corresponding http response (keep-alive)
- Send `Connection: close` to http requests where the headers is not sent
- Set the socket timeout to the value you specify. Default 5 seconds.

When a socket timeouts after the server is closed, this module will respond
with a 500 status code and end the connection where the headers is not sent.
All other sockets will be destroyed.


## Usage

```js
var http = require('http')
  , httpClose = require('http-close')

var server = http.createServer()

// Add http-close hook
httpClose({ timeout: 2000 }, server)

// Just call server.close as usual when you want to stop the server
server.close()
```

## Install

    $ npm install http-close

## License

MIT
