# String类

所属的包是java.lang包 没有任何继承关系默认继承Object  实现三个接口`Serializable, CharSequence, Comparable<String>`

String类 使用final `public final class String` 不能继承`String`

String是一个非常特殊的引用数据类型  但是可以像基本类型一样 创建 赋值

在 Java 中，String 是一个不可变的类，它的实例表示一个字符序列。String 对象在内存中的存储方式有两种情况：

 - **String Pool（字符串池）**：对于直接使用双引号（""）创建的字符串常量，Java 会将其存储在字符串池中。当代码中的多个地方使用相同的字符串常量时，它们实际上引用的是字符串池中的同一个字符串对象。这种方式可以节省内存空间，并提高字符串的共享性。

 - **Heap Memory（堆内存）**：对于通过 new 关键字创建的字符串对象，它们会被存储在堆内存中的不同位置。每个对象都有自己的内存地址，并且可以包含相同的字符序列。这些字符串对象是独立的，可以被修改，但是它们不会被加入到字符串池中。

在字符串池中存储的字符串常量是不可变的，即它们的值在创建后不能被修改。这样可以确保字符串的共享性和安全性。当我们使用字符串的不可变性特性时，Java 会尽可能地重用字符串常量，从而提高内存利用率。

在 Java 7 之前，字符串池是存储在永久代（Permanent Generation）中的一部分。从 Java 7 开始，字符串池被移到了堆内存中的一个叫做 "String Table" 的数据结构中。

需要注意的是，虽然字符串是不可变的，但是可以通过 StringBuilder 或 StringBuffer 类来进行字符串的动态修改。这些类允许在原始字符串上进行插入、删除、替换等操作，但是每次操作都会生成一个新的字符串对象。

1. 创建String对象
```java
// 字面量形式
String s1 = "abc";//直接将字符串常量赋值给str   (字符串常量池)
// new
String s2 = new String("abc");
String str = new String();//无参数构造方法创建空的对象
String str = new String("abc");//带string参数的构造方法创建对象
String str = new String(byte[] )//将数组中的每一个元素转化成对应的char 组合成String []
//        byte[] value = new byte[]{65,97,48};
//        String str = new String(value);// Aa0
String str = new String(char[] )//将数组中的每一个char元素拼接成最终的String
//        char[] value = {'h','e','l','l','o'};
//        String str = new String(value,1,3);
//        System.out.println(str);//ell


//String类 通过字面量创建的 "abc"对象 存在常量区
String s1 = "abc"; //(字符串常量池)
String s2 = "abc";// (字符串常量池)
String s3 = new String("abc");
String s4 = new String("abc");
System.out.println(s1==s2);//true
System.out.println(s1==s3);//false
System.out.println(s3==s4);//false
System.out.println(s1.equals(s2));//true   String类将继承自Object中的equals方法重写啦 里面循环对比每一个char
System.out.println(s1.equals(s3));//true   将原有比较==的方式改为比较字符值
System.out.println(s3.equals(s4));//true

// == 可以比较基本数据类型 也可以比较引用数据类型 (变量中存储的内容，变量在栈内存)
//       如果比较基本类型比较是变量中存储的值
//       如果比较引用类型比较是变量中存储的地址引用（就是比较栈内存中存的值，变量就是存在栈内存中，引用数据内存赋值给变量的时候栈内存里面存的是引用数据的地址引用）

// 这两种类型创建的方式在存储上有区别 见下图：
```

![两种创建string在存储上面的区别](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/toolsClass202405241544553.jpg)


2. String的不可变特性

长度不能改变 数组地址不让改变 数组属性私有的我们操作不了

String类中数据是存在char数组 value 里面的`private final char[] value;`

体现在两个地方   **长度**及**内容**
- 长度--->final修饰的数组   数组长度本身不能变  final修饰数组的地址也不变
- 内容--->private修饰的属性  不能在类的外部访问（保证了数组里面的内容也没法改变）







## **常见的String笔试题**
1. ==  equals方法的区别
   
        ==可以比较基本类型  可以比较引用类型
                比较基本类型比较值 比较引用类型比较地址
        equals只能比较引用类型(方法)
                默认比较地址this==obj 
                如果想要修改其比较规则  可以重写equals方法
                通常重写equals方法时会伴随着重写hashCode方法
                比如String类  比如Integer
2. *String的不可变特性
   
        长度及内容

3. String与StringBuffer区别
4. StringBuffer与StringBuilder区别
5. String对象的存储
   
        "abc"---->字符串常量池
        new String("abc")--->堆内存
        "a"+"b"+"c"+"d"

6. *String中常用的方法
