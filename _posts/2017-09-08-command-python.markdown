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
python setup.py build
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
string.lstrip()                             # 去掉字符串左边的空格
string.rstrip()                             # 去掉字符串右边的空格
string.replace(str1,str2,num=string.count(str1))    # 把string中的str1替换成str2,如果num指定，则替换不超过num次
string.startwith(obj,beg=0,end=len(string)) # 检测字符串是否以obj开头
string.zfill(width)                         # 返回字符串长度为width的字符串，原字符串右对齐，前面填充0
string.isdigit()                            # 只包含数字返回True
string.split("分割符")                      # 把string切成一个列表
":".join(string.split())                    # 以: 作为分割符，将所有元素合并成一个新的字符串
```

## 1.25 字典内建方法
```
dict.clear()                # 删除字典中所有元素
dict.copy()                 # 返回字典（浅复制）的一个副本
dict.fromkeys(seq,val=None) # 创建并返回一个新字典，以seq中的元素作为该字典的键，val做该字字典中所有键对的初始值
dict.get(key,default=None)  # 对字典dict中键key,返回它对应的值value，如果字典中不存在亲爱此键，则返回default值
dict.has_key(key)           # 如果键在字典中存在，则返回True 用in和 not in代替
dict.items()                # 返回一个包含字典中键、值对元组的列表
dict.keys()                 # 返回一个包含字典中键的列表
dict.iter()                 # 方法iteritems()、iterkeys()、itervalues()与它们对应的非迭代方法一样,不同的是它们返回一个迭代子,而不是一个列表
dict.pop(key[,default])     # 和方法get()相似.如果字典中key键存在,删除并返回dict[key]
dict.setdefault(key,default=None)  # 和set()相似，但如果字典中不存在key值，右dict[key]=default为它赋值
dict.update(dict2)          # 将字典dict2的键值对添加到字典dict
dict.values()               # 返回一个包含字典中所有值的列表
```

## 1.26 集合方法
```
s.update(t)                         # 用t中的元素修改s，s 现在包含s或t的成员  s |= t
s.intersection_update(t)            # s中的成员是公用属于s和t的元素 s &= t
s.difference_update(t)              # s中的成员是属于s但不包含在t中的元素    s -= t
s.symmetric_difference_update(t)    # s中的成员更新为那些包含在s或t中,但不是s和t共有的元素  s ^= t
s.add(obj)                          # 在集合s中添加对象obj
s.remove(obj)                       # 从集合s中删除对象obj;如果obj不是集合s中的元素(obj not in s),将引发KeyError错误
s.discard(obj)                      # 如果obj是集合s中的元素,从集合s中删除对象obj
s.pop()                             # 删除集合s中的任意一个对象,并返回它
s.clear()                           # 删除集合s中的所有元素
s.issubset(t)                       # 如果s是t的子集,则返回True   s <= t
s.issuperset(t)                     # 如果t是s的超集,则返回True   s >= t
s.union(t)                          # 合并操作;返回一个新集合,该集合是s和t的并集   s | t
s.intersection(t)                   # 交集操作;返回一个新集合,该集合是s和t的交集   s & t
s.difference(t)                     # 返回一个新集合,改集合是s的成员,但不是t的成员  s - t
s.symmetric_difference(t)           # 返回一个新集合,该集合是s或t的成员,但不是s和t共有的成员   s ^ t
s.copy()                            # 返回一个新集合,它是集合s的浅复制
obj in s                            # 成员测试;obj是s中的元素 返回True
obj not in s                        # 非成员测试:obj不是s中元素 返回True
s == t                              # 等价测试 是否具有相同元素
s != t                              # 不等价测试
s < t                               # 子集测试;s!=t且s中所有元素都是t的成员
s > t                               # 超集测试;s!=t且t中所有元素都是s的成员
```

## 1.27 序列化
```
#!/usr/bin/python
import cPickle
obj = {'1':['4124','1241','124'],'2':['12412','142','1241']}

pkl_file = open('account.pkl','wb')
cPickle.dump(obj,pkl_file)
pkl_file.close()

