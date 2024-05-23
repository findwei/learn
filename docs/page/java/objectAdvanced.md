[TOC]

#
# 类的修饰符(decorate)

- Java类和类之间的关系

    继承   关联   依赖

- Java面向对象的四个特征

    继承(extends)   封装   多态   (抽象)


>修饰符主要就是为了封装

    封装 : 将一些数据或执行过程  进行一个包装  
    目的 : 保护这些数据 或 执行过程的安全
            方法本身就算是封装   封装了执行的过程  保护过程的安全  隐藏了执行细节   增强复用性
            类也算是一个封装  好多的方法和属性---->类   
            对属性本身的封装:
                属性私有(封装在类中)
                提供操作属性相应的方式(公有的方法)
                强烈建议 属性不要公有的---->非常不安全
                这样操作属性  属性及其操作属性的方法都有其命名的规约 使用setName getName 来修改与获取
                age------>    setAge        getAge
                myAge-->    setMyAge   getMyAge

```java
// 这样操作属性  属性及其操作属性的方法都有其命名的规约 使用setName getName 来修改与获取 更加安全
public class Cs {
    private int age;

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
                
```
             
```java

//  权限修饰符 特征修饰符 class  类名{
//      属性	权限  特征  类型  名字
//	    方法	权限  特征  返回值  名字  参数  异常  执行体
//	    构造方法	权限  名字  参数  异常  执行体
//	    程序块	执行体
//  }

```
## 权限修饰符

**那么权限修饰符号能修饰什么**

权限修饰符可以用来修饰  类本身、和类中的成员 (除程序块)
    
权限修饰符用来修饰类的时候只有两个可以用(public 和 默认不写)

| 修饰符名称 | 修饰符权限                                                              |
| :--------- | ----------------------------------------------------------------------- |
| public     | 公共的	在本类、同包 、子类 、当前项目中任意类的位置只要有对象都可以访问 |
| protected  | 受保护的   在本类、同包 、子类(**通过子类对象在子类范围内部访问**)      |
| 默认不写   | 默认的 同包                                                             |
| private    | 私有的               本类                                               |





## 特征修饰符

| 特征修饰符名称 | 特征修饰符                                 |
| :------------- | ------------------------------------------ |
| final          | 最终的  不可更改的                         |
| static         | 静态的                                     |
| abstract       | 抽象的  很不具体 没有具体的执行 只是个概念 |
| native         | 本地的                                     |
| *transient     | 瞬时的  短暂的------>序列化                |
| *synchronized  | 同步的	线程问题                            |
| *volatile      | 不稳定的                                   |

### final 最终的 

>最终的 => 不可更改的

  - 修饰`变量`

      如果在定义变量时没有赋初始值 给变量一次存值的机会(因为变量在栈内存空间内 没有默认值 如果不给机会 就没法用啦)

      一旦变量被存储了一个值 若用final修饰后 则不让再次改变 ----> 相当于常量啦(值没法动)

      **注意变量类型是基本类型还是引用类型**
      
      如果修饰的变量是基本数据类型  则变量内的值不让更改---常量

      如果修饰的变量是引用数据类型  则变量内的 `地址引用` 不让更改---对象唯一 对象里面的值存在堆内存是可以更改的

  - 修饰`属性`

      全局变量  存储在堆内存的对象空间内一个空间 属性如果没有赋值  有默认值存在的

      属性用final修饰后  必须给属性赋初值  否则编译报错

      特点与修饰变量一致  **注意变量类型是基本类型还是引用类型**

      如果修饰的变量是基本数据类型  则变量内的值不让更改---常量

      如果修饰的变量是引用数据类型  则变量内的 `地址引用` 不让更改---对象唯一

  - 修饰`方法`
  
      方法是最终的方法  不可更改

      final修饰的方法  要求**不可以被子类重写**(覆盖)

  - 修饰`类本身`

      类是最终的 不可以更改

      (太监类 无后) 此类不可以被其他子类继承 

      通常都是一些定义好的工具类 例如：`Math`   `Scanner`   `Integer`   `String`

### static  静态的

![继承在内存中的存储形式](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/objectAdvance/内存结构简图.png)

> **注意不能修饰变量**

- 可以修饰 ： 修饰`属性`   修饰`方法`   `*修饰块`    `修饰类(内部类)`

