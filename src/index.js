const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const sass = require('node-sass-middleware');
const SetAsyncExtension = require('nunjucks-setasync');
const rateLimit = require('express-rate-limit');

const assetPath = path.resolve(__dirname, '../assets');

// Help prevent simple DDoS
// This should be done on every application at KAABiL regardless of how much traffic we get
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

const baseUrl = '/';
const port = 3000;

const app = express();

let nunEnv = nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app
});

nunEnv.addExtension('SetAsyncExtension', new SetAsyncExtension());

app.use(baseUrl + 'scss', sass({
    /* Options */
    src: path.join(__dirname, 'scss'),
    includePaths: ['scss', 'views'],
    dest: path.join(__dirname, '/../public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// Pages
app.get(baseUrl, (req, res) => {
  res.render(__dirname + '/views/pages/home/home.njk');
});

app.listen(port, () => {
  console.log('Backend started on port ' + port);
});