pkl_file = open('account.pkl','rb')
account_list = cPickle.load(pkl_file)
pkl_file.close()
```

## 1.28 文件对象方法
```
file.close()                     # 关闭文件
file.fileno()                    # 返回文件的描述符
file.flush()                     # 刷新文件的内部缓冲区
file.isatty()                    # 判断file是否是一个类tty设备
file.next()                      # 返回文件的下一行,或在没有其他行时引发StopIteration异常
file.read(size=-1)               # 从文件读取size个字节,当未给定size或给定负值的时候,读取剩余的所有字节,然后作为字符串返回
file.readline(size=-1)           # 从文件中读取并返回一行(包括行结束符),或返回最大size个字符
file.readlines(sizhint=0)        # 读取文件的所有行作为一个列表返回
file.xreadlines()                # 用于迭代,可替换readlines()的一个更高效的方法
file.seek(off, whence=0)         # 在文件中移动文件指针,从whence(0代表文件起始,1代表当前位置,2代表文件末尾)偏移off字节
file.tell()                      # 返回当前在文件中的位置
file.truncate(size=file.tell())  # 截取文件到最大size字节,默认为当前文件位置
file.write(str)                  # 向文件写入字符串
file.writelines(seq)             # 向文件写入字符串序列seq;seq应该是一个返回字符串的可迭代对象
```

## 1.29 文件对象的属性
```
file.closed          # 表示文件已被关闭,否则为False
file.encoding        # 文件所使用的编码  当unicode字符串被写入数据时,它将自动使用file.encoding转换为字节字符串;若file.encoding为None时使用系统默认编码
file.mode            # Access文件打开时使用的访问模式
file.name            # 文件名
file.newlines        # 未读取到行分隔符时为None,只有一种行分隔符时为一个字符串,当文件有多种类型的行结束符时,则为一个包含所有当前所遇到的行结束符的列表
file.softspace       # 为0表示在输出一数据后,要加上一个空格符,1表示不加
```

## 1.30 异常处理
```
# try 中使用 sys.exit(2) 会被捕获,无法退出脚本,可使用 os._exit(2) 退出脚本
class ShortInputException(Exception): # 继承Exception异常的类,定义自己的异常
    def __init__(self, length, atleast):
        Exception.__init__(self)
        self.length = length
        self.atleast = atleast
try:
    s = raw_input('Enter something --> ')
    if len(s) < 3:
        raise ShortInputException(len(s), 3)    # 触发异常
except EOFError:
    print '\nWhy did you do an EOF on me?'
except ShortInputException, x:      # 捕捉指定错误信息
    print 'ShortInputException:  %d | %d' % (x.length, x.atleast)
except Exception as err:            # 捕捉所有其它错误信息内容
    print str(err)
#except urllib2.HTTPError as err:   # 捕捉外部导入模块的错误
#except:                            # 捕捉所有其它错误 不会看到错误内容
#        print 'except'
finally:                            # 无论什么情况都会执行 关闭文件或断开连接等
       print 'finally'
else:                               # 无任何异常 无法和finally同用
    print 'No exception was raised.'

