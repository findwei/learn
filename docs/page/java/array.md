[TOC]

# 数组（容器）


数组是一组**数据类型相同的数据组合**，将这些数据统一管理起来

**数组本身是一个引用数据类型**，数组内存储的类型可以是基本类型 也可以是引用类型

数组的特点:
1. 数组本身是一个引用数据类型
2. 数组是在**堆内存**中的一串**连续的地址**存在
3. 数组在初始化时**必须指定长度**
4. 堆内存的数组空间**长度一旦确定**  **不能再次发生改变**
5. **栈内存**的变量中存储的是**数组的地址引用**
6. 数组内部存储的类型可以是基本的 也可以是引用

## 数组的定义(声明)

​		数据类型[]  数组名字;
​		int[] x;
​		char[] y;
​		boolean[] z;
​		String[] m;

## 数组的赋值(初始化)

​		**静态初始化**     有长度  有元素

​			int[] array = {10,20,30,40,50};

​			int[] array = new int[]{10,20,30};

​		**动态初始化**     有长度  没有元素(**不是真的没有,其实里面有默认值**)

​			int[] array = new int[5];

​			整数默认值---0

​			浮点数默认值---0.0

​			字符型默认值---  0---char   97-a  65-A  48-'0'

​			布尔型默认值---  false

​			引用数据默认值--- null	String[]

## 数组元素的访问

​		通过**元素在数组中的位置来访问** (存值/取值)

​		位置---->index索引

​		索引是有取值范围    [从0开始-----数组长度-1]

​		如果数组的**索引超出了上述范围** 会出现一个运行时异常ArrayIndexOutOfBoundsException

​		NegativeArraySizeException 运行时异常 创建数组的时候长度给了负数 **数组的长度不合法**



## 数组元素的遍历(轮询)
​		通过循环的方式访问数组的每一个元素

```
        正常for
		for( ; ; ){
		}
		JDK1.5版本之后   新的特性   增强for循环  加强for   forEach
        加强for
		for(自己定义的变量(接收数组内每一个元素) : 遍历的数组array){}
		for(int a : array){}

		1.正常的for   有三个必要条件  index索引  找到某一个元素的位置
			    可以通过index直接访问数组的某一个位置   存值  取值都可以
			    不好在于写法相对来说比较麻烦
		2.增强的for   有两个条件    用来取值的变量  用来遍历的数组  没有index索引
			    好处写法相对比较容易
			    不好只能取值  不能存值
			    没有index索引  找不到元素到底是哪一个
```


​		

## 基本数据类型和引用数据类型在内存结构上的区别
​		所有的**变量空间**都**存储在栈内存**

​		变量空间可以存储基本数据类型  也可以存储引用数据类型

​		如果变量空间存储的是基本数据类型  存储的是值  一个变量的值改变  另一个不会跟着改变

​		如果变量空间**存储的是引用数据类型**  **存储的是引用(地址)**  一个**变量地址对应的值改变** 另一个**跟着改变**

![基本类型&引用类型内存区别](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/基本类型&引用类型内存区别.jpg)

# 数组练习案例



```
public class SaveNum{
	public static void main(String[] args){
		//1.需要创建一个数组
		int[] array = new int[50];//有长度  元素没有(默认值)
		//2.需要将1-100之间的偶数存入数组内
		for(int i=0;i<array.length;i++){//执行50次  从几数都可以  觉得从0开始数比较方便
			array[i] = 2*i+2;
		}
		//3.输出验证看一看
		for(int v:array){
			System.out.println(v);
		}
	}
}
```

