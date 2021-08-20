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

