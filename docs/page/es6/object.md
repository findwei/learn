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

面向对象：一种编程思想，跟具体的语言

对比面向过程：

- 面向过程：思考的切入点是功能的步骤
- 面向对象：思考的切入点是对象的划分 （更加偏重与拆分和组合，所以时候大型项目，在小型项目中就更加非常繁琐）

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

