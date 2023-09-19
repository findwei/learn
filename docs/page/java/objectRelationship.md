[TOC]


# 类的关系与继承

  >   **tips小知识**<br/>
  > 	类的个数变多啦--->需要管理类--->包package(可以理解为是一个文件夹)<br/>
  >		在当前包下面的类 第一行会出现package关键字 后面连接包名<br/>
  >		如果package和import同时出现<br/>
  >		先写package后写import<br/>
  >		package只能有一个  import可以有多个<br/>

## 类和类之间的关系

    A is-a  B  =>  泛化(继承   实现)例如：人是动物,人和动物是继承的关系 
    A has-a B  =>  包含(组合   聚合   关联)例如：人有眼睛,人和眼睛是聚合的关系
    A use-a B  =>  依赖(依赖)  (need-a) 

## 继承(is-a)

1. 子类继承父类，通过一个关键字 `extends`
2. 子类的对象可以调用父类中的(public protected)属性和方法
3. 子类可以添加自己独有的属性和方法的
4. 子类从父类中继承过来的属性、方法不能满足子类需要，可以在子类中重写(覆盖)父类的属性、方法
5. 每一个类都有继承类，如果不写`extends`关键字，默认继承`Object`，如果写了`extends`则继承后面那个父类，`Object`是任何一个引用类型的父类(直接或间接的继承Object),Object类没有父类
6. Java中继承是单个存在的(**单继承**)  每一个类只能有一个继承类  (在extends关键字后面只能写一个类) 但是可以通过传递的方式实现多继承的效果  后续还会有多实现
7. **继承在内存中的存储形式**
   
   这里可以按照下面图标理解 实际上面申请的空间是一个
   ![继承在内存中的存储形式](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/objectAdvance/继承关系存储.jpg)
8. **关于this和super的使用**
   
    - `this`和`super`都是指代词  代替的是对象

    - `this`代替的是当前执行方法时的那个对象  不一定是当前类的(因为谁调用`this`指向谁)
    
    - `super`代替的是当前执行方法时的对象的父类对象  空间内部的那个

    - `this`和`super`都能调用一般属性 和 一般方法

    - 可以放置在类成员的任意位置(属性 方法 构造 块) **注意调用一般方法的时候可以来回互相调用(写法 编译好用) 执行可能产生问题(StackOverflowError)**
       
    - 可以调用构造方法(**放在构造方法的第一行**)
  
        `this`和`super`在构造方法中调用另一个类的构造方法不能同时出现在第一行
        
        **构造方法之间不能来回互相调用**(编译就不好用)

--------------------------------------------------------------------

|   /    | 方法重写override                                                                                                                                       | 方法重载overload                               |
| :----: | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
|   类   | 产生两个继承关系的类 - 子类重写父类的方法                                                                                                              | 一个类中的一组方法                             |
|  名字  | 子类与父类一致                                                                                                                                         | 一个类中的好多方法名必须一致                   |
|  参数  | 子类与父类一致                                                                                                                                         | 每一个方法的参数必须**不一致**(个数 类型 顺序) |
| 返回值 | 子类可以**小于等于**父类                                                                                                                               | 没有要求                                       |
|  权限  | 子类可以**大于等于**父类                                                                                                                               | 没有要求                                       |
|  特征  | final:父类方法是final   子类不能重写 <br /> static:父类方法是static  子类不存在 <br /> abstract:父类方法是abstract  子类必须重写                       | 没有要求                                       |
|  异常  | 运行时:父类方法抛出运行时异常,子类可以不予理会  <br/>  编译时:如果父类方法抛出编译时异常,子类抛出异常的个数少于等于父类,子类抛出异常的类型小于等于父类 | 没有要求                                       |
| 方法体 | 子类的方法内容与父类不一致                                                                                                                             | 每一个重载的方法 执行过程不一致                |

-------------------------------------------------------

**小细节知识点补充**

**Object类没有父类**

Object类中的方法

  - hashCode() 将对象在内存中的地址经过计算得到一个int整数 (public native int hashCode()=>native修饰符表明该方法是本机方法（用Java以外的语言实现）)
          
  - equals() 用来比较两个对象的内容  Object默认效果是==

    ==可以比较基本类型(比较值) 可以比较引用类型(比较地址)

    equals方法时Object类中继承过来的方法  默认效果比较地址  

    如果想要改变其规则 可以进行方法重写
    ```java 
    public boolean equals(Object obj){
        return (this == obj);
    }
          ```
  - toString() 打印输出时将对象变成String字符串
  
    ```java
    public String toString(){
        return this.getClass().getName()+"@"+Integer.toHexString(this.hashCode());
    }
    ```
  - getClass() 获取对象对应类的类映射(反射)
  - wait() 线程进入挂起等待状态	存在方法重载
  - notify() 线程唤醒
  - notifyAll() 唤醒所有
  - finalize() 权限修饰符是protected  在对象被GC回收的时候  默认调用执行的方法(类似c++里面的析构函数)
  - clone()	权限修饰符是protected  为了克隆对象


