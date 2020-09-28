---
title: how to use mongoose
date: 2019-08-08 09:24:14
tags:
 - mongoose
categories:
 - database
thumbnail: '/thumbnails/mongo.jpg' 
---
mongoose useages
<!-- more -->
#### Schemas

```js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
var Test = new Schema({
    course_name: {
        type: String
    },
    course_price: {
        type: Number
    }
},{
    timestamps: true,
    collection: 'test'
});

module.exports = mongoose.model('Test', Test);

```

#### three way to get req parameters
> https://i5ting.github.io/node-http/#106

```js

// req.body.xxx 
// has to be post requset
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
})

// req.query.xxx
GET /search?q=tobi+ferret
GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse

// req.params.xxx
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});

```