```

## 1.31 不可捕获的异常
```
NameError:              # 尝试访问一个未申明的变量
ZeroDivisionError:      # 除数为零
SyntaxErrot:            # 解释器语法错误
IndexError:             # 请求的索引元素超出序列范围
KeyError:               # 请求一个不存在的字典关键字
IOError:                # 输入/输出错误
AttributeError:         # 尝试访问未知的对象属性
ImportError             # 没有模块
IndentationError        # 语法缩进错误
KeyboardInterrupt       # ctrl+C
SyntaxError             # 代码语法错误
ValueError              # 值错误
TypeError               # 传入对象类型与要求不符合
```

## 1.32 内建异常
```
BaseException                # 所有异常的基类
SystemExit                   # python解释器请求退出
KeyboardInterrupt            # 用户中断执行
Exception                    # 常规错误的基类
StopIteration                # 迭代器没有更多的值
GeneratorExit                # 生成器发生异常来通知退出
StandardError                # 所有的内建标准异常的基类
ArithmeticError              # 所有数值计算错误的基类
FloatingPointError           # 浮点计算错误
OverflowError                # 数值运算超出最大限制
AssertionError               # 断言语句失败
AttributeError               # 对象没有这个属性
EOFError                     # 没有内建输入,到达EOF标记
EnvironmentError             # 操作系统错误的基类
IOError                      # 输入/输出操作失败
OSError                      # 操作系统错误
WindowsError                 # windows系统调用失败
ImportError                  # 导入模块/对象失败
KeyboardInterrupt            # 用户中断执行(通常是ctrl+c)
LookupError                  # 无效数据查询的基类
IndexError                   # 序列中没有此索引(index)
KeyError                     # 映射中没有这个键
MemoryError                  # 内存溢出错误(对于python解释器不是致命的)
NameError                    # 未声明/初始化对象(没有属性)
UnboundLocalError            # 访问未初始化的本地变量
ReferenceError               # 若引用试图访问已经垃圾回收了的对象
RuntimeError                 # 一般的运行时错误
NotImplementedError          # 尚未实现的方法
SyntaxError                  # python语法错误
IndentationError             # 缩进错误
TabError                     # tab和空格混用
SystemError                  # 一般的解释器系统错误
TypeError                    # 对类型无效的操作
ValueError                   # 传入无效的参数
UnicodeError                 # Unicode相关的错误
UnicodeDecodeError           # Unicode解码时的错误
UnicodeEncodeError           # Unicode编码时的错误
UnicodeTranslateError        # Unicode转换时错误
Warning                      # 警告的基类
DeprecationWarning           # 关于被弃用的特征的警告
FutureWarning                # 关于构造将来语义会有改变的警告
OverflowWarning              # 旧的关于自动提升为长整形的警告
PendingDeprecationWarning    # 关于特性将会被废弃的警告
RuntimeWarning               # 可疑的运行时行为的警告
SyntaxWarning                # 可疑的语法的警告
UserWarning                  # 用户代码生成的警告
```

## 1.33 触发异常
```
raise exclass            # 触发异常,从exclass生成一个实例(不含任何异常参数)
raise exclass()          # 触发异常,但现在不是类;通过函数调用操作符(function calloperator:"()")作用于类名生成一个新的exclass实例,同样也没有异常参数
raise exclass, args      # 触发异常,但同时提供的异常参数args,可以是一个参数也可以是元组
raise exclass(args)      # 触发异常,同上
raise exclass, args, tb  # 触发异常,但提供一个跟踪记录(traceback)对象tb供使用
raise exclass,instance   # 通过实例触发异常(通常是exclass的实例)
raise instance           # 通过实例触发异常;异常类型是实例的类型:等价于raise instance.__class__, instance
raise string             # 触发字符串异常
raise string, srgs       # 触发字符串异常,但触发伴随着args
raise string,args,tb     # 触发字符串异常,但提供一个跟踪记录(traceback)对象tb供使用
raise                    # 重新触发前一个异常,如果之前没有异常,触发TypeError
```

## 1.34 跟踪异常栈
```
# traceback 获取异常相关数据都是通过sys.exc_info()函数得到的
import traceback
import sys
try:
    s = raw_input()
    print int(s)
except ValueError:
    # sys.exc_info() 返回值是元组，第一个exc_type是异常的对象类型，exc_value是异常的值，exc_tb是一个traceback对象，对象中包含出错的行数、位置等数据
    exc_type, exc_value, exc_tb = sys.exc_info()
    print "\n%s \n %s \n %s\n" %(exc_type, exc_value, exc_tb )
    traceback.print_exc()        # 打印栈跟踪信息
```

## 1.35 抓取全部错误信息存入字典
```
import sys, traceback

try:
    s = raw_input()
    int(s)
except:
    exc_type, exc_value, exc_traceback = sys.exc_info()
    traceback_details = {
                         'filename': exc_traceback.tb_frame.f_code.co_filename,
                         'lineno'  : exc_traceback.tb_lineno,
                         'name'    : exc_traceback.tb_frame.f_code.co_name,
                         'type'    : exc_type.__name__,
                         'message' : exc_value.message,
                        }

    del(exc_type, exc_value, exc_traceback)
    print traceback_details
    f = file('test1.txt', 'a')
    f.write("%s %s %s %s %s\n" %(traceback_details['filename'],traceback_details['lineno'],traceback_details['name'],traceback_details['type'],traceback_details['message'], ))
    f.flush()
    f.close()
