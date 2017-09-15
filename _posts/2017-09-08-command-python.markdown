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
or
wget https://bootstrap.pypa.io/get-pip.py
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


# 继承
class Teacher(Persion):
    def __init__(self, name, age, salary):
        Persion.__init__(self, name, age)
        self.salary = salary
        print '(Initialized Teacher: %s)' % self.name

    def tell(self):
        Persion.tell(self)
        print 'Salary: "%d"' % self.salary


t = Teacher('Mrs ,shrivdya', 40, 3000)

getattr(object, name, default)
# 返回object的名称为name的属性的属性值，如果属性name存在，则直接返回其属性值，如果name属性不存在，则触发AttribetError 异常或当可选参数default定义时返回default值
class A:
    def __init__(self):
        self.name = 'zhangjing'

    def method(self):
        print "method print"


Instance = A()
print getattr(Instance, 'name', 'not find')  # 如果Instance 对象中有属性name则打印self.name的值，否则打印'not find'
print getattr(Instance, 'age', 'not find')  # 如果Instance 对象中有属性age则打印self.age的值，否则打印'not find'
print getattr(Instance, 'method', 'default')  # 如果有方法method，否则打印其地址，否则打印default
print getattr(Instance, 'method', 'default')()  # 如果有方法method，运行函数并打印None否则打印default

setattr(object, name, value)

# 设置object的名称为name(type：string)的属性的属性值为value，属性name可以是已存在属性也可以是新属性。

# 等同多次 self.name = name 赋值 在外部可以直接把变量和值对应关系传进去
# class Person:
#    def __init__(self, name ,age):
#        self.name = name
#        self.age = age

config = {'name': 'name', 'age', 'age'}
class Configure(object):
    def __init__(self, config):
        self.register(config)

    def register(self, config):
        for key, value in config.items():
            if key.upper() == key:
                setattr(self, key, value)
```


## 1.18 模块包

文件 `ops/fileserver/__init__.py`
```
import readers
import writers
```

每个模块包中，都有一个 `__init__.py` 文件，有了这个文件，才能导入这个目录下的module，在导入一个包时 `import ops.fileserver` ,实际上是导入了它的`__init__.py`文件
可以在 `__init__.py` 文件中再导入其他的包，或者模块，就不需要将所有的`import`语句写在一个文件里了，也就可以减少代码量，不需要一个一个去导入module了。

`__init__.py` 有一个重要的变量`__all__`. 有时会需要全部导入，`from PackageName import * ` ，这时 import 就会把注册在包 `__init__.py`文件中的`__all__`列表中的子模块
和子包导入当前作用域来。如：
```
__all__ = ["Module1", "Module2","subPackage1","subPackage2"]
```

## 1.19 执行模块类中的所有方法

```
import sys, time
import inspect # 反射包
class mon:
    def __init__(self):
        self.data = dict()
    def run(self):
        return self.runAllGet()
    def getDisk(self):
        return 222
    def getCpu(self):
        return 111
    def runAllGet(self):
        for fun in inspect.getmembers(self, predicate=inspect.ismethod):
            print fun[0], fun[1]
            if fun[0][:3] == 'get':
                self.data[fun[0][3:]] = fun[1]()
        print self.data
from test import mon
m = mon()
m.runAllGet()
```

## 1.20 文件处理
模式： 读'r' 写[清空整个文件]'w' 追加[文件需要存在]'a' 读写'r+' 二进制文件'b' 'rb','wb','rb+'

写文件
```
i={'ddd':'ccc'}
f = file('poem.txt','a')
f.write("string")
f.write(str(i))
f.flush()
f.close()
```

读文件
```
f = file('/etc/passwd','r')
c = f.read().strip()        # 读取一个大字符串，并去掉最后一个换行符
for i in c.split('\n'): # 用换行符切割字符串得到列表循环每行
    print i
f.close()
```

读文件1
```
f = file('/etc/passwd','r')
while True:
    line = f.readline() # 返回一行
    if len(line) == 0:
        break
    x = line.split(":")                     # 冒号分割定义序列
    # x = [ x for x in line.split(":") ]    # 冒号分割定义序列
    # x = [ x.split("/") for x in line.split(":") ] # 先冒号分割，在/分割 打印x[6][1]
f.close
```

读取文件2
```
f = file('/etc/passwd')
c = f.readlines() # 读所有文件内容，可反复读取，大文件时占用内存较大
for line in c:
    print line.rstrip(),
f.close()
```

读文件3
```
for i in opens('b.txt'): # 直接读取也可迭代，并有利于大文件读取，但不可反复读取
    print i,
```

追加日志
```
log = open('/home/peterli/xuesong','a')
print >> log, 'faaa'
log.close()
```

with读文件
```
#自动关闭文件、线程锁的自动获取和释放等
with open('a.txt') as f:
    for i in f:
        print i
    print f.read() # 打印所有内容为字符串
    print f.readlines() # 打印所有内容按行分割的列表