```
public class TestArray{
	public static void main(String[] args){
		// 基本数据类型
		int a = 10;
		int b = a;
		b = 100;
		System.out.println(a);//  10
		
		//引用类型
		int[] x = new int[]{10,20,30};
		//栈内存中的小容器  类型定义了只能存储这种东西  容器中只能存一份
		//见到new关键字  相当于 在堆内存中申请开辟一块新的空间
		//数组在堆内存的空间形态  是一串连续的地址
		//基本类型变量空间存储的是值  传递的就是值   一个改变 另一个不变
		//引用类型变量空间存储的是地址(引用)  传递的就是引用  一个改变 另一个跟着改变
		int[] y = x;
		y[0] = 100;
		System.out.println(x[0]);//输出100
		
		/*
		//NegativeArraySizeException 运行时异常 创建数组的时候长度给了负数 数组的长		度不合法
		int[] array = new int[5];
		array[0] = 10;
		array[1] = 20;
		array[5] = 100;//ArrayIndexOutOfBoundsException
		*/

		//int[] array = new int[]{10,20,30,40,50};
		//通过元素在数组中的位置index(索引 下标)来访问
		//array[index];
		//从数组内取得某一个位置的元素
		//int value = array[4];
		//System.out.println(value);
		//向数组内的某一个位置存入元素
		//array[3] = 400;
		//索引有范围的

		//int value = array[5];
		//System.out.println(value);
		//异常---运行时异常
		//ArrayIndexOutOfBoundsException  数组索引越界
		//index索引    0开始-----数组(长度-1)结束

		//将数组中的每一个元素都拿出来看一看
		/*
		for(int index=0;index<5;index++){//每一次做一样的事情  取数组的值  5次
			int value = array[index];
			System.out.println(value);
		}
		System.out.println("-----我是一个华丽的分隔符-----");
		//使用增强for 简化上面代码
		for(int value : array){
			System.out.println(value);
		}
		*/
	}
}

```
```java
public class Test1{
	//*1.给定两个数组a{1,2,3,4}  b{5,6,7,8} 将两个数组内的元素对应位置互换
	public static void main(String[] args){
		//1.创建两个数组
		int[] a = {1,2,3,4};
		int[] b = {5,6,7,8,9,0};
		//2.元素对应位置的互换  ----  每一次交换两个数字  换四次
		//方式二  直接交换变量a和b中的数组引用(地址) 没有循环一次搞定啦 不受长度限制
		int[] temp = a;
		a = b;
		b = temp;
		//方式一  交换数组中对应的元素(循环次数好多次 受长度的限制)
		/*for(int i=0;i<a.length;i++){//为了控制四次
			int x = a[i];
			a[i] = b[i];
			b[i] = x;
		}*/
		//3.分别输出两个数组元素看一看
		for(int v:a){
			System.out.println(v);
		}
		System.out.println("--------");
		for(int v:b){
			System.out.println(v);
		}
	}
}
```

```java
public class Test2{
	//2.给定一个数组a{1,2,3,4,5,6} 将这个数组中的元素头尾对应互换位置
	public static void main(String[] args){
		int[] array = {1,2,3,4};
		for(int i=0;i<array.length/2;i++){//控制交换的次数 数组长度的一半
			int x = array[i];
			array[i] = array[(array.length-1)-i];
			array[(array.length-1)-i] = x;
		}
		for(int v:array){
			System.out.println(v);
		}
	}
}
```

```java
public class Test4{
	//*4.给定一个数组a{1,3,5,7,9,0,2,4,6,8} 找寻数组中的最大值和最小值(极值问题)
	public static void main(String[] args){
		int[] a = {1,3,5,7,9,2,4,6,8};
		//1.创建一个变量   当作小本本   记录信息
		int min = a[0];
		int max = a[0];
		//2.挨个寻找数组中的元素  与变量中的元素进行比较 
		for(int i=1;i<a.length;i++){
			if(a[i]<min){
				min = a[i];
			}
			if(a[i]>max){
				max = a[i];
			}
		}
		System.out.println("数组中的最小值为:"+min);
		System.out.println("数组中的最大值为:"+max);
	}
}
```

```java
public class Test5{
	//5.给定两个数组a{1,2,3}  b{4,5} 合并两个数组 (创建一个新的数组5长度)
	public static void main(String[] args){
		//1.创建两个数组
		int[] a = {1,2,3};
		int[] b = {4,5};
		//2.因为数组长度一旦确定 不能再次改变  需要创建一个新的数组
		int[] newArray = new int[a.length+b.length];//只有长度 元素默认值0
		//3.思路二:想要将新数组填满
		for(int i=0;i<newArray.length;i++){
			if(i<a.length){//新数组的索引位置还没有a数组长度以外的范围
				newArray[i] = a[i];
			}else{
				newArray[i] = b[i-a.length];
			}
		}
		//3.思路一:分别将a和b数组中的元素存入新数组内
		/*
		for(int i=0;i<a.length;i++){//将所有a数组元素存入新数组内 
			newArray[i] = a[i];
		}//  newArray--->{1,2,3,0,0}
		for(int i=0;i<b.length;i++){//将b数组元素取出来 存入新数组后面位置
			newArray[a.length+i] = b[i];
		}//  newArray--->{1,2,3,4,5}
		*/
		//4.验证一下看一看
		for(int v:newArray){
			System.out.println(v);
		}
	}
}
```

