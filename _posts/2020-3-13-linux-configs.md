---
title: regular linux configs
date: 2020-3-13 5:26 PM
tags:
- linux
categories:
- OS
comments: true
---

#### change CentOs 7 GUI to Mate-desktop

```bash
# install
$ sudo yum install -y epel-release
$ sudo yum groupinstall -y "MATE Desktop"
$ sudo reboot

# remove(if needed)
$ sudo yum groupremove -y "MATE Desktop"
$ sudo yum autoremove -y

# switch mate themes
1.  download themes here: https://mate-desktop.org/themes/
2.  put download file at : ~/.themes
3.  then you can find it in : System/Preference/Look and Feel/Apperance/theme
4.  download icons here: https://www.mate-look.org/s/Mate/browse/cat/132/ord/rating/
5.  put download file at : ~/.local/share/icons
6.  then go to : System/Preference/Look and Feel/Apperance/theme, click customize
7.  select icons

```

#### vpn server config

```sh
# 禁止root用户远程登录

sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

service sshd restart

# 开机启用/禁用防火墙
systemctl enable/disable firewalld.service

# 配置 firewalld-cmd

firewall-cmd --zone=public --add-port=80/tcp --permanent 
firewall-cmd --reload
firewall-cmd --zone=public --list-ports

firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.196.131" port protocol="tcp" port="8088" accept"
# 允许192.168.1.10所有访问所有端口
firewall-cmd --zone=public --add-rich-rule 'rule family="ipv4" source address="192.168.196.131" accept' --permanent

# [CentOS 7 firewall防火墙屏蔽除指定IP外的所有IP](https://www.openos.org/post/340/)
```

#### certificate 

```
restorecon -v -R /etc/nginx

```

### Nginx

- sudo systemctl start nginx
- root directory :usr/share/nginx/html
- sudo ./nginx -t