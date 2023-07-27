[TOC]



# 面向对象

> 面向对象是一种编程思想
>
> 解决问题的时候按照现实生活中的规律来考虑问题
>
> 考虑在这个问题的过程中   有几个实体参与进来
>
> 理解为  实体动作动作的支配者  没有实体动作就发生不了

## 类和对象(属性or方法)

类的内部成员

属性---静态描述类的特征(变量 存值)  

方法---动态描述类的行为(做事情)      

构造方法---用来创建当前类的对象(方法 很特殊)

程序块(代码块)---理解为就是一个方法(非常特殊的  无修饰符无参数无返回值无名字)

```java
public class Person {

    public String name;
    public int age;
    public String sex;

    public Person(){
        System.out.println("我是无参数的默认的构造方法");
    }
    public Person(String name,int age,String sex){
        this();
        System.out.println("我是带参数的构造方法");
        //创建了一个对象(开辟空间)
        this.name = name;//如果属性与变量重名?
        this.age = age;
        this.sex = sex;
        //返回了创建的这个对象空间的引用
    }

    {
        System.out.println("我也是一个块 哈哈");
    }
    {
        System.out.println("我是一个普通的程序块");
    }
    {
        System.out.println("我又是一个块");
    }

    // 权限修饰符 类名一致的方法名(参数列表)[异常]{方法体}
    // 只有这么一个特殊的方法 名字是大写字母
    // 少了结构 特征修饰符(没有) 返回值类型(结构没有)
//    public Person(){
//        System.out.println("我是Person类的构造方法");
//    }
//    public Person(String x){
//        System.out.println("我是带String参数的构造方法");
//    }

    public void est(){
        System.out.println("人类的吃饭方法");
    }
    public String tellName(){
        return "";
    }

}
```



```
类----人类    
		抽象笼统的概念  描述一类事物  肯定是具有相同的特征行为
		人类有名字  有年龄  有性别-----静态描述特征(特征)-----属性
		人类能吃饭  能说话  能学习-----动态动作行为(做事)-----方法
		
对象--具体的人    
		人类中的一个具体的人   张三
		张三这个具体的人  	有名字  有年龄  有性别
			              能吃饭  能说话  能学习
	
在现实生活中  对象是先有的  总结出来的概念(类) 后产生的
在计算机中利用面向对象的思想来做事
		需要先自己定义(描述)一个类(型)
		想要做事情 需要在描述的类中创建一个具体的个体(对象)出来
		个体(对象)来做事
```

```java
	/*
	如何在计算机中创建(描述)一个类
	1.先创建一个类class
	2.类的里面 利用属性或方法去描述这个类
	3.创建一个当前类的对象  让对象调用属性/方法做事
		对象的创建在哪儿都可以
	*/
public class Person {
        //属性--静态描述特点
        //  必要的组成部分
     // 修饰符  数据类型 属性名字 [= 值];
        public String name;//全局变量
        public int age;
        public String sex;//

        //*方法--描述可以做什么事情(动作)

}

public class Test {
    //这个类没有什么现实意义
    //只是为了将主方法写在这里

    public static void main(String[] args){
        //想要在这里使用一个人 来执行操作
        //创建一个人类的对象  找一个空间来存储
        Person p = new Person();//p的小人 也有自己的名字 年龄 性别 有没有值???
        //通过对象. 去调用属性  存值/取值
        //属性是有默认值   name==null  age==0   sex==null
           p.name = "李四";
           p.age = 18;
           p.sex = "男";
          Person p1 = p;//p1另外的一个小人  也有自己的 名字 年龄 性别
           p1.name = "张三";
           p1.age = 16;
           p1.sex = "女";
       	 System.out.println(p.name+"今年"+p.age+"岁,性别是"+p.sex);
			System.out.println(p1.name+"今年"+p1.age+"岁,性别是"+p1.sex);
        // 输出是一样的因为 p是对象引用类型 p1=p 只是把引用地址拿过去 最终指向一个内存空间
    }
}

```

