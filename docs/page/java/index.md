# java 历史以及开发环境搭建
## java 历史
1996年1一月 开发工具包JDK1.0

1997年2一月 JDK1.1版本问世

1998年12一月 javaEE企业版

1999年6一月 java第二代版本平台JDK1.2 细化了三个不同的小版本（不同方向）

| 表头   | 表头                |
|------|-------------------|
| J2SE | java第二代平台 桌面级 C/S |
| J2EE | java第二代平台 企业版 B/S |
| J2ME | java第二代平台 微型版 移动端 |

2004年 添加了很多新特性 java5

2004年  java6

2009年 oracle 并购 sum 74亿

2010年 oracle java7

`java语言的特性`
1. 跨平台性（早期其实是未来适应芯片 后来是为了适应 不同操作系统）
2. 面向对象的思想
3. 简单性
4. 健壮性 （垃圾回收机制、异常处理机制）
5. 多线程 （并行操作、提高执行效率）
6. 大数据开发

## 跨平台机制 - 环境搭建

- JVM java virtual machine 虚拟机 (内存中开辟一块空间 源文件 =>jvm编译 =》字节码)

    java计算机高级编程语言
    
    计算机只认识 0 1 硬件组成 =》通电 不通电
    
    源文件.java => jvm => 字节码.calss 

- JRE java runtime environment 运行环境 

    运行别人写好的java程序

- JDK java development kit 开发工具包

  开发是需要用的工具

  javac.exe 编译工具

  java.exe 执行工具
  

**JDK 包含 JRE 包含 JVM**  

安装JDK后 生成的文件解释默认路径 C:\Program Files\java\jdk1.8.0_201

 | 文件 or 文件夹   | 解释          |
|-------------|-------------|
 | bin 文件夹     | 全都是一些工具     |
 | include 文件夹 | 包含其他语言的写的程序 |
 | jre 文件夹     | 包含运行环境      |
 | lib 文件夹     | 包含其他人写好的库   |
 | src.zip     | 源码          |

## 编译与执行 + 环境变量

 java命名规则 （建议使用下面规则，不使用下面规则也不影响代码运行）

 规则

    字母 (区分大小写)
    数字 (0 - 9 不能以数字开头)
    符号 （英文 _ $）
    中文 （强烈不推荐）

规约 

    类名 使用大驼峰命名

```java
// class 前面加了 public 关键字 要请 当前类名必须和文件名 一样 
public class Cs {
    public static void main(String[] args) {
        System.out.println(123);
    }
}
// javac Cs.java => java Cs
```

注释：

​		1.单行注释
​		//

​		2.多行注释
​		/*

​		*/

​		3.文档注释

​		/**

​		*/



