---
layout: post
title:  "精通 shell 编程 读书笔记"
subtitle:   "常用命令速查"
author:     "LiTao"
date:   2017-10-19 16:09:33 +0800
categories: linux
catalog:    true
tags:
    - liux
---

精通 shell 编程 读书笔记

# 第三部分 进阶

## 9. 变量重游

### 9.1 内部变量

```
```

### 9.2 操作字符串

${#string}
expr length $string

expr "$string" : '.*'

```
#!/usr/bin/env bash
stringz=abcdefghizklmn
echo ${#stringz}
echo `expr length $stringz`
echo `expr "$stringz" : '.*'`
```

在一个文本文件的段落之间插入空行
```
#!/usr/bin/env bash
MINLEN=45
# Usage: $0 < FILENAME $0 是该被调用bash文件自己

while read line
do
    echo "$line"

    len=${#line}
    if [ "$len" -lt "$MINLEN" ];then #（当行的长度小于$MINLEN长度的时候）
         echo  # 在短行后面添加一个空行
    fi
done
```

匹配字符串开头的子串长度

expr match "$string" '$substring'
    $substring 是个正则表达式
expr "$string" : '$substring'
    $substring 是个正则表达式
```
#!/usr/bin/env bash
stringz=abcABC123ABCabc
#       |-------|
echo `expr match "$stringz" 'abc[A-Z]*.2'`
echo `expr "$stringz" : 'abc[A-Z]*.2'`
```

索引

expr index $string $substring
在字符串$string中匹配到$substring第一次出现的位置
```
#!/usr/bin/env bash
stringz=abcABC123ABCabc
echo `expr index "$stringz" C12` #6
echo `expr index "$stringz" c1` #3
```


提取子串

${string:position}

在$string中从$position开始提取子串
```
#!/usr/bin/env bash
stringz=abcABC123ABCabc
#       0123456789.....
#       索引开始位置 0
echo ${stringz:0}       # abcABC123ABCabc
echo ${stringz:1}       # bcABC123ABCabc
echo ${stringz:7:3}     # 23A 提取长度为三的子串
# 从结果提取子串
echo ${stringz:-4}      # abcABC123ABCabc  不加括号提取整个字符串
echo ${stringz:(-4)}    # Cabc 从右开始提取
echo ${stringz: -4}     # 使用圆括号或者添加一个空格可以"转义"这个参数
```

如果$string是"*" 或者 "@" ,那么将会从位置$position位置开始提取$length个位置参数，但是由于可能没有$length个参数位置了，那么就有几个位置参数就提取几个位置参数
```
#!/usr/bin/env bash
stringz=abcABC123ABCabc
#       0123456789.....
#       以1开始计算
echo `expr substr $stringz 1 2`     # ab
echo `expr substr $stringz 4 3`     # ABC
```

以正则表达式提取$length长度的子串

expr match "$string" '\($substring)\'
从$string的开始位置提取 $substring, $substring是正则表达式
expr "$string" : '\($substring)\'

```
stringz=abcABC123ABCabc
echo `expr match "$stringz" '\(.[b-c]*[A-Z]..[0-9]\)'`  #abcABC1
echo `expr  "$stringz" : '\(.[b-c]*[A-Z]..[0-9]\)'`     #abcABC1
echo `expr "$stringZ" : '\(.......\)'`                  #abcABC1

```

以正则表达式从$string的结尾提取$length长度的子串

expr match "$string" '.*\($substring)\'
从$string的开始位置提取 $substring, $substring是正则表达式
expr "$string" : '.*\($substring)\'

```
stringz=abcABC123ABCabc
echo `expr match "$stringZ" '.*\([A-C][A-C][A-C][a-c]*\)'`  #ABCCabc
echo `expr "$stringZ" : '.*\(......\)'`                     #ABCCabc
```

子串削除

${string#substring}
从$string的开头截掉最短匹配的$substring
${string##substring}
从$string的开头位置截掉最长匹配的$substring
```
stringz=abcABC123ABCabc
echo ${stringz#a*C}             # 123ABCabc
# 截掉'a'到'C'之间最短的匹配字符串
echo ${stringz##a*C}             # abc
# 截掉'a'到'C'之间最长的匹配字符串

```

${string%substring}
从$string的结尾截掉最短匹配的$substring
${string%%substring}
从$string的结尾位置截掉最长匹配的$substring
```
stringZ=abcABC123ABCabc
echo ${stringZ%b*c} # abcABC123ABCa
# 从$stringZ的结尾位置截掉'b'到'c'之间最短的匹配.
echo ${stringZ%%b*c} # a
# 从$stringZ的结尾位置截掉'b'到'c'之间最长的匹配.
```

转换图片文件格式，同时更改文件名
```
#!/usr/bin/env bash
# cvt.sh:
# 将一个目录下的所有MacPaint格式的图片文件都转换成"pbm"格式的图片文件
# 使用"netpbm"包中的"macptopbm"程序进行转换,这个程序主要是由Brian Henderson(bryanh@giraffe-data.com)来维护的.Netpbm绝大多数Linux发行版的标准套件.
# Netpbm绝大多数Linux发行版的标准套件
OPERATION=macptopbm
SUFFIX=pbm              # 新的文件名后缀

echo "内部变量，当前工作目录：$PWD"
if [ -n "$1" ]         # -n 判断字符串为空
then
    directory=$1        # 如果目录名作为参数传递给脚本，$1为传递进来的目录名
else
    directory=$PWD      # 否则使用当前的工作目录
fi

# 假定目录中所有的文件都是MacPaint格式的图像文件，并且都是以".mac"作为文件名后缀
for file in $directory/*        #文件名匹配（filename globbing）
do
    filename=${file%.*c}        # 去掉文件名的".mac"后缀
    $OPERATION $file > "$filename.$SUFFIX" # 把结果重定向到新的文件中

    rm -f $file                 # 转换后删除原始文件
    echo "$filename.$SUFFIX"    # 从stdout输出转换后的文件名。
done
exit 0
```

将音频流文件转换为oggg格式的文件
```
#!/usr/bin/env bash
# ra2ogg.sh: 将音频流文件（*.ra）转换为ogg格式的文件
# 使用“mlayer”媒体播放器程序 http://www.mplayerhq.hu/homepage
# 可能需要安装合适的编解码程序(codec)才能够正常的运行这个脚本.
# 需要使用"ogg"库和"oggenc": http://www.xiph.org/

OFILEPREF=${1%%ra}          # 去掉“ra”后缀
OFILESUFF=wav               # wav文件后缀
OUTFILE="$OFILEPREF""$OFILESUFF"
E_NOARGS=65                 # 没有参数

if [ -z "$1" ]             # 必须指定一个需要转换的文件名  -z 字符串长度为零才为真
then
    echo "Usage: `basename $0` [filename]
    exit $E_NOARGS
fi

################################################################
mplayer "$1" -ao pcm:file=$OUTFILE
oggenc "$OUTFILE"   # oggenc编码后最自动加上正确的文件扩展名
################################################################

rm "$OUTFILE"           #删除中介的*.wav 问阿金

exit $?
```

模拟 getopt
```
#!/usr/bin/env bash
# getopt-simple.sh
# 作者: Chris Morgan
# 个人读书笔记，应该不违法吧，学习一下

getopt_simple() {
    echo "getopt_simple()"
    echo "Parameters are '$*'"
    until [ -z "$1" ]                          # until 当条件为假时继续执行循环
    do
        echo "Processing parameter of: '$1'"
        if [ ${1:0:1} = '/' ]
        then
            tmp=${1:1}                          # 去掉开头的'/'... ...
            parameter=${tmp%%=*}                # 提取参数名
            value=${tmp##*=}                    # 提取参数值
            echo "Parameter: '$parameter', value: '$value'"
            eval $parameter=$value              # eval可读取一连串的参数，然后再依参数本身的特性来执行。
        fi
        shift
    done
}

# 把所有的选项传递给函数getopt_simple().
getopt_simple $*

echo "test is '$test'"
echo "test2 is '$test2'"

exit 0

#---
#sh getopt_example.sh /test=value1 /test2=value2
getopt_simple()
#Parameters are '/test=value1 /test2=value2'
#Processing parameter of: '/test=value1'
#Parameter: 'test', value: 'value1'
#Processing parameter of: '/test2=value2'
#Parameter: 'test2', value: 'value2'
#test is 'value1'
#test2 is 'value2'
#---
```

子串替换

${string/substring/replacement}
使用$replacement替换第一个匹配的$substring

${string//substring/replacement}
使用$replacement来替换所有匹配的$substring

```
#!/usr/bin/env bash
stringZ=abcABC123ABCabc
echo ${stringZ/abc/xyz}  # xyzABC123ABCabc 使用xyz来替换第一个匹配的abc

echo ${stringZ//abc/xyz} # xyzABC123ABCxyz 使用xyz来替换所有匹配的abc
```

${string/#substring/replacement}
如果$substring匹配$string的开头部分，那么就用$replacement来替换$substring
${string/%substring/replacement}
如果$substring匹配$string的结尾部分，那么就用$replacement来替换$substring

```
#!/usr/bin/env bash
stringZ=abcABC123ABCabc
echo ${stringZ/#abc/xyz}    # xyzABC123ABCabc 使用xyz来替换第一个匹配的abc

echo ${stringZ/%abc/xyz}    # abcABC123ABCxyz 使用xyz来替换所有匹配的abc

```

#### 9.2.1 使用awk来操作字符串

提取字符串
```
#!/usr/bin/env bash
# substring-extraction.sh

String=23skidoo1
#      012345678    Bash
#      123456789    awk
# 注意不同的字符串索引系统
# Bash的第一个字符是从‘0’开始记录的
# Awkde的第一个字符是从‘1’开始记录的
echo  ${String:2:4} # 位置3 （0-1-2）， 4个字符
# awk中等价于${string:pos:length}的命令是substr(string,pos,length).
echo | awk '{print substr("'"${String}"'",3,4)}'
# 使用一个空的“echo”通过管道传递给awk一个假的输入，这样就不用提供给awk一个文件名
```

### 9.3 参数替换

处理和(或)扩展变量

${parameter}

与$parameter相同, 也就是变量parameter的值. 在某些上下文中, ${parameter}很少会产生混淆.
可以把变量和字符串组合起来使用.
```
#!/usr/bin/env bash
your_id=${USER}-on-${HOSTNAME}
echo "$your_id"

echo "Old \$PATH = $PATH"
PATH=${PATH}:/opt/bin       # 在脚本的生命周期中，/opt/bin会被添加到$PATH变量中
echo "New \$PATH = $PATH"
```

${parameter-default}, ${parameter:-default}

${parameter-default} -- 如果变量parameter没有被声明，那么使用默认值。
${parameter:-default} -- 如果变量parameter没有被声明，那么使用默认值。
```
echo ${username-`whoami`}
#如果变量$username还没有被声明, 那么就echoe出`whoami`的结果(译者注: 也就是把'whoami'的结果赋值给变量$username).

```

${parameter-default} 和${parameter:-default}在绝大多数的情况下都是相同的. 只有在parameter已经被声明, 但是被赋null值得时候, 这个额外的:才会产生不同的结果.

```
#!/usr/bin/env bash
# param-sub.sh

# 一个变量是否被声明或设置，将会影响这个变量是否使用默认值，即使这个变量为（null)

username0=
echo "username0 has been declared, but is set to null."
echo "username0 = ${username0-`whoami`}"
# 不会有输出。

echo

echo username1 has not been declared
echo "username1 = ${username1-`whoami`}"
#将会输出默认值

username2=
echo "username0 has been declared, but is set to null."
echo "username0 = ${username2:-`whoami`}"
#                            ^
# 会输出,因为：-会比-多一个条件测试

exit 0
```

如果脚本没有接收到来自命令行的参数，那么默认参数构造将会提供一默认值给脚本

```
DEFAULT_FILENAME=generic.data
filename=${1:-$DEFAULT_FILENAME}
# 如果 变量没有指定，那么将使用默认值“filename”
```

${parameter=default}, ${parameter:=default}

${parameter=default} -- 如果变量parameter没声明, 那么就把它的值设为default.
${parameter:=default} -- 如果变量parameter没设置, 那么就把它的值设为default.
这两种形式基本上是一样的. 只有在变量$parameter被声明并且被设置为null值的时候, :才会引起这两种形式的不同
```
echo ${username=`whoami`}
# 变量"username"现在被赋值为`whoami`.
```

${parameter+alt_value}, ${parameter:+alt_value}
${parameter+alt_value} -- 如果变量parameter被声明了, 那么就使用alt_value, 否则就使用null字符串.
${parameter:+alt_value} -- 如果变量parameter被设置了, 那么就使用alt_value, 否则就使用null字符串

这两种形式绝大多数情况下都一样. 只有在parameter被声明并且设置为null值的时候, 多出来的这个:才会引起这两种形式的不同,

```
#!/usr/bin/env bash
echo "###### \${parameter+alt_value} ######"
echo

a=${param1+xyz}
echo "a = $a"           # a =

param2=
a=${param2+xyz}
echo "a = $a"           # a = xyz

param3=123
a=${param3+xyz}
echo "a = $a"           # a = xyz

echo
echo "###### \${parameter:+alt_value} ######"
echo

a=${param4:+xyz}
echo "a = $a"           # a =

param5=
a=${param5:+xyz}
echo "a = $a"           # a =
# 产生与a=${param5+xyz}不同的结果.

apram6=123
a=${param5:+xyz}
echo "a = $a"           # a = xyz
```

${parameter?err_msg}, ${parameter:?err_msg}

${parameter?err_msg} -- 如果parameter已经被声明, 那么就使用设置的值, 否则打印err_msg错误消息.
${parameter:?err_msg} -- 如果parameter已经被设置, 那么就使用设置的值, 否则打印err_msg错误消息.

这两种形式绝大多数情况都是一样的. 和上边所讲的情况一样, 只有在parameter被声明并设置为null值的时候, 多出来的:才会引起这两种形式的不同.

使用参数替换和错误消息
```
#!/usr/bin/env bash

# 检测一些系统的环境变量
# 这是一种可以做一些预防措施的好习惯
# 不如， 如果$USER(用户在控制台上的名字）没有被设置的话，那系统就不会认识你

: ${HOSTNAME?} ${USER?} ${HOME?} ${MAIL?}

echo
echo "Name of the macheine is $HOSTNAME."
echo "You are $USER."
echo "Your home directory is $HOME."
echo "Your mail INBOX is located in $MAIL."
echo
echo "If you are reading this message,"
echo "critical environmental variables have bean set."
echo
echo
# -----------------------------------------------------------------------------------

# ${variablename?}结构 也能检测脚本中变量中的设置情况

ThisVariable=Value-of-ThisVariable
# 注意，顺便提一下，这个字符串变量可能被设置一些非法字符.
: ${ThisVariable?}
echo "Value of ThisVariable is $ThisVariable."
echo
echo

: ${ZZXy23AB?"ZZXy23AB has not been set."}
# 如果变量ZZXy23AB没有被设置的话，那么这个脚本将会打印一个错误信息，然后结束

# 你也可以自己自定错误信息
# ： ${variablename?"ERROR MESSAGE"}

# 等价于： dummy_variable=${ZZXy23AB?}
#          dummy_variable=$ZZXy23AB?"ZXy23AB" has not been set."}

#           echo ${ZZXy23AB?} > /dev/null

# 使用命令"set -u" 来比较这些检查变量是否被设置的方法.

echo "set -u "来比较这些检查变量是否被设置的方法.

echo "You will not see this message, bacause script already terminated."
HERE=0
exit $HERE # 不会在这里退出
# 事实上，这个脚本将会以返回值1作为退出状态(echo $?).
```


参数替换和“usage”消息（译者注：通常就是帮助信息）
```
#!/usr/bin/env bash
# usage-message.sh

: ${1?"Usage: $0 ARGUMENT"}
# 如果没有提供命令行参数的话，那么脚本就在这里退出了，并且打印如下错误信息
# usage-message.sh: 1: Usage: usage-message.sh ARGUMENT

echo "These tow lines echo only if command-line parameter given."
echo "command line parameter = \"$1\""

exit 0 # 如果提供了命令行参数，那么脚本就会在这里退出

# 分别检测有命令行参数时和没有命令行参数时，脚本的退出状态
# 如果有命令行参数，那么"$?" 就是0.
# 如果没有的话，那么"$?" 就是1.
```

参数替换/扩展，对expr字符串操作中match的补充，使用方法一般是解析文件所在的目录名

变量长度/子串删除

${#var}
    字符串长度(变量$var得字符个数). 对于array来说，${#array}表示的是数组中的第一个元素的长度.

例外情况：

1. ${#*}和${#@}表示位置参数的个数.
2. 对于数组来说，${#array[*]和${#array[@]}表示数组中元素的个数

变量长度
```
#!/usr/bin/env bash
# length.sh

E_NO_ARGS=65
echo $#
if [ $# -eq 0 ]             # 这个演示脚本必须有命令行参数.
then
    echo "Please invoke this script with one or more command-line arguments."
    exit $E_NO_ARGS
fi

var01=abcdEFGH28ij
echo "var01 = ${var01}"
echo "Length of var01 = ${#var01}"
# 现在让我们试一试在变量中嵌入一个空格.
var02="abcd EFGH28ij"
echo "var02 = ${var02}"
echo "Length of var01 = ${#var01}"

echo "Number of command-line arguments passed to script = ${#@}"
echo "NUmber of command-line arguments passed to scriopt = ${#*}"

exit 0
```

${var#Pattern}, ${var##Pattern}

从变量$var的开头删除最短或最长匹配$Pattern的子串. (译者注: 这是一个很常见的用法, 请读者牢记, 一个"#"表示匹配最短, "##"表示匹配最长.)

```
# 摘自例子"days-between.sh"的一个函数.
# 去掉传递进来参数开头的0.
#!/usr/bin/env bash

strip_leading_zero()        # 去掉从参数传递进来的 ，可能存在在开头的0 （也坑你有多个0）
{
    return=${1#0}           #"1" 表示的是"$1" -- 传递进来的参数 ,"0"就是我们想从"$1"中删除的子串 -- 去掉零.
}

strip_leading_zero2()       # 去掉开头可能存在的0(也可能有多个0),因为如果不取掉,Bash 就会把这个值当做8进制的值来解释
{
    shopt -s extglob        # 打开扩展的统配(globbing)
    local val=${1##+(0)}    # 使用局部变量，匹配最长连续的一个或者多个0
    shopt -u extglob        # 关闭扩展额统配(blobbing)
    -strip_leading_zero2=${val:-0} #如果输入为0, 那么返回0来代替"".
}

# 示例用法
echo `basename $PWD`        # 当前工作目录的basename(就是去掉目录名)
echo "${PWD##*/}"           # 当前工作目录的basename(就是去掉目录名)
echo
echo `basename $0`          # 脚本名字
echo $0
echo "${0##*/}"
echo
filename=test.data
echo "${filename##*.}"      # data 文件扩展名
```

参数替换中的模式匹配
```
#!/usr/bin/env bash
# patt-matching.sh

# 使用# ## % %%来进行参数替换操作的模式匹配。 parameter substitution operators.

var1=abcd112345abc6789
pattern1=a*c                # * (通配符)匹配a -c 之间的任意字符.

echo
echo "var1 = $var1"         # abcd112345abc6789
echo "var1 = ${var1}"       # abcd112345abc6789 另一种形式

echo "number of characters is ${var1} = ${#var1}"
echo

echo "patern1 = $pattern1"  # a*c 匹配a -c 之间的任意字符.
echo "---------------------"
echo '${var1#$pattern1} = ' "${var1#$pattern1}" # d12345abc6789
# 最短的可能匹配，去掉 abcd112345abc6789 的前三个字符.
echo '${var1##$pattern1} = ' "${var1## $pattern1}" # 6789
# 最长的可能匹配，去掉 abcd112345abc6789 的前12个字符
还有好多，不写了
```

修改文件扩展名
```
#!/usr/bin/env bash
# rfe.sh : 修改文件扩展名
# 用法： rfe old_extension new _extentsion
# 示例：将制定目录中所有的*.gif文件重命名为*.jpg
#用法: rfe gif jpg

E_BADARGS=65

case $# in
    0|1)                # 竖线在这里表示“或”操作  $# 表示参数个数
    echo "Usage: `basename $0` old file suffix new file suffix"
    exit $E_BADARGS     # 如果只有零个或1个参数的话，那么就退出脚本
    ;;
esac

for filename in *.$1
# 以第一个参数为扩展名的全部文件的列表
do
    mv $filename ${filename%$1}$2
done

exit 0
```

### 9.4 指定变量的类型： 使用 `declare` 或者 `typeset`
declare 或者typeset 是内建命令（命令完全一样），允许指定变量的具体类型，
declare/typeset 选项

-r 只读
```
declare -r var1
declare -r var 等价于 readonly var1
```

-i 整型
```
declare -i number
# 脚本将会把变量"number"按照整型进行处理

number=3
echo "Number = $number"             # Number = 3

number=three
echo "Number = $number"             # Number = 0
# 脚本尝试把字符串"three"作为整数来求值，失败，所以出现值为0
```

如果把一个变量指定为整型的话，那么及时没有`expr`或`let`命令，也允许使用特定的算术运算

```
n=6/3
echo "n = $n"           # n = 6/3

declare -i n
n=6/3
echo "n = $n"           # n = 2
```

-a 数组
```
declare -a indices
变量indices将被视为数组
```

-f 函数
```
declare -f
如果在脚本中使用 declare -f ,而不加任何参数的话，那么将会列出这个脚本之前定义的所有函数
```

```
declare -f function_name
如果在脚本中使用declare -f function_name 这种形式的话，将会只列出这个函数的名字
```

-x export
```
declare -x var3
这句话声明一个变量，并作为这个脚本的环境变量被导出
```

-x var=$value
```
declare -x var3=373
declare命令允许在声明变量类型的同时给变量赋值.
```

使用 declare 来指定变量的类型
```
#!/usr/bin/env bash
func1 ()
{
    echo This is a function.
}
declare -f          # 列出前面定义的所有函数

echo

declare -i var1      # var1是个整型变量
var1=2367
echo "var1 declared as $var1"
var1=var1+1
echo "var1 incremented by 1 is $var1."
# 尝试修改一个已经声明为整型变量的值
echo "Attempting to change var1 to floating point value, 2363.1."
var1=2367.1                         # 产生错误，并且变量并没有被修改
echo "var1 is still $var1"

echo

declare -r var2=13.36               #允许设置变量的属性

echo "var2 declared as $var2"       # 试图修改只读变量的值
var2=13.37
echo "var2 is still $var2"          # 不会执行这行
exit 0                              # 脚本也不会从此退出
```

使用declare 内建命令可以限制变量的作用域
```
#!/usr/bin/env bash
foo ()
{
    FOO="bar"
}

bar ()
{
    foo
    echo $FOO
}
bar  # 打印bar
```
然而
```
#!/usr/bin/env bash
foo ()
{
  declare  FOO="bar"
}

bar ()
{
    foo
    echo $FOO
}
bar  # 什么都不打印
```

### 9.5 变量的间接引用

间接引用：eval var1=\\$$var2
从第一个变量中取的第二个变量的值

```
#!/usr/bin/env bash
# ind-ref.sh： 间接变量引用
# 访问一个以另一个变量内容作为名字的变量的值.

a=letter_of_alphabet                # 变量 "a" 的值是另一个变量的名字
letter_of_alphabet=z

echo

# 直接引用
echo "a = $a"                       # a = letter_of_alphabet

# 间接引用
eval a=\$$a
echo "Now a = $a"                   # a = z

echo

# 现在，让我们试试修改第二个引用的值

t=table_cell_3
table_cell_3=24
echo "\"table_cell_3\" = $table_cell_3"             # "table_cell_3" = 24

echo -n "dereferenced \"t\" = ";eval echo \$$t     #解引用 "t" = 24
# 在这个简单的例子中，下面的表达式也能正常工作么
# eval t=\$$t;echo "\"t\" = $t"
```

挑个例子写吧，例子太多了
传递一个间接引用给awk
```

```