```java
public class Test7{
	//*7.给定一个数组a{1,2,3,0,0,4,5,0,6,0,7} 去掉数组中的0元素 (创建一个新数组 短的 非零元素挑出来)
	public static void main(String[] args){
		//1.需要一个数组
		int[] oldArray = new int[]{1,2,3,0,0,4,5,0,6,0,7};
		//2.找寻原数组中的非零元素个数--->才能确定新数组的长度
		int count = 0;//记录原数组中非零个数
		for(int i=0;i<oldArray.length;i++){
			if(oldArray[i]!=0){
				count++;
			}
		}
		System.out.println("原数组非零元素的个数:"+count);
		//3.创建一个新的数组 装原数组中的非零元素
		int[] newArray = new int[oldArray.length];//扩展思路二--->可以创建一个足够长的数组
		//4.将原数组中非零元素挑出来  存入新数组中
		int index = 0;//控制新数组的索引变化
		for(int i=0;i<oldArray.length;i++){
			if(oldArray[i]!=0){
				newArray[index++] = oldArray[i];
				//index++;
			}
		}
		//5.旧数组我觉得没有用啦  删掉
		oldArray = null;
		//5.验证新数组看一看
		for(int v:newArray){
			System.out.println(v);
		}
	}
}
```

```java
public class Test8{
	//8.创建一个数组 存储2-100之间的素数(质数)
	public static void main(String[] args){
		//思路一:空间占用小  执行效率慢
		//0.通过一个几千次循环找寻一个---count
		//1.创建一个数组  长度(刚好的 没有一个空间多余)
		//2.通过一个几千次循环找寻素数  将素数存入数组内

		//思路二:执行效率高 空间占用大
		//0.创建一个足够长的数组
		//1.通过几千次循环找素数  将素数存入数组内
		//2.将存入素数的数组  后面部分0元素去掉


		int[] primeNumberArray = new int[50];
		int index = 0;//记录素数数组索引变化   同时记录素数的个数
		for(int num=2;num<=100;num++){
			boolean b = false;//标识  用来记录最初的状态
			for(int i=2;i<=num/2;i++){//从2--8之间找寻还有没有其他可以整出的数字
				if(num%i==0){//如果还有能整出的数字 证明num不是素数
					//System.out.println(num+"不是素数");
					b = true;//如果满足条件(找到整除 证明不是素数 改变标识)
					break;
				}
			}
			if(!b){
				//System.out.println(num+"是素数");
				primeNumberArray[index++] = num;				
			}
		}//{2,3,5,7,11,13,17,19,23,29...........0,0,0,0,0,0,0,0,0}
		int[] newArray = new int[index];
		for(int i=0;i<newArray.length;i++){
			newArray[i] = primeNumberArray[i];
		}
		primeNumberArray = null;//
		for(int v:newArray){
			System.out.println(v);
		}

		/*
		//0.找寻2-100之间素数的个数--->确定数组的长度
		int count = 0;//用来记录素数的个数
		for(int num=2;num<=100;num++){
			boolean b = false;//标识  用来记录最初的状态
			for(int i=2;i<=num/2;i++){//从2--8之间找寻还有没有其他可以整出的数字
				if(num%i==0){//如果还有能整出的数字 证明num不是素数
					//System.out.println(num+"不是素数");
					b = true;//如果满足条件(找到整除 证明不是素数 改变标识)
					break;
				}
			}
			if(!b){//如果标识与最初的一致 证明循环内的if从来没有执行过  !b <===> b==false
				//System.out.println(num+"是素数");
				count++;
				
			}
		}
		System.out.println("经过找寻,2-100之间素数的个数为:"+count);
		//1.创建一个数组  存素数
		int[] primeNumberArray = new int[count];
		//2.找寻2-100之间的素数  将找到的素数存入数组内
		int index = 0;//创建一个新的变量  记录素数数组的索引变化
		for(int num=2;num<=100;num++){
			boolean b = false;//标识  用来记录最初的状态
			for(int i=2;i<=num/2;i++){//从2--8之间找寻还有没有其他可以整出的数字
				if(num%i==0){//如果还有能整出的数字 证明num不是素数
					//System.out.println(num+"不是素数");
					b = true;//如果满足条件(找到整除 证明不是素数 改变标识)
					break;
				}
			}
			if(!b){//如果标识与最初的一致 证明循环内的if从来没有执行过  !b <===> b==false
				//System.out.println(num+"是素数");
				primeNumberArray[index++] = num;
			}
		}
		//3.输出最终的数组验证一下
		for(int v:primeNumberArray){
			System.out.println(v);
		}

		*/
	}
}
```

![冒泡排序](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/冒泡排序算法.jpg)

```java
public class Test9{
	public static void main(String[] args){
		//int[] array = {5,2,3,1,4};
		//升序排列 --> {1,2,3,4,5} 本质元素位置互换  交换位置的条件
		//冒泡排序的算法
		int[] array = {5,2,3,1,4};
		for(int i=1;i<5;i++){//控制比较轮次  每一轮冒出来一个最小值
			for(int j=4;j>=i;j--){//从数组底端  一直比到顶端  4次
				if(array[j]<array[j-1]){
					int x = array[j];
					array[j] = array[j-1];
					array[j-1] = x;
				}
			}
		}
		for(int v:array){
			System.out.println(v);
		}
	}
}
```

