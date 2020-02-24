---
title: gitlab-ci VS circle-ci
date: 2019-07-25 17:24:46
author: paul
tags:
 - gitlab
 - circle-ci
categories:
 - CI
 - Docker
---

# GitLab CI VS Circle CI


-----
## GitLab CI

> *for me i'm use linux, so just tested on linux locally*

<!-- more -->
####  1 .gitlab-ci.yml config

```yml
  image: node:latest
  stages:
    - production
    
  production:
    type: deploy
    tags:
      - test
      - test1
    stage: production
    image: ruby:latest
    script:
      - apt-get update -qy
      - apt-get install -y ruby-dev
      - gem install dpl
      - dpl --provider=heroku --app=heroku_node_restful_api --api-key=$HEROKU_API_KEY
    only:
      - master
```

#### 2 install gitlab-runner

```sh
# get yum pakage
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash # sudo -s pwd

sudo yum install gitlab-runner

# register runner / register info is in setteing/CI/Runners
sudo gitlab-runner register 

# run local gitlab-runner
sudo gitlab-runner run  # more opts like : start | status | stop
```
now we are able to see the runner in setteing/CI/Runners
> *Note: tags is needed by default, you can choose to not use tags by edit the runner*


#### 3 runner manage

```sh

# check all runners
sudo gitlab-runner list
# unregister runner by name
sudo gitlab-runner unregister --name test


```

---------------
**let's end it here for now, Why need a runner ? Circle-CI seems not need, let dig into it, we'll see**


## Circle-CI






