---
title: MySQL数据表结构设计
date: 2020-9-11 11:00 AM
tags:
  - mysql
categories:
  - database
comments: true
thumbnail: '/thumbnails/mysql.jpg'
---

<p class="text-big">mysql</p>
<!-- more -->

## 表结构设计

```sql


CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NULL,
  `phone` varchar(255) NULL,
  `password` varchar(255) NULL,
  `avatar` varchar(255) NULL,
  `email` varchar(255) NULL,
  `region` varchar(255) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', --自动生成
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE --自动更新
  PRIMARY KEY (`id`)
);



CREATE TABLE `post`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NULL,
  `createdAt` datetime NULL,
  `desc` varchar(255) NULL,
  `content` varchar(255) NULL,
  `thumbnails` varchar(255) NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NULL,
  `user_id` int NULL,
  `comment` varchar(255) NULL,
  `createdAt` datetime NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_post_comment_like_relation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL,
  `post_id` int NULL,
  `comment_id` int NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_post_like_relation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL,
  `post_id` int NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `post` ADD CONSTRAINT `post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `user_post_comment_like_relation` ADD CONSTRAINT `user_post_comment_like_relation_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `user_post_comment_like_relation` ADD CONSTRAINT `user_post_comment_like_relation_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);
ALTER TABLE `user_post_comment_like_relation` ADD CONSTRAINT `user_post_comment_like_relation_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);
ALTER TABLE `user_post_like_relation` ADD CONSTRAINT `user_post_like_relation_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `user_post_like_relation` ADD CONSTRAINT `user_post_like_relation_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);


INSERT INTO `user` (name, phone, password ) VALUES ('paul', '18980822098', '123456')
INSERT INTO `post` (user_id, title, desc ) VALUES (1, 'test', '123456')
INSERT INTO `comments` (user_id, post_id, comment ) VALUES (1, 1, '123456')
INSERT INTO `user_post_like_relation` (user_id, post_id, status) VALUES (1, 1, 0) --文字点赞 status 0|1
INSERT INTO `user_post_comment_like_relation` (user_id, post_id, comment_id, status) VALUES (1, 1, 1, 0) --评论点赞 status 0|1
SELECT a.post_id,COUNT(*) as likes FROM user_post_like_relation a LEFT JOIN post b ON b.id = a.post_id WHERE a.status = 1  GROUP BY a.post_id -- 获取文章点赞数
SELECT a.*, b.post_id, COUNT(`status`) as likes FROM post a LEFT JOIN user_post_like_relation b ON a.id = b.post_id AND b.`status` = 1 GROUP BY a.id --合并文章与点赞数

```


## notes
- 外键约束（CONSTRAINT）不能重复
- 外键作用： 保证数据库数据的完整性
- count()语法： 
  - count(*)---包括所有列，返回表中的记录数，相当于统计表的行数，在统计结果的时候，不会忽略列值为NULL的记录。
  - count(1)---忽略所有列，1表示一个固定值，也可以用count(2)、count(3)代替，在统计结果的时候，不会忽略列值为NULL的记录。
  - count(列名)---只包括列名指定列，返回指定列的记录数，在统计结果的时候，会忽略列值为NULL的记录（不包括空字符串和0），即列值为NULL的记录不统计在内。
  - count(distinct 列名)---只包括列名指定列，返回指定列的不同值的记录数，在统计结果的时候，在统计结果的时候，会忽略列值为NULL的记录（不包括空字符串和0），即列值为NULL的记录不统计在内。



### refs
1. [timestamp](https://www.cnblogs.com/acm-bingzi/p/mysql-current-timestamp.html)