```

## 1.36 调试log
```
# cgitb 覆盖了默认sys.excepthook全局异常拦截器
def func(a, b):
    return a / b
if __name__ == '__main__':
    import.cgitb
    cgitb.enable(format='text')
    func(1,0)
```

## 1.37 函数式编程内建函数
```
apply(func[,nkw][,kw])          # 用可选的参数来调用func，nkw为非关键字参数,kw为f非关键字参数；返回值是函数调用的返回值
filter(func,seq)                # 调用一个布尔函数func来迭代遍历每个seq中的元素；返回一个使func返回值为true的元素的序列
map(func,seq1[,seq2])           # 将函数func作用于给定序列(s)的每个元素，并用一个列表来提供返回值；如果func为None，func表现为一个身份函数，返回一个含有每个序列中元素的n个元组的列表
reduce(func,seq[,int])          # 将二元函数作用于seq序列的元素,每次携带一堆(先前的结果以及下一个序列元素),连续地将现有的结果和下一个值作用在获得的随后的结果上,最后减少我们的序列为一个单一的返回值;如果初始值init给定,第一个比较会是init和第一个序列元素而不是序列的头两个元素
lambda x,y:x+y                  # 创建一个匿名函数 可用于上面几种方法中直接创建匿名函数式


# filter 即通过函数方法只保留结果为真的值组成列表
def f(x): return x % 2 != 0 and x % 3 != 0
f(3)     # 函数结果是False  3被filter抛弃
f(5)     # 函数结果是True   5被加入filter最后的列表结果
filter(f, range(2, 25))
[5, 7, 11, 13, 17, 19, 23]

# map 通过函数对列表进行处理得到新的列表
def cube(x): return x*x*x
map(cube, range(1, 11))
[1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]

# reduce 通过函数会先接收初始值和序列的第一个元素，然后是返回值和下一个元素，依此类推
def add(x,y): return x+y
reduce(add, range(1, 11))              # 结果55  是1到10的和  x的值是上一次函数返回的结果，y是列表中循环的值
reduce(lambda x,y:x+y, range(1,11))    # 等同上面两条  lambda来创建匿名函数[ lambda x,y:x+y ] ,后面跟可迭代的对象
```

## 1.38 编码转换
```
a='中文'                    # 编码未定义按输入终端utf8或gbk
u=u'中文'                   # 定义为unicode编码  u值为 u'\u4e2d\u6587'
u.encode('utf8')            # 转为utf8格式 u值为 '\xe4\xb8\xad\xe6\x96\x87'
print u                     # 结果显示 中文
print u.encode('utf8')      # 转为utf8格式,当显示终端编码为utf8  结果显示 中文  编码不一致则乱码
print u.encode('gbk')       # 当前终端为utf8 故乱码
ord('4')                    # 字符转ASCII码
chr(52)                     # ASCII码转字符
```

## 1.39 遍历递归
```
[os.path.join(x[0],y) for x in os.walk('/root/python/5') for y in x[2]]

for i in os.walk('/root/python/5/work/server'):
    print i
```

## 1.40 元类
```

# 实现动态curd类的或者实例中的方法属性

#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Name:        metaclass.py
# Author:      ZhiPeng Wang.
# Created:     15/8/12
# Copyright:   (c) TigerJoys-SA 2015
# -----------------------------------------------------------------------------

"""首先检查__metaclass__属性, 如果设置了此属性, 如果设置了此属性则调用对应Metaclass,
Metaclass本身也是Class 当调用时先调用自身的__new__方法新建一个Instance然后Instance调
用__init__返回一个新对象(MyClss), 然后正常执行原Class
"""

ext_attr = {
    'wzp': 'wzp',
    'test': 'test',
}

class CustomMeta(type):
    build_in_attr = ['name', ]

    def __new__(cls, class_name, bases, attributes):
        # 获取`Meta` Instance
        attr_meta = attributes.pop('Meta', None)
        if attr_meta:
            for attr in cls.build_in_attr:      # 遍历内置属性
                # 自省, 获取Meta Attributes 不是build_in_attr的属性不处理
                print "Meta:", getattr(attr_meta, attr, False)
        # 扩展属性
        attributes.update(ext_attr)
        return type.__new__(cls, class_name, bases, attributes)

    def __init__(cls, class_name, bases, attributes):
        super(CustomMeta, cls).__init__(class_name, bases, attributes)