- 特点：

    1. 静态元素在`类加载时就初始化`啦，创建的非常早，此时没有创建对象 
    2. 静态元素存储在静态元素区中，`每一个类有一个自己的区域`，与别的类不冲突
    3. 静态元素`只加载一次`(只有一份)，同一个类模板的`类对象及类本身共享`
    4. 由于静态元素区加载的时候，有可能没有创建对象，可以通过`类名字直接访问`
    5. 可以理解为静态元素不属于任何一个对象，`属于类`的
    6. 静态元素区Garbage Collection(垃圾回收器)无法管理，可以粗暴的认为常驻内存 （tips:栈内存使用完成就马上销毁，堆内存使用Garbage Collection(垃圾回收器)）
    7. 非静态成员(堆内存对象里)中可以访问静态成员(静态区)
    8. 静态成员中可以访问静态成员(都存在静态区)
    9.  静态成员中不可以访问非静态成员(个数 一个出发访问一堆相同名字的东西 说不清)(静态元素属于类 非静态成员属于对象自己)
    10. 静态元素中不可以出现this或super关键字(静态元素属于类)


### abstract 抽象的

> 抽象的 => 很不具体 没有具体的执行 只是个概念

1. 可以修饰 ：`方法`  `类` 类包括(内部类)
    - 修饰`方法`  

        用abstract修饰符修饰的方法  只有方法的结构 没有方法执行体叫做抽象方法
        当然注意native修饰的方法虽然也没有方法体 但是不是抽象方法 只是执行的过程是其他语言写的 看不见

    - 修饰`类`

        用abstract修饰符修饰的类 叫做抽象类

2. 修饰后有什么特点

    抽象类中必须有抽象方法么?  不是必须含有抽象方法  
    抽象方法必须放在抽象类中么?  目前来看必须放在抽象类中(或接口中)  普通类是不允许含有抽象方法

3. 什么叫抽象类  抽象类有什么特点？(通常用来描述事物 还不是很具体)
    1. 修饰类里面有的成员

            属性	可以含有一般的属性  也可以含有 private static final等等
            方法	可以含有一般的方法  也可以含有 private static final等等  **注意:**抽象类中是允许含有抽象方法(只有方法结构 没有方法执行体)
            块	    可以含有一般的程序块 也可以含有static程序块
            构造方法	可以含有构造方法  包括重载

    2. 类如何使用  创建对象
   
            抽象类含有构造方法  但是我们不能通过调用构造方法直接创建对象
            抽象类只能通过子类单继承来做事

    3. 类和类的关系
   
            抽象类----直接单继承----抽象类	 可以
            抽象类----直接单继承----具体类  可以  (用法通常不会出现)
            具体类----直接单继承----抽象类  不可以  (除非让具体类将抽象的方法重写 添加具体执行过程 否则该子类也变成抽象类)
            具体类----单继承----抽象类 可以(除非让具体类将抽象的方法重写 添加具体执行过程 否则该子类也变成抽象类)
    4. **注意**
   
        抽象类中能不能没有抽象方法  全部都是具体成员  可以

        抽象类中能不能没有具体成员  全部都是抽象方法  可以 ---> 抽象类抽象到极致 质的变化 ---> 接口

        接口可以理解为是抽象类抽象到极致--->还是一个类的结构   不能用class修饰 改用interface修饰

# 接口（interface）

什么是接口(通常是为了定义规则)

接口也是一个类的结构  只不过 用interface修饰 替换原有的class

接口（英文：Interface），在JAVA编程语言中是一个抽象类型，是抽象方法的集合，接口通常以interface来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。

接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。类描述对象的属性和方法。接口则包含类要实现的方法。

除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。

接口无法被实例化，但是可以被实现。一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类。另外，在 Java 中，接口类型可用来声明一个变量，他们可以成为一个空指针，或是被绑定在一个以此接口实现的对象

1. 有什么  成员

    属性	不能含有一般属性  只能含有公有的静态的常量  public static final 

    方法	不能含有一般方法  只能含有公有的抽象的方法(1.8 defualt修饰具体方法)

    块	不能含有一般程序块  也不能含有static块(块本身就是具体的 接口中不让有具体的)

    构造方法	不能含有构造方法

    ```java

    public interface TestInterface {

        String name = "test";//public static final省略
        public void test();//只定义规则  不描述具体过程

    }

    ```
    
