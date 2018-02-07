'use strict';

const express = require('express');
const mcache = require('memory-cache');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

let cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get('/', cache(10), (req, res) => res.sendFile('index.html', {root: './public'}));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));