class MyClass(object):
    __metaclass__ = CustomMeta  # metaclass
    class Meta:
        name = 'Meta attr'

if __name__ == '__main__':

    # TODO 此处返回一个类｀Instance｀对象
    print MyClass()

    # TODO 此处返回一个类对象, 并不是｀Instance｀
    print type("MyClass", (), {})
```

# 2 常用模块

## 2.1 `sys` 系统操作模块
```
sys.argv            # 获取参数列列表
sys.exit(2)         # 退出脚本返回状态，会被try截取
sys.exc_info()      # 获取当前正在处理的异常类
sys.version         # 获取python程序的解释程序信息
sys.maxint          # 最大的int值 9223372036854775807
sys.maxunicode      # 最大的unicode值
sys.modules         # 返回系统导入的模块字段,可以是模块名，value是模块
sys.path            # 返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值
sys.platform        # 返回操作系统平台名称
sys.stdout          # 标准输出
sys.stdin           # 标准输入
sys.stderr          # 错误输出
sys.exec_prefix     # 返回平台独立的python文件安装位置
sys.stdin.readline()    # 从标准输入读入一行
sys.stdout.write("a")   # 屏幕输出a
sys.path.insert(1,os.path.join(sys.path[0],'/opt/script/')) # /opt/script/目录加入环境变量，可导入响应模块
```

## 2.2 `os` 系统模块
```
# 相对sys模块 os模块更为底层，os._exit() try无法抓取
os.popen('id').read()       # 执行系统命令得到返回结果
os.system()                 # 得到返回状态，返回无法截取
os.name                     # 返回系统平台 linux/unix 用户名称
os.getenv()                 # 读取环境变量
os.putenv()                 # 设置环境变量
os.getcwd()                 # 当前工作路径
os.chdir()                  # 改变当前工作路径
os.walk('/root/')           # 递归路径
os.environ['HOME']         # 查看系统环境变量
os.statvfs("/")             # 获取磁盘信息
```

## 2.3 `commands` 执行系统命令
```
commands.getstatusoutput('id')      # 返回元组(状态，标准输出)
commands.getoutput('id')            # 只返回执行的结果，忽略返回值
commands.getstatus('file')          # 返回ls -ld file 执行结果
```

## 2.4 `re` [perl风格正则]
```
compile(pattern,flags=0)        # 对正则表达式pattern进行编译，flags是可选标识符，并返回一个regex对象
math(pattern,string,flags=0)    # 尝试用正则表达式模式pattern匹配字符串string，flags是可选标识符，如果匹配成功，则返回一个匹配对象，否则返回None
search(pattern,string,flags=0)  # 在字符串string中搜索正则表达式模式pattern的第一次出现，flags是可选标识符，如果匹配成功，返回第一个匹配对象，否则返回None
findall(pattern,string[,flags]) # 在字符串string中搜索正则表达式模式pattern的所有（非重复）出现，返回一个匹配对象的列表，# pattern=u'\u4e3d\u6587'代表 unicode
finditer(pattern,string[,flags])# 和findall相同，但返回的不是列表是迭代器，对于每一个匹配，该迭代器返回一个匹配对象
split(pattern,string,max=0)     # 根据正则表达式中的分割符吧字符串string分割为一个列表，返回成功匹配的列表，最多分割max次（默认所有）
sub(pattern,repl,string,max=0)  # 把字符串string中所有匹配正则表达式的pattern的地方替换成字符串repl，如果max的值没有给出，则对所有匹配的地方进行替换（subn()会返回一个表示替换次数的数值)
group(num=0)                    # 返回全部匹配对象（或指定编号的num子组）
groups()                        # 返回一个包含全部匹配的子组的元组（如果没有匹配成功，则返回一个空元组）
```

## 2.5 `零宽断言`
```
str = 'aaalllaaa, bbb222&, 333ccc'
re.compile('\d+(?=[a-z]+)').findall(str)        # 向前界定 (?=exp) 找出连续的数字并且最后一个数字跟着至少一个a-z ['111', '333']
```

## 2.6 `mysql python`
```
下载 https://pypi.python.org/
cd mysql-python
python setup.py install
```

