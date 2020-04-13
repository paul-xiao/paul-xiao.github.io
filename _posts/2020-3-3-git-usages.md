---
title: Git Usages
date: 2020-3-3 10:17
tags:
- git
categories:
- frontend
comments: true
---

#### [How to update GitHub forked repository](https://blog.csdn.net/king4ant/article/details/7407424)

git remote add upstream git://github.com/whoever/whatever.git


#### git delete branch

```sh
## remote
git push origin --delete branch_name

# local

git branch -D branch_name

# reset
git reset --hard commit

git push -f origin branch
```