2. 如何使用  创建对象

    不能创建对象

    只能通过子类多实现(`implements`)来做事

    ```java  
    public class A implements B,C,D{

        }
    ```
3. 与别的类结构关系

    接口不能继承别的类  最抽象

    抽象类----**直接多实现**----接口	可以 `public abstract class A implements B,C{}`

    具体类----**直接多实现**----接口	不可以(需要将接口中的抽象方法具体化，否则该子类也需要变成抽象类)

    具体类----**多实现**----接口	可以(需要将接口中的抽象方法具体化，否则该子类也需要变成抽象类)

    *接口---**多继承**---接口	可以直接多实现


# 加载顺序（继承关系）

tips:加载类的过程---静态元素已经加载

> 存在继承关系的类 加载机制 及执行过程

![继承在内存中的存储形式](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/类的加载.jpg)

```java 
// 父类
public class Animal {
    public String test = "AnimalField";
    public static String testStatic = "AnimalStaticField";

    public Animal(){
        System.out.println("我是animal中默认无参数的构造方法");
    }

    {
        this.test();
        System.out.println("我是animal中的普通代码块"+test);
    }
    static{
        Animal.testStatic();
        System.out.println("我是animal中的静态代码块"+testStatic);
    }

    public void test(){
        System.out.println("我是animal类中的普通方法");
    }
    public static void testStatic(){
        System.out.println("我是animal类中的静态方法");
    }
}
// 子类
public class Person extends Animal{

    public String test = "personField";
    public static String testStatic = "personStaticField";

    public Person(){
        //super();//默认调用父类无参数的构造方法
        System.out.println("我是person中默认无参数的构造方法");
    }

    {
        this.testPerson();
        System.out.println("我是person中的普通代码块"+test);
    }
    static{
        Person.testStatic();
        System.out.println("我是person中的静态代码块"+testStatic);
    }

    public void testPerson(){
        System.out.println("我是person类中的普通方法");
    }
    public static void testStatic(){
        System.out.println("我是person类中的静态方法");
    }
}


public class Test {
    public static void main(String[] args){
        //加载类的过程---静态元素已经加载
        Person p = new Person();
//        我是animal类中的静态方法
//        我是animal中的静态代码块AnimalStaticField
//        我是person类中的静态方法
//        我是person中的静态代码块personStaticField
//        我是animal类中的普通方法
//        我是animal中的普通代码块AnimalField
//        我是animal中默认无参数的构造方法
//        我是person类中的普通方法
//        我是person中的普通代码块personField
//        我是person中默认无参数的构造方法
    }
}

```
1. 加载父类
2. 父类会产生自己的静态空间   属性 方法 块  
3. 执行父类静态块
4. 加载子类
5. 子类会产生自己的静态空间   属性 方法 块  
6. 执行子类静态块
7. 开辟对象空间
8. 加载父类的非静态成员   属性 方法 块 构造方法
9. 执行块  执行父类构造方法
10. 加载子类的非静态成员   属性 方法 块 构造方法
11. 执行块  执行子类构造方法
12. 将对象空间的地址引用交给 变量来存储


# 多态

同一个对象 体现出来的多种不同形态(身份)  将一种行为表现出不同的效果，要想实现多态的效果 **需要现有继承关系**。

**体现:**

1. 父类类型的引用  指向  子类的对象 Person p = new Teacher();
2. 该引用只能调用父类中定义的属性或方法
3. 如果子类中将父类的方法重写，那么调取方法后执行的结果是子类重写之后的那个结果
    - 如果父类与子类有同名的属性  		执行父类的属性
    - 如果父类与子类有同名的方法(重写)	执行子类重写之后的方法
4. 若想要调用子类中独有的成员，(强制类型转化)  造型 铸型  (向上/向下转型)
5. 造型时(强制向下转型时) 可能会出现一个运行时异常ClassCastException   造型  铸型 异常，如果想要避免造型的异常  可以用instanceof关键字来进行判断`对象  instanceof  类`

