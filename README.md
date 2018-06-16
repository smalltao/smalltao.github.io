# [LiTao Blog](http://smalltao.github.io)

### 使用 jekyll

jekyll 需要 ruby 环境，所以需要先安装

1. 安装 jekyll 环境：sudo gem install jekyll bundler
2. 更新 jekyll： gem update jekyll
3. 更新依赖的包：gem update github-pages

### 使用 bundle 执行 `bundle exec jekyll server`

如果 bundle 没有安装，使用 bundle install 安装

1. `gem update jekyll` # 更新jekyll
2. `gem update github-pages` #更新依赖的包
3. `bundle update`

使用 package.json 中定义的 scripts 脚本，使用方法

```
npm run xxxxx

npm run watch 相当于 node grunt watch --verbose & npm run preview & bundle exec jekyll serve -w --host localhost 

```

参考文档：[using jekyll with pages](https://help.github.com/articles/using-jekyll-with-pages/) & [Upgrading from 2.x to 3.x](http://jekyllrb.com/docs/upgrading/2-to-3/) & [jekyll.com.cn](http://jekyll.com.cn/docs/frontmatter/)

## 说明文档

* 开始
	* [环境要求](#environment)
	* [开始](#get-started)
	* [写一篇博文](#write-posts)
* 组件
	* [侧边栏](#sidebar)
	* [迷你关于我](#mini-about-me)
	* [推荐标签](#featured-tags)
	* [好友链接](#friends)
	* [HTML5 演示文档布局](#keynote-layout)
* 评论与 Google/Baidu Analytics
	* [评论](#comment)
	* [网站分析](#analytics)
* 高级部分
	* [自定义](#customization)
	* [标题底图](#header-image)
	* [搜索展示标题-头文件](#seo-title)

#### Environment

使用 `jekyll`

1. 安装 `jekyll`
2. 输入 `jekyll serve` 预览
3. 输入 `jekyll serve --watch` 边修改边自动运行修改后的文件

使用[`bundler`](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll) 实时预览

#### Get Started

修改 `_config.yml`文件来描述站点信息

```
# Site settings
title: Li Tao             # 你的博客网站标题
SEOTitle: Li Tao			# 在后面会详细谈到
description: "Cool Blog"    # 随便说点，描述一下

# SNS settings      
github_username: smalltao     # github账号
weibo_username: smalltao      # 微博账号，底部链接会自动更新的。

# Build settings
# paginate: 10              # 一页放几篇文章
```

其他配置：[jekyll - Official Site](http://jekyllrb.com/) [Jekyll中文](http://jekyllcn.com/)

#### write-posts

文章目录：`_posts/`

yaml 头文件长这样:

```
---
layout:     post
title:      "Hello 2015"
subtitle:   "Hello World, Hello Blog"
date:       2015-01-29 12:00:00
author:     "LiTao"
header-img: "img/post-bg-2015.jpg"
tags:
    - Life
---

```

#### SideBar

1. 修改 `_config.yml`文件的`Sidebar settings`

```
# Sidebar settings
sidebar: true  #添加侧边栏
sidebar-about-description: "简单的描述一下你自己"
sidebar-avatar: /img/avatar-hux.jpg     #大头贴，请使用绝对地址.
```

侧边栏是响应式布局的，当屏幕尺寸小于992px的时候，侧边栏就会移动到底部。具体请见bootstrap栅格系统 <http://v3.bootcss.com/css/>


#### Mini About Me

Mini-About-Me 这个模块将在你的头像下面，展示你所有的社交账号。这个也是响应式布局，当屏幕变小时候，会将其移动到页面底部，只不过会稍微有点小变化，具体请看代码。

#### Featured Tags

看到这个网站 [Medium](http://medium.com) 的推荐标签非常的炫酷，所以我将他加了进来。
这个模块现在是独立的，可以呈现在所有页面，包括主页和发表的每一篇文章标题的头上。

```
# Featured Tags
featured-tags: true  
featured-condition-size: 1     # A tag will be featured if the size of it is more than this condition value
```

注意：`featured-condition-size`: 如果一个标签的 SIZE，也就是使用该标签的文章数大于上面设定的条件值，这个标签就会在首页上被推荐。

内部有一个条件模板 `{% if tag[1].size > {{site.featured-condition-size}} %}` 是用来做筛选过滤的。


#### Friends

好友链接部分，这会在全部页面显示。

修改  `_config.yml`文件里面的`Friends`

```
# Friends
friends: [
    {
        title: "Foo Blog",
        href: "http://foo.github.io/"
    },
    {
        title: "Bar Blog",
        href: "http://bar.github.io"
    }
]
```


#### Keynote Layout

HTML5幻灯片的排版：

![](http://huangxuan.me/img/blog-keynote.jpg)

`html` 中使用幻灯片,相关js：Reveal.js, Impress.js, Slides, Prezi

其主要原理：添加一个 `iframe`，在里面加入外部链接

```
---
layout:     keynote
iframe:     "http://huangxuan.me/js-module-7day/"
---
```

iframe在不同的设备中，将会自动的调整大小。保留内边距是为了让手机用户可以向下滑动，以及添加更多的内容。


#### Comment

评论系统

1. 多说[Duoshuo](http://duoshuo.com)评论系统  
2. [Disqus](http://disqus.com)评论系统  

修改`yaml`头文件

```
duoshuo_username: 的用户名_
# 或者
disqus_username: 的用户名_
```

#### Analytics

网站分析，现在支持百度统计和Google Analytics。需要去官方网站注册一下，然后将返回的code贴在下面：

```
# Baidu Analytics
ba_track_id: 4cc1f2d8f3067386cc5cdb626a202900

# Google Analytics
ga_track_id: 'UA-49627206-1'            # 你用Google账号去注册一个就会给你一个这样的id
ga_domain: xxxxx			# 默认的是 auto, 这里我是自定义了的域名，你如果没有自己的域名，需要改成auto。
```

#### Customization

自定义模板

1. 使用 [Grunt](gruntjs.com) 修改样式
2. 使用 [Liquid](https://github.com/Shopify/liquid/wiki)的语法修改布局（`_include/` 和 `_layouts/`）

#### Header Image

标题底图

#### SEO Title

```html
<head><title>标题</title></head>
```

## 致谢

1. 这个模板是从 黄玄 [http://huangxuan.me/](https://github.com/Huxpro/huxpro.github.io)  fork 的， 感谢作者
2. 感谢 Jekyll、Github Pages 和 Bootstrap!
