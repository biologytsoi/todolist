'use strict'

var getRawBody = require('raw-body');
const r = require('./todo.js')

exports.handler = (req, resp, context) => {
  resp.setHeader('content-type', 'application/json')
  var uri = (req.url).split('/')
  if (uri.length == 0) {
    resp.send(JSON.stringify({ 'code': 400, 'body': 'URL bad request' }))
  } else {
    var route = uri[uri.length - 1]
    switch (req.method) {
      case 'GET':
        resp.send(JSON.stringify(r.get(route)))
        break
      case 'POST':
        getRawBody(req, (err, body) => {
          resp.send(JSON.stringify(r.post(route, body.toString())))
        })
        break
      case 'PUT':
        resp.send(JSON.stringify(r.put(route)))
        break
      case 'DELETE':
        resp.send(JSON.stringify(r.delete(route)))
        break
      default:
        resp.send(JSON.stringify({ 'code': 400, 'body': 'Index bad requset' }))
    }
  }
}