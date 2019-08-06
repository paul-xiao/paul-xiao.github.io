---
title: deploy web app on heroku
date: 2019-08-06 09:42:02
tags:
---


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

```