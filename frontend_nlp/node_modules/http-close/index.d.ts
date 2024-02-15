import http = require('http')

export = httpClose

declare function httpClose(server: http.Server): void
declare function httpClose(options: httpClose.Options, server: http.Server): void

declare namespace httpClose {
  export interface Options {
    timeout: number
  }
}