```

文件随机读写
```
# 文件本没有换行，一切都是字符，文件也没有插入功能
f.tell()                # 当前读写位置
f.read(5)               # 读取5个字符并改变指针
f.seek(5)               # 改变用户态读写指针偏移位置，可做随机写
f.seek(p,0)             # 移动当前文件第p个字节处，绝对位置
f.seek(p,1)             # 移动到相对于当前位置之后的p个字节
f.seek(p,2)             # 移动到相对于文件尾之后的p个字节
f.seek(0,2)             # 指针指导尾部
# 改变指针超出文件尾部，会造成文件洞，ll看内存占比大，但是，du -sh 却非常小
f.read(65535)           # 读取64k字节
f.write("str")          # 写会覆盖当前指针后的响应字符，无插入功能
```

## 1.21 内建函数
```
dir(sys)            # 显示对象的属性
help(sys)           # 交互式帮助
int(obj)            # 转换为整形
str(obj)            # 转换为字符型
len(obj)            # 返回对象或序列化长度
open(file,mode)     # 打开文件 # mode(r 读，w 读， a 追加)
range(0,3)          # 返回一个整型列表
raw_input("str")    # 等待用户输入
type(obj)           # 返回对象类型
abs(-22)            # 绝对值
random              # 随机数
choice()            # 随机返回给定序列的一个元素
divmod(x, y)        # 函数完成除法运算，返回商和余数
roud(x[,n])         # 函数返回浮点数x的四舍五入值，如果给出n值，则表示舍入到小数点后的位数
strip()             # 去掉字符串两端多余空格，该句是去除序列中的所有字符串两端的多余的空格
del                 # 删除列表里面的数据
cmp(x,y)            # 比较两个对象 #根据比较结果返回一个整数，如果x<y,则返回-1；如果x>y，则返回1，如果x==y，则返回0
max()               # 字符串中最大的字符
min()               # 字符串中最小的字符
sorted()            # 对序列排序
reversed()          # 对序列倒序
enumerate()         # 返回索引位置和对应的值
sum()               # 总和
list()              # 变成序列，可用于迭代
eval('3+4')         # 将字符串当成表达式求值
exec 'a=100'        # 将字符串按python语句执行
exec(a+'=new')      # 将变量a的值作为新的变量
tuple()             # 变成元组，可用于迭代 #一旦初始化便不能更改的数据结构，速度比list快
zip(s,t)            # 返回一个合并后的列表 s = ['11','22'] t = ['aa','bb'] 结果：[('11', 'aa'), ('22', 'bb')]
isinstance(object,int)  # 测试对象类型 int
xrange([lower,]stop[,step]) # 函数返回与range类似，但是xrange并不创建列表，而是返回一个xrange对象
```

## 1.22 列表函数内建函数

```
list.append(obj)                # 向列表中添加一个对象
list.count(obj)                 # 返回一个对象obj在列表中出现的次数
list.extent(seq)                # 把序列sql的内容添加到列表中
list.index(obj,i=0,j=len(list)) # 返回list[k] == obj 的k值，并且k的范围在i<=k<j;否则异常
list.insert(index,obj)          # 在索引位置为index的位置插入对象
list.pop(index=-1)              # 删除并返回指定位置的对象，默认是最后有一个对象
list.remove(obj)                # 从列表中删除对象obj
list.reverse()                  # 反转列表
list.sort(func=None,key=None,reverse=False) # 以指定的方式排序列表中的成员，如果func和key参数指定，则按照指定的方式比较各元素，如果是reverse标识被设置为True，则列表反序
```

## 1.23 序列类型操作符
```
seq[ind]        # 获取下标为ind的元素
seq[ind:ind2]   # 获取下标从ind1到ind2的元素集合
seq * expr      # 序列重复expr次
seq1 + seq2     # 链接seq1和seq2
obj in seq      # 判断obj元素是否包含在seq中
obj not in seq  # 判断obj元素是否不包含在seq中
```

## 1.24 字符串类型内建方法
```
string.expandtabs(tabsize=8)                # tab符号转为空格 # 默认8个空格
string.endswith(obj,beg=0,end=len(staring)) # 检查字符串是否以obj结束，，如果是返回True，# beg或end指定检测范围是以obj结束
string.find(str,beg=0,end=len(string))      # 检测str是否包含在string中
string.index(str,beg=0,end=len(string))     # 检测str不在string中会报异常
string.isalnum()                            # 如果string至少有一个字符并且所有字符都是字母或数字则反回True
string.isalpha()                            # 如果string至少有一个字符并且所有字符都是字母则返回True
string.isnumberic()                         # 如果字符串只包含数字字符，则返回True
string.isspace()                            # 如果字符串包含空格则返回True
string.isupper()                            # 字符串都是大写返回True
string.islower()                            # 转换字符串中所有大写为小写
string.upper()                              # 转换字符串中所有小写为大写

```


