![singleton简图](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/objectAdvance/多态.png)
```java
public class Animal {
    public String name = "Animal的name属性";
    public void eat(){
        System.out.println("animal的吃饭方法");
    }
    public void sleep(){
        System.out.println("animal的睡觉方法");
    }
}
public class Person extends Animal{
    public String name = "person的name属性";
    public void eat(){
        System.out.println("person的吃饭方法");
    }
    public void sleep(){
        System.out.println("人类的睡觉方法");
    }
    public void talk(){
        System.out.println("人类的说话方法");
    }
}
public class Pig extends Animal{
    public String name = "pig的name属性";
    public void sleep(){
        System.out.println("猪的睡觉方法");
    }
}
public class Teacher extends Person{
    public String name = "teacher的name属性";
    public void eat(){
        System.out.println("老师的吃饭方法");
    }
    public void teach(){
        System.out.println("做老师的独有方法 一般人不会讲课 我会");
    }
}
public class Student extends Person {
    public String name = "student的name属性";
    public void talk(){
        System.out.println("学生遵守礼貌 应该好好说话");
    }
    public void study(){
        System.out.println("好好学习 天天向上");
    }
}

public class Test {
    public static void main(String[] args) {
        //这个真是的老师 体现出来的身份是一个人的身份
        Person p = new Teacher();//自动向上转型  Teacher--->Person
        p.eat(); //老师的吃饭方法
        p.sleep(); //人类的睡觉方法
        p.talk(); //人类的说话方法

        //如果想要调用子类独有的属性或方法
        //需要将类型还原会真实类型    强制类型转化  造型  向上转型  向下转型
        Teacher t = (Teacher)p;
        t.eat(); //老师的吃饭方法
        t.sleep(); //人类的睡觉方法
        t.talk(); //人类的说话方法
        t.teach(); //做老师的独有方法 一般人不会讲课 我会

       Object o = new Teacher();
       Animal a = (Animal) o;
       System.out.println(a.name);//animal的name属性
       a.sleep();//person重写了 人类的睡觉方法
       a.eat();//老师的吃饭方法
       System.out.println("-----------------------");
       Person p = (Person) o;
       System.out.println(p.name);//person的name属性
       m.sleep();//人类的睡觉方法
       m.eat();//老师的吃饭方法
       m.talk();//人类的说话方法
       System.out.println("----------------------");
       Teacher t = (Teacher) o;
       System.out.println(t.name);//teacher的name属性
       tt.eat();//老师的吃饭方法
       tt.sleep();//人类的睡觉方法
       tt.talk();//人类的说话方法
       tt.teach();//做老师的独有方法 一般人不会讲课 我会
       System.out.println("-------------------");
        //    Pig b = (Pig) aa; //报错 Animal cannot be cast to class test.Pig (Animal and Pig are in unnamed module of loader 'app')
       if (o instanceof Person) {//对象是否属于后面类型
           System.out.println("类型匹配  可以造型");
           // Student s = (Student)o;
           //运行时异常 ClassCastException
           //s.study();
       } else {
           System.out.println("对不起 类型不匹配 不帮您造型啦 否则会出问题");
       }

        Animal aa = new Animal();
  
    }
}
```

# 内部类

内部类指的是将一个类的定义放置在另一个类的内部

内部类可以定义在  类的内部 (与类成员层次一致)

内部类可以定义在  方法/块内部 (与类成员相差一个层次  方法的局部变量一个层次)

1. 成员内部类

   - 将一个类直接定义在类的里面，作为成员，与属性或方法层次一致
   - 成员内部类可以与正常类一样 使用不同的修饰符来修饰
   - 好处
     1. 省略了一个.java文件  
     2. 成员内部类中可以访问外部类的所有成员 包括私有的
   - 若想要在内部类中通过对象`.`调用外部类成员   `外部类.this.外部类成员`;
   - 内部类存在后 源代码进行编译 产生一个字节码  Demo$InnerDemo.class
    
2. 局部内部类(方法内部类)

    - 将一个类定义在方法/块里面，作为成员的内部结构，与临时的局部变量一个层次
    - 局部内部类像是一个局部的变量一样，不能用public protected private及static 只能用 abstract或final
    - 局部内部类命名规则Demo$1InnerTestMethod   Demo$2InnerTestMethod
    - 局部内部类使用的变量只能是final修饰

3. 匿名内部类
   
   成员匿名内部类、局部匿名内部类 两种

    - 匿名内部类也就是没有名字的内部类
    - 正因为没有名字，所以匿名内部类只能使用一次，它通常用来简化代码编写
    - 但使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口

    ```java
    //成员匿名内部类
    public interfase Test{
    public void test();
    }
    Test t = new Test(){
        public void test(){
        }
    };
    ```
    通常接口或抽象类的具体子类这样写
    开发中为了省略一个类文件   上述写法比较常见
    匿名内部类很特殊 只有类体 没有类的所有结构( 修饰符 名字 继承 实现)
    不能用任何修饰符来修饰  匿名内部类也没有构造方法
    Swing  做一个按钮 绑定一个事件监听器

