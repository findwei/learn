# StringBuffer/StringBuilder

所属的包  java.lang包，继承AbstractStringBuilder 间接继承 Object 
		
StringBuffer/StringBuilder 实现接口`Serializable`,`CharSequence`,`Appendable`

StringBuffer/StringBuilder 没有compareTo方法，因为没有实现`Comparable<String>`

StringBuffer/StringBuilder含有一个String没有的方法 append();拼接

StringBuffer/StringBuilder基本相同

StringBuffer/StringBuilder的不同,StringBuffer是早期版本

|               | 版本                      | 线程                                         |
| ------------- | ------------------------- | -------------------------------------------- |
| StringBuffer  | 早期版本1.0（早期版本）   | 线程同步（安全性比较高  执行效率相对较低）   |
| StringBuilder | 后来的版本1.5（后期版本） | 线程非同步（安全性比较低  执行效率相对较高） |

StringBuffer/StringBuilder类不一定需要 ，是为了避免String频繁拼接修改字符串信息的时候才用的，底层数组是可变的  提高了性能
```java
       String str = "a";
       long time1 = System.currentTimeMillis();
       for(int i=1;i<=200000;i++){
           //str+="a";//利用+拼接  10030
           str = str.concat("a"); //5320
       }
       long time2 = System.currentTimeMillis();
       System.out.println(time2-time1);

       StringBuilder builder = new StringBuilder("a");//17
       long time1 = System.currentTimeMillis();
       for(int i=1;i<=200000;i++){
           builder = builder.append("a");//7毫秒
       }
       long time2 = System.currentTimeMillis();
       System.out.println(time2-time1);
```

## 特性

可变字符串  `char[] value;` 没有使用`private final`修饰  可以动态扩容
		
## 对象的构建

```java

    //无参数构造方法  构建一个默认长度16个空间的对象  char[]
    StringBuilder builder = new StringBuilder();
    //利用给定的参数 构建一个自定义长度空间的对象 char[]
    StringBuilder builder = new StringBuilder(20);
    //利用带String参数的构造方法  默认数组长度字符串长度+16个
    StringBuilder builder = new StringBuilder("abc"); //19个长度

```
## StringBuilder中常用的方法

最主要的方法 append()  频繁的拼接字符串的时候使用此方法 提高性能

`ensureCapacity(int minimumCapacity) ` 确保底层数组容量够用

`capacity();`//字符串底层char[]的容量

`length();`//字符串有效元素个数(长度)

`setLength();`//设置字符串的有效元素个数

`char = charAt(int index);`

`int = codePointAt(int index);`

`String = substring(int start [,int end]);`注意需要接受返回值 看见截取出来的新字符串效果
 
`StringBuilder = delete(int start [,int end]);`

    StringBuilder类中独有的方法String类没有

    将start到end之间的字符串删掉  不用接受返回值就看到效果(修改的原串)

`StringBuilder = deleteCharAt(int index);`

    String类中没有的方法

    将给定index位置的某一个字符删除掉啦

`int = indexOf(String str [,int fromIndex]);`

`int = lastIndexOf(String str [,int fromIndex])`//找寻给定的str在字符串中第一次出现的索引位置  带重载 则从某一个位置开始找
    
`StringBuffer = insert(int index,value);`// 将给定的value插入在index位置之上 带重载
   
`StringBuffer = replace(int start,int end,String str);`

    将start和end之间的部分替换成str

    builder.replace(2,5,"zzt");

`setCharAt(int index,char value);`//将index位置的字符改成给定的value
    
`toString()`// 将StringBuilder对象 构建成一个string对象 返回
   
`trimToSize()`//将数组中无用的容量去掉  变成length长度的数组

**方法总结**

与String类不同的独有方法

`append()  insert()  delete()  deleteCharAt()  reverse()`

与String类相同的方法

`length() charAt() codePointAt() indexOf() lastIndexOf() substring()`

`replace()`名字相同 用法不一致

不是很常用的方法

`ensureCapacity() capacity() setLength() trimToSize(); setCharAt();`

## String和StringBuilder/StringBuffer区别

|              | String                                                                | StringBuilder/StringBuffer                               |
| ------------ | --------------------------------------------------------------------- | -------------------------------------------------------- |
| 特性         | String不可变字符串(不可变体现在长度及内容)                            | 可变字符串(没有final修饰  底层可以进行数组扩容)          |
| 实现接口区别 | `Serializable`, `CharSequence`, `Comparable<String>`                  | `Serializable`,`CharSequence`,`Appendable`               |
| 版本         | JDK1.0                                                                | StringBuilder: JDK1.5 /StringBuffer: JDK1.0              |
| 部分方法     | 一些方法StringBuilder/StringBuffer没有 concat  compareTo  toUpperCase | 一些方法String没有  append() insert() delete() reverse() |


## **String家族笔试中经常容易考察的知识点**
    1.String所属的包 继承关系 实现接口
        java.lang 继承Object 接口Serializable,CharSequence,Comparable

    2.String构建方式
        常量  构造方法  

    3.String对象内存结构
        字符串常量区  new堆内存对象
        ==  equals()区别
        "a"+"b"+"c"

    4.String不可变特性
        长度及内容

    5.String中的常用方法

    6.String和StringBuilder区别   |   String和StringBuffer区别
        String不可变字符串
            JDK1.0
            有一个接口Comparable
            不可变体现在长度及内容
            有一些方法StringBuilder没有 concat  compareTo  toUpperCase
        StringBuilder可变字符串
            JDK1.5
            有一个接口Appendable
            可变字符串  没有final修饰  底层可以进行数组扩容
            有一些方法String没有  append() insert() delete() reverse()

    7.StringBuffer和StringBuilder的不同
        StringBuffer早期版本1.0
        StringBuilder后来的版本1.5
        早期版本  线程同步   	   安全性比较高  执行效率相对较低
        后期版本  线程非同步    安全性比较低  执行效率相对较高