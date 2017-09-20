---
layout: post
title:  "pyspider使用"
subtitle:   "python网页爬虫"
author:     "LiTao"
date:   2017-09-15 17:35:35 +0800
categories: python
catalog:    true
tags:
    - python
---

## 1 快速入门

ubuntu 需要预安装
```
apt-get install python python-dev python-distribute python-pip libcurl4-openssl-dev libxml2-dev libxslt1-dev python-lxml
```

需要调用`js`解析框架

1. 安装 [`phantomjs`](http://phantomjs.org/build.html) 应用
2. 添加环境变量

安装
```
pip install pyspider
```

启动环境
```
# pyspider
```

***pyspider 命令默认以all模式运行所有组件***

启动后浏览器访问：http://localhost:5000/访问

编写脚本
```
from pyspider.libs.base_handler import *


class Handler(BaseHandler):
    crawl_config = {
    }

    @every(minutes=24 * 60)
    def on_start(self):
        self.crawl('http://scrapy.org/', callback=self.index_page)

    @config(age=10 * 24 * 60 * 60)
    def index_page(self, response):
        for each in response.doc('a[href^="http"]').items():
            self.crawl(each.attr.href, callback=self.detail_page)

    @config(priority=2)
    def detail_page(self, response):
        return {
            "url": response.url,
            "title": response.doc('title').text(),
        }
```

`def on_start(self)` 脚本入口点，当点击`dashboard`上的`run`按钮时触发

## 错误汇总
1. Could not run curl-config: [Errno 2] No such file or directory
```
ubuntu
sudo apt-get install libcurl4-openssl-dev
centos
yum install libcurl-devel
```
2. error: command 'gcc' failed with exit status 1
```
yum install python-devel
```
3. fatal error: libxml/xmlversion.h: No such file or directory
```
yum install libxslt-devel libxml2-devel
```
4. error minimum required version of libxml2 is 2.7.0
```
编译安装 libxml2 和 libxslt
```
5. error "Need libcurl version 7.19.0 or greater to compile pycurl."
```
源码安装 curl
```
6. ImportError: libcurl.so.4: cannot open shared object file: No such file or directory
```
vim /etc/ld.so.conf
增加
/usr/local/lib
/usr/lib
/lib
sudo ldconfig
```

7. ImportError: No module named _sqlite3
```
yum install sqite-devel 重新编译python
```

8. 运行pyspider命令时报错
```
libcurl link-time ssl backend (nss) is different from compile-time ssl backend (none/other)
pip uninstall pycurl
export PYCURL_SSL_LIBRARY=[nss|openssl|ssl|gnutls]
pip install pycurl --no-cache-dir
```







