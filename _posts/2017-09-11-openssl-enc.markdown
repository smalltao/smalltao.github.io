---
layout: post
title:  "openssl enc 使用"
subtitle:   "使用openssl 对文件进行加密"
author:     "LiTao"
date:   2017-09-11 12:02:33 +0800
categories: linux
catalog:    true
tags:
    - liux
---

## 对消息进行加密和解密

使用`Base64`加密、解密

加密
```
$ echo "this is a test" | openssl enc -base64
$ dGhpcyBpcyBhIHRlc3QK
```

解密
```
$ echo "dGhpcyBpcyBhIHRlc3QK" | openssl enc -base64 -d
$ this is a test
```

使用`AES`加密、解密 `-a` 基于 `ASCII`文本 `-d` 解密

加密
```
$ echo "test" | openssl enc -aes-256-cbc -a
$ U2FsdGVkX1+xr/JzOQ8JodqznjjCvbJvIpcKD2hE7/M=
```

解密
```
$ echo "U2FsdGVkX1+xr/JzOQ8JodqznjjCvbJvIpcKD2hE7/M=" | openssl enc -aes-256-cbc -d -a
$ test
```

## 对文件进行加密和解密

加密
```
$ echo "test" | openssl enc -aes-256-cbc > openssl.dat
$ openssl.dat
```

解密
```
$ $ openssl enc -aes-256-cbc -in openssl.dat -out seopenssl.dat
$ openssl.dat
```

## 对目录进行加密和解密

加密
```
$ tar cz shell | openssl enc -aes-256-cbc -out shell.tar.gz.dat
```

解密
```
$ openssl enc -aes-256-cbc -d -in shell.tar.gz.dat | tar xz
```








