[TOC]


# 适配器模式

适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁。这种类型的设计模式属于结构型模式，它结合了两个独立接口的功能。

这种模式**涉及到一个单一的类**，该类负责加入独立的或不兼容的接口功能。**例子:**，读卡器是作为内存卡和笔记本之间的适配器。您将内存卡插入读卡器，再将读卡器插入笔记本，这样就可以通过笔记本来读取内存卡。

1. 缺省适配器模式

	解决一个接口(规则) 定义了好多方法
	适配器(通常是一个抽象类)  添加某些具体实现 (方法内部抛出异常)
	每一个子类实现接口  所有的方法

```java
public interface Box{
        public boolean add(element);
        public void add(int index,int element);
        public void addAll();
        public int get(index);
        public int remove(index);
        public int size();
    }

public abstract class AbstractBoxAdapter implements Box{
        public boolean add(element);
        public void add(int index,int element){//具体化
            //抛出自定义异常
        }
        public void addAll(){//具体化
            //抛出自定义异常
        }
        public int get(index);
        public int remove(index);
        public int size();

        public void rangeCheck(int index){
            if(index<0 || index>=size){
                自定义的异常
            }
        }
    }
```