#
# 参数默认值

## 使用 <!-- {docsify-ignore} -->

在书写形参时，直接给形参赋值，附的值即为默认值

这样一来，当调用函数时，如果没有给对应的参数赋值（给它的值是undefined），则会自动使用默认值。

## [扩展]对arguments的影响 <!-- {docsify-ignore} -->

我们知道 在严格模式下面arguments 和 形参是脱离的 非严格模式下 arguments 和形参不是脱离的 

只要给函数加上**参数默认值**，该函数会自动变成严格模式下的规则：arguments和形参脱离

```js
// 非严格模式
function test(a,b){
    console.log("arugments", arguments[0], arguments[1]); //1 2
    console.log("a:", a, "b:", b); //1 2
    a = 3;
    console.log("arugments", arguments[0], arguments[1]); // 1 2
    console.log("a:", a, "b:", b); // 3 2
}
test(1,2)
// 严格模式
use strict
function test(a,b){
    console.log("arugments", arguments[0], arguments[1]); //1 2
    console.log("a:", a, "b:", b); //1 2
    a = 3;
    console.log("arugments", arguments[0], arguments[1]); // 3 2
    console.log("a:", a, "b:", b); // 3 2
}
test(1,2)
// 使用了参数默认值
function test(a,b=2){
    console.log("arugments", arguments[0], arguments[1]); //1 2
    console.log("a:", a, "b:", b); //1 2
    a = 3;
    console.log("arugments", arguments[0], arguments[1]); // 3 2
    console.log("a:", a, "b:", b); // 3 2
}
test(1,2)
```

## [扩展]留意暂时性死区 <!-- {docsify-ignore} -->

形参和ES6中的let或const声明一样，具有作用域，并且根据参数的声明顺序，存在暂时性死区。

```js

function test(a,b=a){  
    // 可以执行
}
test()

function test(a=b,b){  //报错 Cannot access 'b' before initialization
// 说明形参是按照顺序在声明 
}
test()

```

# 剩余参数

arguments的缺陷：

1. 如果和形参配合使用，容易导致混乱
2. 从语义上，使用arguments获取参数，由于形参缺失，无法从函数定义上理解函数的真实意图


ES6的剩余参数专门用于函数末尾的所有参数，将其放置到一个形参数组中。

语法:

```js
function (...形参名){

}
```

**细节：**

1. 一个函数，**仅能出现一个剩余参数**
2. 一个函数，如果有剩余参数，剩余参数必须是**最后一个参数**

# 展开运算符

使用方式：```  ...要展开的东西  ```

...用在形参里面叫收集剩余参数 用在其他地方叫扩展运算符

利用扩展运算符 可以很好的实现 **浅克隆** 

## 对数组展开 ES6 <!-- {docsify-ignore} -->

## 对对象展开 ES7 <!-- {docsify-ignore} -->

```js

let a = [1,2,3]
let b = [...a]
 
 console.log(a===b) //false

let obj={
    a:1,
    b:2,
    c:{
        d:3
    }
};
let obj1 = {
    ...obj
};
console.log(obj===obj1); //false 
console.log(obj.c===obj1.c) //true 因为是浅克隆

```

# 明确函数的双重用途

ES6提供了一个特殊的API，可以使用该API在函数内部，判断该函数是否使用了new来调用

详情见[new.target](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)
```js
new.target 
//该表达式，得到的是：如果没有使用new来调用函数，则返回undefined
//如果使用new调用函数，则得到的是new关键字后面的函数本身

function Person(firstName, lastName) {
    //判断是否是使用new的方式来调用的函数

    //过去的判断方式 但是这种方式不好 可以使用强行传入一个一样的对象例如： const p3 = Person.call(new Person("你", "好"), "你", "好") 这种调用方式绕开
    // if (!(this instanceof Person)) {
    //     throw new Error("该函数没有使用new来调用")
    // }

    if (new.target === undefined) {
        throw new Error("该函数没有使用new来调用")
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
}

const p1 = new Person("你", "好");
console.log(p1)

const p2 = Person("你", "好");
console.log(p2);

const p3 = Person.call(p1, "你", "好")
console.log(p3);

```

# 箭头函数

回顾：this指向

1. 通过对象调用函数，this指向对象
2. 直接调用函数，this指向全局对象
3. 如果通过new调用函数，this指向新创建的对象
4. 如果通过apply、call、bind调用函数，this指向指定的数据
5. 如果是DOM事件函数，this指向事件源

## 使用语法 <!-- {docsify-ignore} -->

箭头函数是一个函数表达式，理论上，任何使用函数表达式的场景都可以使用箭头函数

- 什么是函数表达式：使用了运算符号
- 什么函数声明：使用的声明关键字

完整语法：

```js
(参数1, 参数2, ...)=>{
    //函数体
}
```

如果参数只有一个，可以省略小括号

```js
参数 => {

}
```

如果箭头函数只有一条返回语句，可以省略大括号，和return关键字

```js
参数 => 返回值
```

## 注意细节 <!-- {docsify-ignore} -->

- 箭头函数里面的 this 指向与调用没有关系 只和定义位置有关系 在哪里定义的this就是定义位置的this （箭头函数里面没有this）  
- 箭头函数中，不存在this、arguments、new.target，**如果使用了，则使用的是函数外层的对应的this**、arguments、new.target
- 箭头函数没有原型
- 箭头函数不能作用构造函数使用 （因为没有原型嘛）

> 对象的属性最好不要用箭头函数 因为对象的属性this是window 例如：
```js
let obj={
    a:123,
    b:()=>{
        // 因为箭头函数没有this 就会取父级的this 也就是obj obj里面this 是window
        console.log(this) //这里的this 是指向window
    }
}
// 相对于下面这样
let obj={
    a:123,
    b:this //this就是window
}

let obj={
    a:123,
    b:function(){
        console.log(this) //this是obj
    } 
}
```

## 应用场景 <!-- {docsify-ignore} -->

1. **临时性使用的函数**，并不会可以调用它，比如：
   1. 事件处理函数
   2. 异步处理函数
   3. 其他临时性的函数
2. 为了绑定外层this的函数
3. 在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数

