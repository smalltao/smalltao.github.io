---
layout: post
title:  "python 实用手册"
subtitle:   "python 常用命令速查"
author:     "LiTao"
date:   2017-09-13 15:37:33 +0800
categories: python
catalog:    true
tags:
    - python
---

python实例手册

## 说明

非原创，整理自 [雪松](https://github.com/liquanzhou/ops_doc)

# 1. 基础

## 1.1 安装 `python2.7`

```shell
wget https://www.python.org/ftp/python/2.7.9/Python-2.7.9.tgz
tar xvf Python-2.7.9.tgz
cd Python-2.7.9
./configure --prefix=/usr/local/python27
make
make install
mv /usr/bin/python /usr/bin/python_old
ln -s /usr/local/python27/bin/python /usr/bin/python
python -V #查看版本
```

解决`yum`无法使用的问题
```
vim /usr/bin/yum
首行 #!/usr/bin/python 替换为老版本python #!/usr/bin/python2.4 注意可能为2.6
```
## 1.2 `pip`模块安装

```
yum install python pip #centos install pip
sudo apt-get install python-pip # ubuntu install pip
```

`pip` 官方安装脚本
```
wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py
python get-pip.py
```

`pip`编译安装
```
# https://pypi.python.org/pypi/setuptools
wget http://pypi.python.org/packages/source/s/setuptools/setuptools.tar.gz
tar zxvf setuptools.tar.gz
cd setuptools/
python setu.py build
python setup.py install
# https://pypi.python.org/pypi/ez_setup
tar zxvf ez_setup.tar.gz
cd ez_setup/
python setup.py build
python setup.py install
# https://pypi.python.org/pypi/pip
tar zxvf pip.tar.gz
cd pip/
python setup.py build
python setup.py install
```

加载环境变量
```
vim /etc/profile
export PATH=/usr/local/python27/bin:$PATH
. /etc/profile #or source /etc/profile
```

`pip`命令
```
pip freeze                      # 查看包版本
pip install Package             # 安装包 pip install requests
pip show --files Package        # 查看安装包时安装了哪些文件
pip show --files Package        # 查看哪些包有更新
pip install --upgrade Package   # 更新一个软件包
pip uninstall Package           # 卸载软件包
pip list                        # 查看pip安装的包及版本
pip install django==1.5         # 指定版本安装
```

## 1.3 查看帮助
```
python -c "help('modules')" # 查看python所有模块
import os
for i in dir(os):
    print i                 # 模块的方法
help(os.path)               # 方法的帮助
```

## 1.4 `python`中关键字
```
import keyword
keyword.iskeyword(str) # 字符串是否为python关键字
keyword.kwlist         # 返回python所有关键字
['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

## 1.5 调试
```
python -m trace -t a.py
strace -p pid   #用系统命令跟踪系统调用
```

## 1.6 变量
```
r=r'\n'             # 输出时原型打印
u=u'中文'           # 定义为unicode编码
global x            # 全局变量
a = 0 or 2 or 1     # 布尔运算赋值，a值为True即不处理后面，a值为2、字符串''、空元组()、空列表[]、空字典{}、0、空字符串都是False
name = raw_input("input:").strip()          # 输入字符串变量
num = int(raw_input("input:").strip())      # 输入字符串str转int型
locals()                                    # 所有局部变量组成的字典
locals().values()                           # 所有局部变量值的列表
os.popen("date -d @{0} +'%Y-%m-%d %H:%M:%S'".format(12)).read() # 特殊情况引入变量{0} 代表第一个参数
```

基于字典的字符串格式化
```
params = {"server":"mpilgrim","database":"master","uid":"sa","pwd":"secret"}
"%(pwd)s"                                               % params # 'secret'
"%(pwd)s is not a good password for %(uid)s" % params   # 'secret is not a good password for sa'
"%(database)s of mind, %(database)s of body" % params   # 'master of mind, master of body'
```


## 1.7 打印
```
# 字符创 %s 整数 %d 浮点 %f 原样打印 %r
print '字符串: %s 整数：%d 浮点：%f 原样打印：%r' % ('aa',2,1.0,'r')
print 'abc',                        # 有逗号，代表不换行打印，再打印回接着本行打印
print '%-10s %s' % ('aaa','bbb')    # 左对齐，占10个字符
print '%10s %s' % ('aaa','bbb')     # 左对齐，占10个字符
```

## 1.8 列表
```
# 列表元素的个数最多 536870912
shoplist = ['apple', 'mango', 'carrot', 'banana']
shoplist[2] = 'aa'
del shoplist[0]
shoplist.insert(4,'www')
shoplist.append('aaa')
ahoplist[::-1]                  # 倒着打印 对字符串翻转有效
shoplist[2::3]                  # 从第二个开始每个三个开始打印
shoplist[:-1]                   # 排除最后有一个
'\t'.join(shoplist)             # 将列表转换成字符串 用字表符分割
sys.path[1:1]=[5]               # 在位置1前面插入列表中一个值
list(set(['qwe', 'as', '123', '123']))  # 将列表通过集合去重
eval("['1','a']")                       # 将字符串当表达式求值，得到列表

# enumerate 可得到每个值的对应位置
for i,n in enumerate(['a','b','c']):
    print i,n
```

## 1.9 元组 不可变
```
# 不可变列表
zoo = ('wolf', 'elephant', 'penguin')
```

## 1.10 字典
```
ab = {
        'tom' : 'cat',
        'jerry' : 'mouse'
    }
ab['c'] = 80            # 添加字典元素
del ab['tom']           # 删除字典元素
ab.keys()               # 查看所有键值
ab.values()             # 打印所有值
ab.has_key('a')         # 查看键只是否存在
ab.items()              # 返回整个字典列表

```

复制字典
```
a = {1:{1:2,3:4}}
b = a
b[1][1] = 8888              # a和b都为 {1:{1:2,3:4}}
import copy
c = copy.deepcopy(a)        # 再次赋值 b[1][1] = 9999 拷贝字典为新的字典，互不干扰

a[2 ] = copy.deepcopy(a[1]) # 复制出第二个key，互不影响  {1: {1: 2, 3: 4},2: {1: 2, 3: 4}}
```

## 1.11 迭代器

创建迭代接口，而不是原来的对象，支持字符串、列表和字典等序列对象
```
i = iter('abcd')
print i.next()

s = {'one':1,'two':2,'three':3}
m = iter(s)
print m.next() # 迭代key

```

## 1.12 流程结构

`if` 判断
布尔型操作符 and or not 实现多重判断
```
if a == b:
    print '=='
elif a < b:
    print b
else:
    print a
```

`while` 循环
```
while True:
    if a == b:
        print "=="
        break;
    print "!="
else:
    print 'over'
count=0
while(count<9):
    print count
    count += 1
```

`for`循环
```
sorted()        # 返回一个序列(列表)
zip()           # 返回一个序列(列表)
enumerate()     # 返回一个循环列表序列 for i, v in enumerate(['a','b']):
reversed()      # 反序迭代器对象
dict.iterkeys()    # 通过键迭代
dict.itervalues()  # 通过值迭代
dict.iteritems()   # 通过键-值对迭代
readline()         # 文件迭代
iter(obj)          # 得到obj迭代器 检查obj是不是一个序列
iter(a,b)          # 重复调用a,直到迭代器的下一个值等于b
for i in range(1,5):
    print i
else:
    print 'over'

list = ['a','b','c','b']
for i in range(len(list)):
    print list[i]
for x, Lee in enumerate(list):
    print "%d %s Lee" % (x+1,Lee)

#enumerate 使用函数得到索引值和对应值
for i, v in enumerate(['tic','tac','toe']):
    print(i,v)
```

流程结构简写
```
[ i * 2 for i in [8, -2, 5]] # [16, -4, 10]
[i for i in range(8) if i %2 ==0 ] # [0,2,4,6]
```

## 1.13 `tab`补全

```
# vim /usr/lib/python2.7/dist-packages/tab.py
# python startup file
import sys
import readline
import rlcompleter
import atexit
import os
# tab completion
readline.parse_and_bind('tab: complete')
# history file
histfile = os.path.join(os.environ[HOME'], '.pythonhistory')
```

## 1.14 函数

```
def printMax(a, b = 1):
    if a > b:
        print a
        return a
    else:
        print b
        return b
x = 5
y = 7
printMax(x, y)

def update(*args, **kwargs):
    p=''
    for i, t in kwargs.items():
        p = p+ '%s=%s,'%(i,str(t))
        sql = "update 'user' set (%s) where (%s)" %(args[0],p)
        print sql

update('aaa',uu='uu',id=3)

```

## 1.15 模块

```
# FileName: mymodule.py
def sayhi():
    print 'mymodule'
version = '0.1'

# 使用模块中方法
import mymodule
from mymodule import sayhi, version
mymodule.sayhi() # 使用模块中函数方法
```

## 1.16 装饰器

为已经存在的功能添加额外的功能，只在初始化脚本的时候执行一次

```
#!/usr/bin env python

def deco(func):
    def wrapper(*args, **kwargs):
        print "wrap start"
        func(*args, **kwargs)
        func(*args, **kwargs)
        print "wrap end\n"
    return wrapper

@deco
def foo(x):
    print "in foo():"
    print "I have a para: %s" % x
@deco
def foo_dict(x,z='dict_para'):
    print "in foo_dict:"
    print "I have two para, %s and %s" % (x, z)

if __name__ == "__main__":
    # 装饰器 @deco 等价于 foo = deco(foo)
    foo('x')
    foo_dict('x', z='dict_para')

结果

    Wrap start
    In foo():
    I have a para: x
    In foo():
    I have a para: x
    Wrap end

    Wrap start
    In foo_dict:
    I have two para, x and dict_para
    In foo_dict:
    I have two para, x and dict_para
    Wrap end
```

## 1.17 类对象的方法

```
__xxx__                 # 类对象定义名字
__init__                # 实例初始化类的方法
__all__ = ['xs']        # __all__ 用于模块import导入时限制，定义了只有all内指定的属性、方法、类可被导入，没定义则模块内的所有将被导入
_xxx                    # __开头的为私有类，只有类对象和子类对象自己能访问到这些变量，不能用 from module import * 导入 class _status:
__xxx                   # __ 开头的为类中的私有变量名，只有类对象自己能访问，连子类对象也不能访问到这个数据
```

```
class Persion:
    # 实列初始化的方法
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print self.name
    # 有self此函数为方法
    def sayHi(self):
        print 'Hello, my name is ', self.name
    # 对象消逝的时候被调用
    def __del__(self):
        print 'over'
# 实例化对象
p = Persion('Swaroop', 23)
# 使用对象方法
p.sayHi()
```








