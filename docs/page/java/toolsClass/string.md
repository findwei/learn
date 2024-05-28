# String类

所属的包是java.lang包 没有任何继承关系默认继承Object  实现三个接口`Serializable, CharSequence, Comparable<String>`

String类 使用final `public final class String` 不能继承`String`

String是一个非常特殊的引用数据类型  但是可以像基本类型一样 创建 赋值

在 Java 中，String 是一个不可变的类，它的实例表示一个字符序列。String 对象在内存中的存储方式有两种情况：

 - **String Pool（字符串池）**：对于直接使用双引号（""）（字面量形式）创建的字符串常量，Java 会将其存储在字符串池中。当代码中的多个地方使用相同的字符串常量时，它们实际上引用的是字符串池中的同一个字符串对象。这种方式可以节省内存空间，并提高字符串的共享性。

 - **Heap Memory（堆内存）**：对于通过 new 关键字创建的字符串对象，它们会被存储在堆内存中的不同位置。每个对象都有自己的内存地址，并且可以包含相同的字符序列。这些字符串对象是独立的，可以被修改，但是它们不会被加入到字符串池中。

在字符串池中存储的字符串常量是不可变的，即它们的值在创建后不能被修改。这样可以确保字符串的共享性和安全性。当我们使用字符串的不可变性特性时，Java 会尽可能地重用字符串常量，从而提高内存利用率。

在 Java 7 之前，字符串池是存储在永久代（Permanent Generation）中的一部分。从 Java 7 开始，字符串池被移到了堆内存中的一个叫做 "String Table" 的数据结构中。

需要注意的是，虽然字符串是不可变的，但是可以通过 StringBuilder 或 StringBuffer 类来进行字符串的动态修改。这些类允许在原始字符串上进行插入、删除、替换等操作，但是每次操作都会生成一个新的字符串对象。



## 创建String对象

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


## String的不可变特性

   长度不能改变 数组地址不让改变 数组属性私有的我们操作不了

   JDK9之前 String类中数据是存在char数组 value `private final char[] value;` 
   JDK9后 String类中数据是存在byte[]数组 value `private final byte[] value;` 使用了 latin1 编码

   体现在两个地方   **长度**及**内容**
   - 长度--->final修饰的数组   数组长度本身不能变  final修饰数组的地址也不变
   - 内容--->private修饰的属性  不能在类的外部访问（保证了数组里面的内容也没法改变）

## **常用的方法**
        
- `boolean = equals(Object obj);`
  
继承自Object 重写啦  比较两个字串中的字面值是否相等

equals默认比较地址 `this==obj ` String重写啦 改成了比字符串内容(JDK9之前里面循环char数组 比较每一位字符是否相等，JDK9之后循环byte数组,比较每一位byte是否相等)

- `int = hashCode();`
  
默认hashCode是返回内存地址，调用一个本地的native方法进行计算

这里继承自Object后 重写了 将当前字符串的每一个char元素拆开 乘以31求和

```java
// unicode码 a=97 b=98 c=99
//  str.hashCode();// 
// "abc"   h=0
// h = (0*31+97)
// h = (97)*31+98
// h = ((97)*31+98)*31+99
```
- `int = compareTo(String str);`
  
实现自Comparable接口 

按照字典(Unicode编码)索引的顺序比较 （循环长度最短的那一个）循环过后发现所有的字符都一样 就 length1-length2 返回0表示两个字符相等 

按照字典(Unicode编码)索引的顺序比较 循环比较如果出现不一样就返回这两个字符的(Unicode编码)索引差值

- `String = toString();`
  
继承自Object 输出 类名@hashCode（16进制形式） **这里重写啦**   输出字符串中的字面值

- `char = charAt(int index);`
  
"abc"   0-->a

返回给定index对应位置的那个char值

- `int = codePointAt(int index);` (可以利用这个实现生成密钥)

"abc"   0-->97 
```java

String str = "abcdef";
String result = "";
for(int i=0;i<str.length();i++){
  int value = str.codePointAt(i);
  System.out.println(value);
  result += (char)(value-48);//密钥  U盾 这里自己定义加减乘除多少
  System.out.println(result);
}
System.out.println(result);//-->123456
```
  
返回给定index对应位置的那个char所对应的Unicode码

- `int = length();`
  
返回字符串的长度（其实底层就是返回char[] value 属性的长度）

