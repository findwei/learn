#
# 新增的对象字面量语法

1. 成员速写

如果对象字面量初始化时，成员的名称来自于一个变量，并且和变量的名称相同，则可以进行简写

```js

let abc=123
let fun = function(){}
let a={
    abc,
    fun,
}

```

2. 方法速写

对象字面初始化时，方法可以省略冒号和function关键字

```js

let a={
    b(){

    }
}

```

3. 计算属性名

有的时候，初始化对象时，某些属性名可能来自于某个表达式的值，在ES6，可以使用中括号来表示该属性名是通过计算得到的。

```js

let prop1 = "name2";
let prop2 = "age2";

const user = {
    [prop1]: "张三",
    [prop2]: 100,
    [prop3](){
        console.log(this[prop1], this[prop2])
    }
}
user[prop3]();
console.log(user)

```

# 对象新增的api

1. Object.is

用于判断两个数据是否相等，基本上跟严格相等（===）是一致的，除了以下两点：

1) NaN和NaN相等
2) +0和-0不相等

```js

console.log(NaN === NaN); // false
console.log(+0 === -0);  // true

console.log(Object.is(NaN, NaN)) //true
console.log(Object.is(+0, -0)) // false

```

2. Object.assign

用于混合对象 （会更改第一个对象的值，返回对象和第一个对象是相等的）

```js
const obj1 = {
    a: 123,
    b: 456,
    c: "abc"
}
const obj2 = {
    a: 789,
    d: "kkk"
}
/*
{
    a: 789,
    b: 456,
    c: "abc",
    d: "kkk"
}
*/
//将obj2的数据，覆盖到obj1，并且会对obj1产生改动，然后返回obj1
const obj = Object.assign(obj1, obj2);
console.log(obj===obj1) //true

//所以一般在使用的时候前面给一个空对象 
const obj = Object.assign({}, obj1, obj2);
console.log(obj)
console.log(obj===obj1) //fsle
console.log(obj1)
console.log(obj2)

```

3. Object.getOwnPropertyNames 的枚举顺序

Object.getOwnPropertyNames方法之前就存在，只不过，官方没有明确要求，对属性的顺序如何排序，如何排序，完全由浏览器厂商决定。

ES6规定了该方法返回的数组的排序方式如下：

- 先排数字，并按照升序排序
- 再排其他，按照书写顺序排序

4. Object.setPrototypeOf

该函数用于设置某个对象的隐式原型

比如： Object.setPrototypeOf(obj1, obj2)，
相当于：  ``` obj1.__proto__ = obj2 ```

# 面向对象简介

面向对象：一种编程思想，跟具体的语言无关

一个语言支持使用面向对象这种思想来编程就说这是一门面向对象的语言

对比面向过程：

- 面向过程：思考的切入点是功能的步骤 （比较适合做小的模块）
- 面向对象：思考的切入点是对象的划分 （比较适合大的项目，不停更新和迭代的项目，更加偏重与拆分和组合，所以时候大型项目，在小型项目中就更加非常繁琐）

【大象装冰箱】
```js
// 面向对象的写法
//1. 冰箱门打开
function openFrige(){
}
openFrige();
//2. 大象装进去
function elephantIn(){

}
elephantIn();
//3. 冰箱门关上
function closeFrige(){
}
closeFrige();

/**
 * 面向过程的写法
 */ 
/**
 * 大象
 */
function Elephant() {
}
/**
 * 冰箱
 */
function Frige() {
}

Frige.prototype.openDoor = function () {
}
Frige.prototype.closeDoor = function () {
}
Frige.prototype.join = function(something){
    this.openDoor();
    //装东西
    this.closeDoor();
}

//1. 冰箱门打开
// var frig = new Frige();
// frig.openDoor();

// //2. 大象装进去
// var ele = new Elephant();
// frig.join(ele);

// //3. 冰箱门关上
// frig.closeDoor();

var frig = new Frige();
frig.join(new Elephant());

```
先读懂下面链接文章 再看下面的类
[查看prototype,__proto__,constructor的关系](https://blog.csdn.net/cc18868876837/article/details/81211729)

# 类：构造函数的语法糖

[参考阮一峰写的class](https://es6.ruanyifeng.com/#docs/class)

## 传统的构造函数的问题

1. 属性和原型方法定义分离，降低了可读性
2. 原型成员可以被枚举
3. 默认情况下，构造函数仍然可以被当作普通函数使用

## 类的特点

1. 类声明不会被提升，与 let 和 const 一样，存在暂时性死区
2. 类中的所有代码均在严格模式下执行
3. 类的所有方法都是不可枚举的
4. 类的所有方法都无法被当作构造函数使用
5. 类的构造器必须使用 new 来调用

```js
// ********** 以前创建类的写法 **********
//面向对象中，将 下面对一个对象的所有成员的定义，统称为类

//构造函数  构造器
function Animal(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}

//定义实例方法（原型方法）
Animal.prototype.print = function () {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}

const a = new Animal("狗", "旺财", 3, "男");
a.print();

for (const prop in a) {
    console.log(prop)
    // 原型上面的成员能枚举
}

// ********** es6 创建类 **********

// es6 创建类
class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    print() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
}

const a = new Animal("狗", "旺财", 3, "男");
a.print();

for (const prop in a) {
    console.log(prop)
    //用class创建 原型上面的成员不能枚举
}

```

