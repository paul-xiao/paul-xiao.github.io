---
title: deploy web app on heroku
date: 2019-08-06 09:42:02
tags:
 - heroku
categories:
 - deploy
thumbnail: '/thumbnails/heroku.jpg'  
---
heroku 部署node app
<!-- more -->
#### get started with nodejs

```bash

# install
npm install -g heroku

# login 
heroku login

# create
heroku create

# push
git push heroku master

# Ensure that at least one instance of the app is running:
heroku ps:scale web=1
heroku ps:scale web=0 # no app running

# vist on broswer
heroku open

# logs
heroku logs --tail

# procfile - to explicitly declare what command should be executed to start your app.
web: node index.js

# run app locally
heroku local web

# push changes

git add .
git commit -m 'commits'
git push heroku master

# bash
heroku run bash


# deploy react apps
touch Procfile
web: npm start

# branch not updating?
git push heroku local_branch_name:master


# clear build cache
heroku config:set NODE_MODULES_CACHE=false
git commit -am 'disable node_modules cache' --allow-empty

# addons
heroku addons:create mongolab # will generate a MONGODB_URI
heroku config #check configs
MONGODB_URI: mongodb://<dbuser>:<dbpassword>@ds259787.mlab.com:59787/heroku_pgd6txgv

# DB config
module.exports = {
    secret:'paultest',
    DB: process.env.MONGODB_URI|| 'mongodb://localhost:27017/test'
}


```