**注意：** 数组是`length`属性 String是`length()`方法 集合是`size()`方法

- `String = concat(String);`
  
将给定的字符串拼接在当前字符串之后

```java
//由于String的不可变特性 每次拼接（+ 或者 concat）都是创建一个新的String
String str = "abcdef";
str = str.concat("g");
//创建一个新的String对象  (字符串常量池)  value属性  7个
//刚才那个String对象value值依次取出来  存入新对象的value属性 g放在后面 在返回这个新的String
System.out.println(str);//abcdefg 
//String的不可变特性

String str = "a"+"b"+"c"+"d";//数学计算  拼接符号
System.out.println(str);//过程中产生了几个String对象? 字符串常量池7个
//1对象-->value[] a       "a"
//2对象-->value[] b       "b"
//3对象-->value[] {a,b}  "ab"
//4对象-->value[] c       "c"
//5对象-->value[] {a,b,c} "abc"
//6对象-->value[] d       "d"
//7对象-->value[]         "abcd"

String str = "a";
long time1 = System.currentTimeMillis();
for(int i=1;i<=200000;i++){
        //str+="a";//每一次利用+在原来的字符串后面拼接一个新的a   9447毫秒
        str = str.concat("a");//利用concat拼接字符        5324毫秒
        //StringBuffer对象  拼接效率非常高  像以前自己封装的ArrayBox 使用动态扩容的形式
}
long time2 = System.currentTimeMillis();
System.out.println(time2-time1);
```

开发中频繁的拼接字符串--->通常使用StringBuilder/StringBuffer

- `boolean = contains(CharSequence s);`
  
判断给定的s是否在字符串中存在

```java
 String str = "abcdefg";
 //判断此字符串中是否含有a
 boolean value = str.contains("a");
 System.out.println(value);
```

- `startsWith(String prefix); endsWith(String suffix);`
   
判断此字符串是否已xx开头/结尾

```java
 String str = "TestString.java";
 boolean value = str.endsWith(".java");
 boolean value1 = str.startsWith("Test");
 System.out.println(value);
```

- `char[] = toCharArray(); byte[] = getBytes(); getBytes(String charsetName);`
     
将当前的字符串转化成数组   "我爱你中国"   char[]  '我' '爱' '你' '中' '国'

```java
 String str = "我爱你中国";
 byte[] b = str.getBytes();
 for(byte v:b){
     System.out.println(v);//byte
 }
 char[] c = str.toCharArray();
 for(char v:c){
     System.out.println((int)v);//char
 }
```

- `int index = indexOf(int/String str [,int fromIndex] );int index = lastIndexOf(int/String str [,int fromIndex] );` 

找寻给定的元素在字符串中(第一次/最后一次)出现的索引位置   若字符串不存在则返回-1


不论从哪儿开始找寻 返回的index都是相对于整个String的
```java
 String str = "abcdefgabc";
 int index = str.lastIndexOf("b");
 int i = str.indexOf("a");
 int ii = str.indexOf("a");
 System.out.println(i);//0  
 System.out.println(i,1);//7 
 System.out.println(index);//8 

- `lastIndexOf(int/String str , [int fromIndex]);`
```

- `boolean = isEmpty();`

判断当前字符串是否为空字符串  (length是否为0)

**注意：** 与null之间的区别 `null`是空指针这变量没有没有指向任何地址 `isEmpty`空是有string字符串只是字符串内容是空

- `replace();replaceAll();replaceFirst();` 

将给定的字符串替换成另外的字符串, `replace` 是直接替换字符序列所有匹配项，而 `replaceAll` 则支持使用正则表达式进行替换,`replaceFirst` 方法只替换第一个匹配项，而不是替换所有匹配项。


- `String[] = split(String regex [,int limit限度界限]);`

按照给定的表达式将原来的字符串拆分开的

- `String = substring(int beginIndex [,int endIndex]);`

将当前的字符串截取一部分   

从beginIndex开始至endIndex结束  `[beginIndex,endIndex)`

若endIndex不写 则默认到字符串最后

- `String = toUpperCase(); String = toLowerCase()`

将全部字符串转换成大写/小写- `String = trim();`

去掉字符串前后多余的空格

- `boolean = matches(String regex)`

regular有规律的 expression表达式  （正则表达式）













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
   