4. 静态内部类(静态嵌套类)

    - 成员静态内部类
    - 不需要外部类对象，通过正常的方式直接创建内部类
    - 静态元素不能访问非静态成员(自己类和外部类)

```java
public class OuterClass {
    // 正常内方法
    private int outerField = 10;
    static int staticOuterField = 20;

    public void testDemo() {
        System.out.println("这是正常类中的方法");
    }

    interface InnerInterface {
        void display();
    }
    // 成员内部类
    class InnerClass {
        public void testDemo() {
            System.out.println("这是InnerClass类中的方法");
        }

        void display() {
            System.out.println("InnerClass: outerField = " + outerField);
            // 调用OuterClass类的方法
            OuterClass.this.testDemo();
            //调用InnerClass类的方法
            testDemo();
        }
    }

    // 静态嵌套类
    static class StaticNestedClass {
        void display() {
            System.out.println("StaticNestedClass: staticOuterField = " + staticOuterField);
        }
    }

    // 局部内部类(方法内部类)
    void methodWithLocalInnerClass() {
        int localVar = 30;
        //定义一个局部内部类
        class LocalInnerClass {
            //局部内部类中使用的局部变量都需要加final修饰
            final int ss = localVar;

            void display() {
                System.out.println("LocalInnerClass: localVar = " + localVar);
                System.out.println("LocalInnerClass: ss = " + ss);
            }
        }
        LocalInnerClass localInner = new LocalInnerClass();
        localInner.display();

        // 创建 局部 匿名内部类的实例
        InnerInterface memberAnonymousInnerClass = new InnerInterface() {
            @Override
            public void display() {
                System.out.println("Member Anonymous Inner Class: display method,局部匿名内部类实例");
            }
        };
        memberAnonymousInnerClass.display();
    }

    // 匿名内部类
    Runnable anonymousInnerClass = new Runnable() {
        @Override
        public void run() {
            System.out.println("AnonymousInnerClass: running...");
        }
    };
    //  创建 成员 匿名内部类
    InnerInterface memberAnonymousInnerClass = new InnerInterface() {
        @Override
        public void display() {
            System.out.println("Member Anonymous Inner Class: display method,匿名成员内部类的实例");
        }
    };

    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        // 使用成员内部类
        InnerClass inner = outer.new InnerClass();
        inner.display();
        
        // 使用静态嵌套类
        StaticNestedClass staticNested = new StaticNestedClass();
        staticNested.display();

        // 使用方法内部类
        outer.methodWithLocalInnerClass();

        // 使用匿名内部类
        outer.anonymousInnerClass.run();
        outer.memberAnonymousInnerClass.display();

    }
}
```

# 枚举（Enum）

数据类型

基本:8个 整型 （`byte short int long`） 浮点（`float double`）  字符 （`char`） 布尔 （`boolean`）

引用: 数组`[]`  类`class` 抽象类`abstract class` 接口`interface` 枚举`enum` 注解`@interface` 

**枚举类**

一个类中的对象 认为个数是有限且固定的 可以将每一个对象一一列举出来 ，自己定义的每一个enum类型 都会默认继承Enum（java.lang.Enum） 间接继承Object

1. 试一试若没有枚举类型的时候  如何手动设计  (静态常量 单例模式)  Day(类 当做描述星期 7个对象)

        private构造方法
        public static final属性 = new

2. JDK1.5版本之后可以直接定义enum类型

  - 我们自己定义的enum类型直接默认继承Enum(java.lang包)
  - 我们自己定义的enum类型不能再写extends 但是可以实现
  - Enum类型  有两个属性
    - name----->枚举对象的名字     name()获取name属性
    - ordinal--->枚举对象在类中罗列的顺序  类似index  也从0开始   ordinal()获取序号
  - 常用的方法
    - valueOf()   通过给定的name获取对应的枚举对象
    - values()     获取全部的枚举对象  ---> 返回一个数组  Day[]
    - compareTo()   可以比较两个枚举对象   int
    - toString()	  由于这个方法没有final修饰  可以覆盖(重写)
  
3.switch内部判断枚举的应用
    
