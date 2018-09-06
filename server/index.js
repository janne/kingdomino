import http from 'http'
import getBoard from './getBoard'
import getPoints from './getPoints'
import isValid from './isValid'

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!\n')
  })
  .listen(3001, 'localhost')

console.log('Server running at http://localhost:3001/')
