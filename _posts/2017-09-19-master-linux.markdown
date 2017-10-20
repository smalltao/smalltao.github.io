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
${string%substring}
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















