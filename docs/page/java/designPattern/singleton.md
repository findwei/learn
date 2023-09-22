[TOC]


# 单例模式

> 单例模式是一种创建型设计模式，它确保一个类**只有一个实例**，并提供了一个全局访问点来访问该实例。

**注意：**

1. 单例类只能有一个实例。
2. 单例类必须自己创建自己的唯一实例。
3. 单例类必须给所有其他对象提供这一实例。

**优点：**

1. 在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例（比如管理学院首页页面缓存）。
2. 避免对资源的多重占用（比如写文件操作）。

解决对象的创建问题

	想要设计一个类  让这个类只能创建一个对象
	控制内存中对象占用空间的问题
	解决方式(饿汉式--立即加载   懒汉式--延迟加载    生命周期托管)

**缺点：**

没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。

**单例模式的实现**

 1. 私有的构造方法
 2. 私有的静态的当前类对象作为属性
 3. 公有的静态的方法返回当前类对象(对象的引用)

**单例模式的几种实现方式**

1. 饿汉式(立即加载)   对象启动时就加载啦

    不会产生对象没有就拿来使用的问题  空指针异常
    启动项目加载的对象过多  有些还没有使用  产生服务器承载压力的问题

2. 懒汉式(延迟加载)   对象什么时候用到了 才会加载

    可能会由于没有操作好  导致异常(很严谨)
    启动项目时候只有需要的加载  不需要的还没有创建  不会浪费空间

3. 生命周期托管(单例对象别人帮我们处理)   对象加载过程交给别人

![singleton简图](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/java/designPattern/singleton简图.png)


```java
// 懒汉式
public class SingleTon {
    private SingleTon(){}
    //2.单例 不是无例 --- 在本类中的某个成员位置上创建唯一的一个对象
    private static SingleTon single;//直接 = new Singleton(); 立即加载  饿汉式
    //3.提供一个获取单个对象的方法给用户
    //   返回值  将对象返回出去
    public static SingleTon getSingleTon(){// get类名  newInstance
        if(single == null) {
            single = new SingleTon();//延迟加载的方式  
        }
        return single;//引用类型
    }

}
public class TestMain {
    public static void main(String[] args){
        SingleTon s1 = SingleTon.getSingleTon();
        SingleTon s2 = SingleTon.getSingleTon();
        System.out.println(s1==s2);//true 比较地址
        System.out.println(s1.equals(s2));//true Object类继承过来的 默认也比地址 以后可以重新这个方法
        // System.out.println(s1);//类全名@hashCode--->16进制的整数
        // System.out.println(s2);
    }
}
// 懒汉式---------END--------------

// 饿汉式 （一开始初始化就加载了）
public class Singleton {  
    private static Singleton instance = new Singleton();  
    private Singleton (){}  
    public static Singleton getInstance() {  
    return instance;  
    }  
}
public class TestMain {
    public static void main(String[] args){
        SingleTon s1 = SingleTon.getInstance();
    }
}
// 饿汉式---------END--------------

```