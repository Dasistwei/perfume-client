var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require('fs')
let engine = require("ejs-locals");
require('dotenv').config({path: './config.env'});

var app = express();


app.engine("ejs", engine);
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("product", {
    CLIENT_URL: process.env.CLIENT_URL,
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    CLIENT_URL: process.env.CLIENT_URL,
  });
});

app.get('/js/product.js', (req, res) =>{
  fs.readFile('./src/js/product.js', (err, data)=>{
    if (err) {
      throw err
    } else {
      const jsCode = data.toString().replace('{{SERVER_URL}}', process.env.SERVER_URL);
      res.setHeader('Content-Type', 'text/javascript');
      res.end(jsCode)      
    }
  })
})
app.get('/js/admin.js', (req, res) =>{
  fs.readFile('./src/js/admin.js', (err, data)=>{
    if (err) {
      throw err
    } else {
      const jsCode = data.toString().replace('{{SERVER_URL}}', process.env.SERVER_URL);
      res.setHeader('Content-Type', 'text/javascript');
      res.end(jsCode)      
    }
  })
})

// app.use(express.static('./src/images'))
app.use(express.static('src'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