4.我们也可以在enum中描述自己的一些属性或方法

  - 必须在enum类中第一行 描述一下枚举的样子 最后需要分号结束;
  - 可以定义自己的属性
  - 类创建的过程中  帮我们创建枚举类型的对象
  - 需要给枚举类型提供对应样子的构造方法  构造方法只能`private`修饰  可以重载

```java

import java.util.Scanner;
public class EnumExample {
    enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
    public static void main(String[] args) {
        // 创建一个 Scanner 对象来获取用户输入
        Scanner scanner = new Scanner(System.in);

        // 提示用户输入枚举常量
        System.out.print("请输入今天是星期几（例如：MONDAY）：");
        // 读取用户输入的枚举常量字符串
        String userInput = scanner.nextLine();

        // 根据用户输入的枚举常量字符串创建对应的 Day 枚举常量
        // Day today = Day.MONDAY;
        Day today = Day.valueOf(userInput);
        // 根据用户输入的枚举常量进行操作
        switch (today) {
            case MONDAY:
                System.out.println("Today is Monday.");
                break;
            case TUESDAY:
                System.out.println("Today is Tuesday.");
                break;
            // 其他枚举常量的处理...
            default:
                System.out.println("Today is not Monday or Tuesday.");
        }
        // 关闭 Scanner 对象
        scanner.close();
    }
}

// 或者这种写法
import java.util.Scanner;
public enum Day {
    //描述了七个当前类的对象
    monday("星期一", 1), tuesday("星期二", 2), wednesday, thursday, friday, saturday, sunday;
    private String name;
    private int index;
    private Day() {
    }
    private Day(String name, int index) {
        this.name = name;
        this.index = index;
    }
    public String getName() {
        return this.name;
    }
    public static void main(String[] args) {
        //输入一个字符串monday  输出对应的信息
        Scanner input = new Scanner(System.in);
        System.out.println("请输入一个星期的英文单词:");
        String key = input.nextLine();
        Day day = Day.valueOf(key);//通过输入的英文单词找到了对应的枚举对象
        switch (day) {
            case monday:
                System.out.println("您输入的是" + day.getName());
                break;
            case tuesday:
                System.out.println("您输入的是星期2");
                break;
            case wednesday:
                System.out.println("您输入的是星期3");
                break;
            case thursday:
                System.out.println("您输入的是星期4");
                break;
            case friday:
                System.out.println("您输入的是星期5");
                break;
            case saturday:
                System.out.println("您输入的是星期6");
                break;
            case sunday:
                System.out.println("您输入的是星期7");
                break;
            default:
                System.out.println("出现错误");
        }

    }
}

//        Day day = Day.monday;  //获取monday枚举对象
//        Day today = Day.valueOf(key);//获取key 枚举对象
//        Day[] days = Day.values();//获取所有的枚举对象
        //我们自己创建的enum类型 默认继承Enum
        //我们自己定义的每一个enum类型 都会默认继承Enum 间接继承Object

//        Day d = Day.valueOf("monday");
//        System.out.println(d.name()+"--"+d.ordinal());
//        Day[] days = Day.values();//获取所有的枚举对象
//        for(Day d:days){
//            System.out.println(d.name()+"--"+d.ordinal());
//        }

```


# 总结

    如何描述类
        类成员四个  方法
    如何创建对象
        执行类成员
    类之间的关系
        is-a  has-a  use-a
    类中特性
        权限   特征
    类之间的设计问题
        设计模式   单例  策略  适配器
    类中的一些细节
        内部类  枚举类
    内存机制问题
        类创建在哪儿   对象创建在哪里   继承关系   静态成员   方法执行
        栈内存--->Person p = new Person();---->堆内存    方法区---类模板
        栈内存--->创建开始 用完立即回收   StackOverflowError
        方法区--->类   常量   静态   只有一份回收不了
        堆内存--->new创建的对象  Garbage Collection垃圾回收器  GC
    Runtime类之中提供了几个管理内存的方法
        maxMemory
        totalMemory
        freeMemory
        堆内存溢出错误OutOfMemoryError
    Object类中有一个finalize方法  如果重写也能看见对象回收
    GC系统提供的一个线程    回收算法


-------------------------
	人家写好的类
	包装类
	数学相关
	日期相关
	字符串
	集合
	输入输出I/O
	异常相关
	线程相关
	网络相关












