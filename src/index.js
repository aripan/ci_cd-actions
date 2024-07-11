var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.json({ message: 'hello world' })
})

app.get('/about', function (req, res) {
  res.json({ status: 200, message: 'About Us' })
})

app.get('/contact', function (req, res) {
  res.json({ status: 200, message: 'Contact Us' })
})

app.get('/services', function (req, res) {
  res.json({ status: 200, message: 'Our Services' })
})

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

module.exports = { app, server }