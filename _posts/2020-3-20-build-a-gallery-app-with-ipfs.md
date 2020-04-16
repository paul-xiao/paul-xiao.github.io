---
title: Build a photo gallery app with ipfs
date: 2020-3-18 11:06 AM
tags:
  - app
  - ipfs
categories:
  - frontend
comments: true
---

#### todos

- [x] 权限管理
- [ ] 图片上传(ipfs?)
- [ ] 备注
- [ ] 评论
- [ ] 分类(tags/dates)


#### express-session/passport/mongo auth

```sh
# scaffold

├── config
│   ├── index.js
│   └── passport.js
├── controller
│   └── user.js
├── curl.sh
├── index.js
├── model
│   ├── Post.js
│   └── User.js
├── nodemon.json
├── package.json
├── utils
│   └── logger.js
└── yarn.lock

```
**steps for passport auth**
- init express-session
- save session in mongo
- add mongo schema
- init passport
- add LocalStrategy
- passport auth
- update mongo

#### ipfs 原理
#### Init ipfs
1. install 

```sh
# download go-ipfs https://dist.ipfs.io/#go-ipfs
# unzip file
tar xvfz go-ipfs_v0.4.23_linux-amd64.tar.gz

# install

cd go-ipfs/
sudo ./install.sh 

# check

ipfs help

```
2. init ipfs

```sh
# init
$ ipfs init
> initializing IPFS node at /home/paul.xiao/.ipfs
generating 2048-bit RSA keypair...done
peer identity: QmXRTizcrNhUaLYq52hqHCbxykD4rn8Rq5TN9d9PDR4HvB
to get started, enter:

	ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme*

# check pin list

ipfs pin ls --type=all

> QmXgqKTbzdh83pQtKFb19SpMCpDDcKR2ujqk3pKph9aCNF indirect
  QmNU3nhLTUxK96coALJtPi5Cprrr416rr5YgkqKUYRobe9 recursive // 递归

# There are three types of pins in the ipfs world; direct pins, which pin just a single block, and no others in relation to it. recursive pins, which pin a given block and all of its children, and indirect pins, which are the result of a given blocks parent being pinned recursively.

# remove pins
$ ipfs pin rm QmNU3nhLTUxK96coALJtPi5Cprrr416rr5YgkqKUYRobe9
> unpinned QmNU3nhLTUxK96coALJtPi5Cprrr416rr5YgkqKUYRobe9


# gc

ipfs repo gc 

# start a daemon

ipfs daemon

localhost:8080/ipfs/${hash}

# 
# list DAG (see refs [1])
ipfs ls ${hash}

```

#### configs

1. bootstrap list 

> The IPFS bootstrap list is a list of peers with which the IPFS daemon learns about other peers on the network. IPFS comes with a default list of trusted peers, but you are free to modify the list to suit your needs. One popular use for a custom bootstrap list is to create a personal IPFS network.

```sh
# list 

ipfs bootstrap list

# add a new peer to the bootstrap list:

> ipfs bootstrap add /ip4/25.196.147.100/tcp/4001/p2p/QmaMqSwWShsPg2RbredZtoneFjXhim7AQkqbLxib45Lx4S

# remove a node from the bootstrap list:

> ipfs bootstrap rm /ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ

# Let’s say we want to create a backup of our new bootstrap list. We can easily do this by redirecting stdout of ipfs bootstrap list to a file:

> ipfs bootstrap list >save

# If we ever want to start from scratch, we can delete the entire bootstrap list at once:

> ipfs bootstrap rm --all

#With an empty list, we can restore the default bootstrap list:

> ipfs bootstrap add --default

# Remove the entire bootstrap list again, and restore our saved one by piping the contents of the saved file to ipfs bootstrap add:

> ipfs bootstrap rm --all
> cat save | ipfs bootstrap add


```
#### ipfs private network
```sh
# 1. generator swarm key

go get -u github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen

cd ~

./go/bin/ipfs-swarm-key-gen > ~/.ipfs/swarm.key


# 2. update bootstrap node

ipfs bootstrap rm --all # remove all exist node
ipfs config show | grep "PeerID" # peer identity hash of bootnode
hostname -I # ip address of bootnode
ipfs bootstrap add /ip4/<ip address of bootnode>/tcp/4001/ipfs/<peer identity hash of bootnode> # add new node

ipfs boostrap list 

# 3. check speed

ipfs swarm peers  # check connected peers

ipfs get <hash> -o <file_name>

```
#### upload file with ipfs and node js [2]
> based on ipfs-http-client 43.0.1

1. repo gc useage

refs: 

[for await ...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

[AsyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)

[repo gc](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/REPO.md#repogc)

```js
// gc
for await (const res of ipfs.repo.gc()) {
  console.log(res)
}

```





#### ipfs state

文件块 的 5 种 Pin 状态
1. Recursive 状态
文件块树被递归添加到 pin 中，根文件块的状态是 Recursive，非根文件块的状态是 Indirect

2. Direct 状态
只有目标文件块添加到 pin 中, 子孙块不做处理，目标文件块的状态就是 Direct

3. Indirect 状态
文件块树被递归添加到 pin 中，根文件块的状态是 Recursive，非根文件块的状态是 Indirect

4. Internal 状态
ipfs 使用文件块来保存 pinner 状态，这些文件块的状态就是 Internal

5. NotPinned 状态
文件块没有被 pin，在 GC 时会被删除


#### pin/unpin

```sh
# 展示
## 列出所有被 pin 的块
ipfs pin ls
## 列出 pin 为指定状态的块
ipfs pin ls -t direct
ipfs pin ls -t indirect
ipfs pin ls -t recursive

# 增加
## 递归 pin
ipfs pin add QmZ98HahPRKRcfoYoJchZNKzFxSHFWw6WxvQc1hpFEoFca
## 直接 pin(只 pin 指定 hash 的文件块)
ipfs pin add --recursive=false QmZ98HahPRKRcfoYoJchZNKzFxSHFWw6WxvQc1hpFEoFca

# 移除
## 递归从 pin 中移除
ipfs pin rm QmZ98HahPRKRcfoYoJchZNKzFxSHFWw6WxvQc1hpFEoFca
## 直接从 pin 中移除
ipfs pin rm --recursive=false QmZ98HahPRKRcfoYoJchZNKzFxSHFWw6WxvQc1hpFEoFca
```


#### refs
1. [Merkle DAG](https://docs.ipfs.io/guides/concepts/merkle-dag/)
2. [Node app with ipfs](https://steemit.com/utopian-io/@hsynterkr/ipfs-tutorial-2-build-a-nodejs-app-for-ipfs)
3. [IPFS 原理](https://www.jianshu.com/p/3f7cc1ee9ec4)
4. [ipfs private network](https://medium.com/@s_van_laar/deploy-a-private-ipfs-network-on-ubuntu-in-5-steps-5aad95f7261b)
5. [repo gc version issue](https://github.com/ipfs/js-ipfs/issues/2985)