![类的加载与对象的创建](https://raw.githubusercontent.com/findwei/learnImages/main/java/类的加载及对象的创建.jpg)

类中的方法

`权限修饰符 [特征修饰符] 返回值类型 方法名字 (参数列表) [抛出异常]  [{方法体}]`

形参和实参

​        	形参可以理解为是方法执行时的临时变量空间  x

​        	实参可以理解为是方法调用时传递进去的参数  a

​        	方法调用时会将实参的内容传递给形参

​        	**如果内容是基本类型  传递的 是值    形参改变  实参不变**

​        	**如果内容是引用类型  传递的 是引用  形参改变  实参跟着改变**



## 命名规则和规约

规则

​	   字母 区分大小写

​	   数字 不能开头

​	   符号 _ $

​	   中文 不推荐使用

​	规约

​	   `类名字`  大驼峰

​	  ` 属性/方法/变量`  驼峰式命名规约  小驼峰

​	   `构造方法`   与类名一致  

​	 `  静态常量 `  全部字母大写  通过_做具体说明    BOOKSTORE_ADMIN

​	   `包名`         全部字母小写  Java关键字都是小写  注意与关键字不要冲突

​	所有的名字最好--->见名知意(增强可读性   层次关系缩进  见名知意  注释)

```java
public class TestFunctions {

        //*10.设计一个方法 用来实现用户登录认证(二维数组当作小数据库)
    //      是否需要条件? 需要提供账号名和密码  需要返回值 登录成功与否的结果

    //1.需要有小数据库---存储用户真实的账号和密码
    private String[][] userBox = {{"郑中拓","123456"},{"渡一教育","666666"},{"Java","888"}};
    public String login(String user,String password){
        //4.进行校验
        String result = "用户名或密码错误";
        for(int i=0;i<userBox.length;i++){
            if(userBox[i][0].equals(user)){
                if(userBox[i][1].equals(password)){
                    result = "登录成功";
                }
                break;
            }
        }
        return result;
    }


    //9.设计一个方法  给数组进行排序(既能升序又能降序)
    //      是否需要提供条件---数组 提供一个排序的规则boolean  返回值---不用
    //      flag==true升序排列   flag==false降序排列
    public void orderArray(int[] array,boolean flag){
        for(int i=1;i<array.length;i++){//控制执行的轮次---数组的长度
            for(int j=array.length-1;j>=i;j--){//控制比较4次
                //什么情况下可以进行元素的互换
                // (flag==true && array[j]<array[j-1]) || (flag==false && array[j]>array[j-1])
                if((flag==true && array[j]<array[j-1]) || (flag==false && array[j]>array[j-1])){
                    int temp = array[j];
                    array[j] = array[j-1];
                    array[j-1] = temp;
                }
            }
        }
    }
    
    //8.设计一个方法  用来存储给定范围内的素数(2-100) 素数在自然数之内
    //      是否需要提供条件  begin end   返回值一个装满了素数的数组
    public int[] findPrimeNum(int begin,int end){
        if(begin<0 || end<0){
            System.out.println("素数没有负数 不给你找啦");
            return null;//自定义一个异常  认为规定的一种不正常的现象
        }
        if(begin>=end){
            System.out.println("您提供的范围有误 begin应该比end要小");
            return null;//自定义一个异常  认为规定的一种不正常的现象
        }
        //创建一个足够长的数组
        int[] array = new int[(end-begin)/2];
        int index = 0;//记录新数组的索引变化   同时记录个数
        for(int num=begin;num<=end;num++){
            boolean b = false;//标记
            for(int i=2;i<=num/2;i++){
                if(num%i==0){
                    b = true;
                    break;
                }
            }
            if(!b){
                array[index++] = num;
            }
        }
        //将数组后面的多余的0去掉
        int[] primeArray = new int[index];
        for(int i=0;i<primeArray.length;i++){
            primeArray[i] = array[i];
        }
        array = null;
        return primeArray;
    }

    //扩展 设计一个方法  将给定的元素插入数组的某一个位置
    //7.设计一个方法  用来去掉数组中的0元素
    //      需要提供参数一个数组  需要提供删除的元素是什么    返回值 一个新的数组
    public int[] removeElementFromArray(int[] array,int element){
        //找寻原数组中去掉被删除元素后的长度
        int count = 0;//记录非删除元素的个数
        for(int i=0;i<array.length;i++){
            if(array[i]!=element){
                count++;
            }
        }
        //通过找到的count创建一个新数组
        int[] newArray = new int[count];
        int index = 0;//控制新数组的索引变化
        //将原来数组中非删除的元素存入新数组中
        for(int i=0;i<array.length;i++){
            if(array[i]!=0){
                newArray[index++] = array[i];
            }
        }
        //将新数组返回
        return newArray;
    }

    //5.设计一个方法  用来合并两个数组
    //      是否需要参数  需要提供两个数组   需要返回一个大的数组
    public int[] mergeArray(int[] a,int[] b){
        //创建一个新的数组
        int[] newArray = new int[a.length+b.length];
        //分别将a和b数组的元素存入新数组内
        for(int i=0;i<a.length;i++){
            newArray[i] = a[i];
        }
        for(int i=0;i<b.length;i++){
            newArray[a.length+i] = b[i];
        }
        //将新数组返回
        return newArray;
    }

    //6.设计一个方法  用来将一个数组按照最大值位置拆分
    //      需要提供一个大的数组  需要返回值二维数组
    public int[][] splitArray(int[] array){// 1 2 3 9 4 5
        //找寻最大值索引位置
        int max = array[0];//记录最大值
        int index = 0;//记录最大值的索引位置
        for(int i=1;i<array.length;i++){
            if(array[i]>max){
                max = array[i];
                index = i;
            }
        }
        //通过找寻到的index判定数组拆分后的前后长度
        int[] newa = new int[index];
        int[] newb = new int[array.length-index-1];
        //分别将两个小数组填满
        for(int i=0;i<newa.length;i++){
            newa[i] = array[i];
        }
        for(int i=0;i<newb.length;i++){
            newb[i] = array[(index+1)+i];
        }
        //将两个新的小数组一起返回
        return new int[][]{newa,newb};
    }

    //4.设计一个方法  用来找寻给定的元素是否在数组内存在(Scanner输入一个)
    //      是否需要参数及返回值   需要提供一个数组  需要一个目标元素   返回值告诉你是否找到啦
    // 方法设计了返回值类型  就必须给返回值  编译检测的悲观性原则
    public String isExist(int[] array,int element){
        //循环方式找寻是否存在
        String result = "对不起 您要的值在数组中没有";
        for(int i=0;i<array.length;i++){
            if(array[i]==element){
                result = "恭喜您 您要的值在数组中存在";
                break;
            }
        }
        return result;
    }

    //3.设计一个方法  用来寻找数组中的极值(最大值 或 最小值)
    //      是否需要参数及返回值   需要提供一个数组  需要提供一个值(最大 最小)   返回值肯定需要一个值
    public int findMaxOrMinNum(int[] array,boolean flag){//flag==true最大值  flag==false最小值
        //2.找一个变量
        int temp = array[0];
        //3.利用遍历数组的方式挨个与max比较
        for(int i=1;i<array.length;i++){
            if(flag && array[i]>temp){//找寻最大值
                    temp = array[i];
            }else if(!flag && array[i]<temp){//找寻最小值
                    temp = array[i];
            }
        }
        //3.将找到的值返回
        return temp;
    }

    //*2.设计一个方法  用来交换一个数组(头尾互换)
    //      是否需要参数及返回值   需要提供一个数组   不需要返回值
    public void changeArrayElements(int[] array){
        //2.数组内部的元素头尾对应互换
        for(int i=0;i<array.length/2;i++){
            int temp = array[i];
            array[i] = array[array.length-1-i];
            array[array.length-1-i] = temp;
        }
    }

}

```

## 方法重载 overload

**概念**：一个类中的一组方法  **相同的**方法名字  **不同的**参数列表   这样的一组方法构成了方法重载

​		不同参数列表指 `参数的个数   参数的类型   参数的顺序`
​		
**作用**：为了让使用者便于记忆与调用   只需要记录一个名字  执行不同的操作

**设计方法重载**

​		调用方法的时候  首先通过方法名字定位方法

​		如果方法名字有一致  可以通过参数的数据类型定位方法

​		**如果没有与传递参数类型一致的方法  可以找到一个参数类型可以进行转化(自动)**

**JDK1.5版本之后 出现了一个新的写法**

​		int... x	动态参数列表	类型固定	个数可以动态 0--n都可以

​		x本质上就是一个数组  有length属性  有[index]

​		动态参数列表的方法   不能  与相同意义的数组类型的方法构成方法重载  本质是一样的
​		动态参数列表的方法 可以不传参数 相当于0个 数组的方法 必须传递参数

​		动态参数列表在方法的参数中只能存在一份 ,且必须放置在方法参数的末尾

```java
public class TestOverload {

    public void test(int...x){//本质数组  
        int[] x = {1,2,3,4,5,6};
        System.out.println("执行了test方法携带动态列表");
        for(int i=0;i<x.length;i++){
            System.out.println(x[i]);
        }
    }
       public void test(){
           System.out.println("执行了test方法没有携带参数");
        }
       public void test(boolean b){
            System.out.println("执行了test方法带boolean参数"+b);
        }
       public void test(char c){
            System.out.println("执行了test方法带char参数"+c);
        }
       public void test(int i){
           System.out.println("执行了test方法带int参数"+i);
       }
       public void test(String s){
            System.out.println("执行了test方法带String参数"+s);
       }


    public static void main(String[] args){
        //1.创建对象
        TestOverload to = new TestOverload();
        to.test(1,2,3,4);
			
        //如果传递的参数类型的方法没有定义 就会自动转换参数类型 匹配有定义的方法，如果参数不能发生转换或者转换后还匹配不到就会报错
//        to.test((char)99);//方法参数传递  类型之间的转化问题
        //通过对象.方法名字  调用方法   可以直接通过方法名字定位方法
        //如果方法名字一致   通过方法的参数列表类型 来定位方法
        //2.通过对象调用方法  方法执行一遍
        //to.test(true);//不传参数 不行     传参数 参数类型不匹配  不行

    }

}

```



## 构造函数

作用: 只有一个 构建(构造)当前类的对象

写法:      权限修饰符  与类名一致的方法名 (参数列表) [抛出异常]{
			一件事情  创建一个对象(当前类Person)
			返回对象;
		 }

用法: 通过new关键字调用

特点: 
		1.每一个类都有构造方法，若自己在类中没有定义，系统会默认提供一个无参数的构造方法

​		   若在类中自己定义了构造方法，则默认无参数的构造方法即被覆盖

​		2.**构造方法是存在构造方法重载**

​			每一个类都有构造方法

**this关键字的使用**

​		用来代替某一个对象

​		可以调用一般属性或一般方法  放置在任何类成员中

​		可以调用构造方法  只能放在另一个构造方法内 只能放在程序的第一行

类里面的方法来会调用报错（StackOverflowError）

![方法来回调用可能产生栈内存溢出错误](https://raw.githubusercontent.com/findwei/learnImages/main/java/方法来回调用可能产生栈内存溢出错误.jpg)

## 程序块(代码块)

​	1.作用: 跟普通方法一样 做事情的

​	2.写法: 可以认为程序块是一个  没有修饰符 没有参数 没有返回值 没有名字的特殊方法

```
{
		}
```

​	3.用法: 块也需要调用才能执行 我们自己调用不到(没有名字)
​		每一次我们调用**构造方法之前**   系统会帮我们自动的调用一次程序块 让他执行一遍
​	4.特点: 没有什么重载的概念(压根连名字都没有 连参数都没有)
​		但是可以在类中定义 多个程序块

​	5.块可以在里面写一些程序   我想要在创建对象之前执行



## Scanner 小知识

```
        1.导包             java.util
		2.创建对象	        Scanner input = new Scanner(System.in);
		3.做事情	        int value = input.nextInt();
			        String value = input.nextLine();

		nextInt(nextFloat nextByte)  next  nextLine
		1.读取方式上来讲   大家都以回车符作为结束符号
			除了nextLine以外其余的方法都不读取回车符
		2.读取的返回结果来讲  nextInt-->int   nextFloat--float
				next--String   nextLine-->String
				next方法看到回车或空格都认为结束   nextLine只认为回车符结束
				输入abc   def   g		        输入abc   def   g
				abc			        abc   def   g
		3.利用包装类做String与基本类型的转化问题
			int value = Integer.parseInt("123");//如果字符串不是一个整数形式 就会产生
			Float.parseFloat("123.34");
```

![Scanner读取问题](https://raw.githubusercontent.com/findwei/learnImages/main/java/Scanner读取问题.jpg)