## has-a 包含关系(组合 聚合 关联) 

从Java程序来描述这样的关系  通过一个类的对象当做另一个类的属性来存储

组合 聚合 关联从亲密程度来讲不太一样

- 组合-->人和大脑   人和心脏的关系
  
  整体和部分的关系 不可分割  要出现都出现  要消亡都消亡

- 聚合-->汽车和车轮子    电脑和主板
	
  整体和部分的关系  创建时有可能是分开的

- 关联-->人有汽车   人有电脑
	
  整体和部分的关系  可以分割  后来形成在一起

```java
// 
public class Car {

    //属性
    public String brand;//汽车品牌
    public String type;//型号
    public String color;//颜色
    public Wheel wheel;//车里面有一个轮子--->包含关系

    //构造方法
    public Car(){}
    public Car(String brand,String type,String color,Wheel wheel){
        this.brand=brand;
        this.type=type;
        this.color=color;
        this.wheel=wheel;
    }
    //方法
    public void showCar(){
        System.out.println("这是一辆"+brand+"牌"+type+"型号"+color+"的小汽车");
        System.out.println("车上搭载着"+wheel.brand+"牌的"+wheel.size+"尺寸"+wheel.color+"颜色的车轮子");
        wheel.turn();//方法一定对象调用的  车轮子的方法肯定是车轮子对象调用   可以放置在任何地方
    }
}

public class Wheel {

    //属性
    public String brand;//品牌
    public int size;//尺寸
    public String color;//颜色

    //构造方法
    public Wheel(){}
    public Wheel(String brand,int size,String color){
        this.brand = brand;
        this.size = size;
        this.color = color;
    }

    //方法
    public void turn(){
        System.out.println("车轮子可以旋转");
    }
}
// 使用是 将轮子传进去形成组合 
public class Test {

    public static void main(String[] args){
        Car car = new Car("宝马","Z4","宝石蓝色",new Wheel("米其林",400,"酷黑"));
        car.showCar();//展示汽车
    }
}


```
      
## use-a(need-a)	依赖关系

屠夫  杀  猪		农夫 养 猪

一个类屠夫

  可以做一件事情  杀猪
  需要一头猪

不是整体和部分的关系 某一件事情产生了关系 临时组合在一起 这件事情一旦做完关系即解散

Java程序体现的形式为:

一个类的方法中使用到了另一个类的对象

  第一个可以在方法中传递参数

  第二个可以在方法中自己创建

```java
public class Farmer {//农夫

    //农夫养猪--->
    //    参数--->几个月    返回值-->是一头猪
    public Pig feedPig(int month){
        Pig pig = new Pig("小花");//依赖--->在屠夫的方法中使用到了猪的对象
        pig.growUp(month);//20 --> 640
        return pig;
    }
}

public class Butcher {//描述屠夫

    //方法
    //描述一个屠夫杀猪的方法   需要提供条件 一头猪
    public void killPig(Pig pig){
        System.out.println("屠夫执行了杀猪方法");
        String pigName = pig.getName();
        int pigWeight = pig.getWeight();
        System.out.println(pigName+"的体重为:"+pigWeight);
        pig.beKilled();
    }
}

public class Pig {//描述猪

    //属性
    private String name;//名字
    private int weight = 20;//体重

    //构造方法
    public Pig(){}
    public Pig(String name){
        this.name=name;
    }
    //方法
    //描述一个方法  表示小猪被杀啦
    public void beKilled(){
        System.out.println(this.name+"被杀啦，好惨呀");
    }

    //描述一个方法  让猪长肉
    //    每一个月涨到前一个月的两倍
    public void growUp(int month){
        for(int i=1;i<=month;i++){
            this.weight*=2;
        }
    }

    //描述一个方法  猪告知他的体重
    public int getWeight(){
        return this.weight;
    }
    public String getName(){
        return this.name;
    }
}

public class Test {
    public static void main(String[] args){
        //创建农夫对象
        Farmer farmer = new Farmer();
        //农夫做一件事情--->养猪
        Pig pig = farmer.feedPig(5);
        //创建屠夫对象
        Butcher butcher = new Butcher();
        //屠夫做事--->杀猪 把猪传进去
        butcher.killPig(pig);
    }
}

```