# 多维数组

定义/声明

​		里面存储的类型[]  数组名字;

​		`int[][]  array;`

​		`int[][][] array1;`

初始化

**静态---有长度**  有元素

​`int[][]  array = {{1,2},{3,4,5,6},{7,8,9}}`;

​**动态---只有长度** 没有元素(默认)

​`int[][]  array =new int[3][2];`

​`int[][]  array =new int[3][]`这样写也可以 只是里面数组是指向空指针 如果要使用必须先new一个数组 将引用放到当前指针 否则就会报下面错误

```	java
//int[][] array = new int[3][];//{{},{},{}}
//array[0] = new int[2]; //相当于替换了上面 空指针
//array[0][0] = 10;
//array[0][1] = 20;
​//array--->{{x,x},{x,x},{x,x}} // x默认值0

// ​	可能会产生一个运行时异常
// ​	NullPointerException(空指针异常)
```

二维数组内存结构

![二维数组内存结构](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/二维数组内存结构.jpg)

## 案例

```java
import java.util.Scanner;
//原理见下图 二维数组交换小练习
public class ChangeGroup{
	public static void main(String[] args){
		//创建一个二维数组 用来表示班级里的每一列同学
		int[][] array = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
		//设计每一周交换一次  几周?
		Scanner input = new Scanner(System.in);
		System.out.println("请您输入一个周数,我来告诉您交换后的结果");
		int week = input.nextInt();//6
		for(int i=1;i<=week%4;i++){
			int[] x = array[0];
			array[0] = array[1];
			array[1] = array[2];
			array[2] = array[3];
			array[3] = x;
		}
		//简单看一看
		for(int[] arr:array){
			for(int v:arr){
				System.out.print(v+"\t");
			}
			System.out.println();
		}
	}
}
```
![二维数组交换小练习](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/二维数组交换小练习.jpg)

```java
public class TestArray{
	public static void main(String[] args){

		System.out.println(args.length);//长度
		for(String value : args){
			System.out.println(value);
		}
		
		/*
		// 原理见下图 二维数组笔试题
		int[][] array = new int[3][2];
		array[0][0] = 10;
		array[0][1] = 20;
		array[1] = array[0];
		array[0] = new int[4];
		array[0][0] = 100;
		System.out.println(array[1][0]);//?   10
		*/
		
		//二维数组的动态初始化
		//int[][] array = new int[3][];//{{0,0},{0,0},{0,0}}
		//array[0] = new int[2];
		//array[0][0] = 10;
		//array[0][1] = 20;
		//array[0][2] = 30;//运行时异常ArrayIndexOutOfBoundsException

		/*
		//声明----初始化(静态)
		int[][] array = new int[][]{{1,2},{3,4,5,6},{7,8,9}};
		//访问数组内的元素---index
		//int value = array[0][0];//前面表示小数组位置  后面表示小数组中元素的位置
		//System.out.println(value);//1   array[1][2];//5   array[2][2];//9
		//数组的遍历/轮询
		for(int i=0;i<array.length;i++){//遍历大数组中的小数组
			for(int j=0;j<array[i].length;j++){//遍历每一个小数组中的元素
				int value = array[i][j];
				System.out.print(value+"\t");
			}
			System.out.println();
		}
		System.out.println("-------------");
		for(int[] arr : array){
			for(int value : arr){
				System.out.print(value+"\t");
			}
			System.out.println();
		}
		*/
	}
}
```

![二维数组笔试题](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/二维数组笔试题.jpg)



# 常见的运行时异常

1.InputMisMatchException	输入类型不匹配

​		input.nextInt();  输入一个整数   a

2.ArrayIndexOutOfBoundsException   数组索引越界

​		静态初始化  int[] array = {10,20};

​		array[2]  索引超出边界

3.NegativeArraySizeException   数组长度不合法(长度出现负数)

​		动态初始化  int[] array = new int[-2];

4.NullPointerException    空指针异常

​		引用为null   还拿来使用就不行啦

​		int[] array = null;

​		array[0] = 10;//空元素再拿来用

​		最容易找到异常  同时也是最难找的

# main方法 关键字解释

``` java
public static void main(String[] args){}
```

​	public 访问权限修饰符 公有的

​	static  特征修饰符  静态的 有且只有一份

​	void   方法执行完没有返回值  关键字

​	main  方法名字  主要的

​	主方法中的args参数 可否传递?

​	1.主方法不是我们调用的   JVM虚拟机启动的时候   虚拟机调用的

​	2.主方法里面有args参数  是一个String[]类型  我们是可以传递参数进去  给JVM

