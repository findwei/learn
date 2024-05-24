# 日期时间相关

## Date类

操作整个日期 （Calendar类可以操作单个）

Date类 有多个包有这个类 ，通常使用的是java.util包

1. 通常使用无参数的构造方法  或者带long构造方法
2. Date类中常用的方法
```java
    Date date1 = new Date(new Date().getTime()-15000);//15分钟之前的时间
    Date date2 = new Date();//默认就是用当前的系统时间构建的date对象
    System.out.println(date2);//重写了toString  格林威治格式Fri Dec 21 12:12:12 CST 2018
    boolean x = date1.before(date2);//date1是否在date2之前
    boolean y = date1.after(date2);//date1是否在date2之后
 //date对象中应该有一个long的属性 time
    date1.setTime(1545365012877L);//设置date1的时间 毫秒值
    long reTime= date1.getTime();//获取date1的时间 毫秒值
    System.out.println(x+"--"+y);
    System.out.println(date2.compareTo(date1));//按照顺序比较  -1调用在前参数在后  1刚好相反
    before();  after();
    setTime()  getTime();----->long
    compareTo();   -1  1  0
```

## DateFormat类

可以处理一个Date日期的格式

包java.text 需要导包使用

1. 此类是一个抽象类  不能创建对象   子类来使用
2. SimpleDateFormat类   是DateFormat的子类
3. 调用带String参数的构造方法创建format对象
```java
// yyyy-MM-dd HH:mm:ss 这里查看官方文档（一般和前端差不多）
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String v = sdf.format(date1);//通过sdf对象将date1格式化成你描述的样子
```

## Calendar类   1.1版本（包括1.1）后才有

可以操作当个 例如：只操作年

所属的包java.util  需要导包

有构造方法,用`protected`修饰的, 通常访问不到, 通常会调用默认的getInstance()方法;
```java
Calendar calendar = Calendar.getInstance();//系统当前时间的calendar对象
//打印calendar 重新了tostring 
System.out.println(calendar);// java.util.GregorianCalendar[name=value,name=value]
calendar.set(Calendar.YEAR,2015);
int year = calendar.get(Calendar.YEAR);//获取年
int month = calendar.get(Calendar.MONTH);//从0开始数  获取月
int day = calendar.get(Calendar.DAY_OF_MONTH);//获取日
System.out.println(year+"--"+month+"--"+day);
```

## TimeZone类

所属的包java.util 包

可以通过`calendar对象.getTimeZone()`获取  或   `TimeZone.getDefault();`

**常用方法**

```java
    TimeZone tz = calendar.getTimeZone();
    //TimeZone tz = TimeZone.getDefault();
    tz.getID()	   //    Asia/Shanghai
    tz.getDisplayName()  // 中国标准时间

    System.out.println(tz);
    System.out.println(tz.getID());
    System.out.println(tz.getDisplayName());
```



## 日期的常用方法

```java
after()  before()
setTime()  getTime()//---->Date Date类
getTimeInMillis()//----time System类
getTimeZone()//---TimeZone TimeZon类
//Calendar类里面包含一个date属性  可以操作date的某一个局部信息
//set   get
calendar.set(Calendar.YEAR,2015);
        int year = calendar.get(Calendar.YEAR);
```

## Scanner类与System类

 ### Scanner类

1. 所属的包java.util包  需要import导包
2. 通过一个带输入流的构造方法创建对象
3. 常用方法   ` nextInt()  nextFloat()   next()   nextLine()`

### System类

1. 所属的包java.lang包 不需要导入
2. 不需要创建对象  通过类名就可以访问
3. 有三个属性及若干的方法
    - 三个属性`out`“标准”输出流   `in`“标准”输入流   `err`“标准”错误输出流。
    - 常用方法`gc()  exit(0);  currentTimeMillis();`
```java

    //返回当前系统时间与计算机元年之间的毫秒差
    //1970-1-1  00:80:00
    long time = System.currentTimeMillis();

```