<!--
 * @Author: 钱巍
 * @Date: 2022-11-25 12:02:44
 * @LastEditTime: 2023-03-07 14:37:22
 * @LastEditors: 钱巍
 * @Description:
 * @FilePath: \learn\docs\page\javascript\index.md
 * 没有理想，何必远方。
-->

# 基础知识

<!-- [基础 pdf 文档](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/javascipt/js基础.pdf) -->
<!-- [基础 pdf 文档](/page/javascript/img/js基础.pdf) -->
<a href="/page/javascript/img/js基础.pdf" target="_blank">js基础pdf文档</a>

# this

> this 是一个对象

js 里面 this 是动态得取决与谁调用 this 指向谁

# 预编译

要了解 `预编译` 首先要知道js运行机制 js代码运行前会发生 下面三部
1. 语法分析 （通篇扫描 看看有没有语法错误）
2. 预编译 （解决执行顺序问题 ）
3. 解释执行 （解释一行 执行一行）

```js
function test() {
    console.log('test');
}
test();
// 上面能执行 
// 
test1();

function test1() {
    console.log('test1');
}
// 也能执行，因为有预编译的存在 发生了函数声明提升
var a = 123;
console.log(a); // 123 
// 
console.log(b); //undefiend
var b = 123;
```

imply global 暗示全局变量：即任何变量，如果变量未经声明就赋值，此变量就为全局对象(浏览器是window)所有。 
全局对象和执行环境有关系 浏览器是window 、node里面是global

```js
// 要明白 声明 和 赋值 
var a = 123 //这句话其实两步 声明变量 和 变量赋值
// 可以拆解成下面这样
var a;
a = 123
// 未经声明的变量就赋值 归全局对象
b = 10
// b=10 => window.b=10
```

## （函数）预编译的四部曲： 

> （函数）预编译发生在函数执行的前一刻

1. 创建 AO 对象Activation Object(执行期上下文，作用是理解的作用域，函数产生的执行空间库) 
2. 找形参和变量声明，将变量和形参名作为AO属性名，值为undefined (变量声明提升)
    相当于AO{ 
    a : undefined, 
    b : undefined 
    } 

3. 将实参值和形参统一（把实参值传到形参里） 
4. 在函数体里面找函数声明，值赋予函数体 （先看自己的AO，再看全局的GO） （函数声明提升）

```js
// 
function fn(a) {
    console.log(a); //function a() {}
    var a = 123;
    console.log(a); //123
    function a() {}
    console.log(a); // 123
    var b = function() {}
    console.log(b); //function b() {}
    function d() {}
}
fn(1);
```

## 全局的预编译三部曲

1. 生成了一个GO的对象Global Object（浏览器就是window = GO） （没有声明就是赋值了，归window所有，就是在GO里面预编译）
2. 找形参和变量声明，将变量和形参名作为GO属性名，值为undefined 
3. 在函数体里面找函数声明，值赋予函数体 
**注意**
先生成GO还是AO? 想执行全局，先生成GO，在执行test的前一刻生成AO ，在几层嵌套关系，近的优先，从近的到远的，有AO就看AO，AO没有才看GO 

```js
console.log(test); // function test(test){...}
function test(test) {
    console.log(test); // fuction test () {}
    var test = 234;
    console.log(test);
    234

    function test() {}
}
test(1);
var test = 123;
// 下面是模拟的流程
// 经过 go 三部曲 变成下面这样
// 创建 GO ={
//   test : function test(test){...}
// }
// test(1) 执行
// 经过函数预编译四步
// 创建 AO ={
//  test:function test() {}
// } 
```

## 预编译注意

>
> es5 作用域 =》 全局作用域 、 函数作用域
>
> es6 作用域 =》 全局作用域 、 函数作用域 、块级作用域
>

es6出现了 `块级作用域` 和 `let` 、 `const` 声明变量**不存在变量声明提升**，es6里面声明函数也类似 `let`

用在块级作用域中， `let` 、 `const` 将变量的作用域限制在块内，还会出现暂时性死区

**暂时性死区的本质就是**，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

1. 条件语句里面定义函数 （例如：if里面**定义函数** ）
    注意：定义函数并不是函数赋值给变量 有条件里面函数赋值给变量是不存在这个问题的 

    函数可以被有条件来声明，这意味着，在一个 if 语句里，函数声明是可以嵌套的。有的浏览器会将这种有条件的声明看成是无条件的声明，无论这里的条件是 true 还是 false，浏览器都会创建函数。因此，**它们不应该被使用**。

    函数可以被有条件来声明，这意味着，函数声明可能出现在一个 if 语句里，但是，这种声明方式在**不同的浏览器里可能有不同的效果**。因此，**不应该在生产环境代码中使用这种声明方式，应该使用函数表达式来代替**。

2. 条件语句里面定义变量（例如：if里面使用var定义变量）
   

es5和es5之前 的时候条件语句里面写了函数声明和变量声明 会提升到当前的作用域顶部（全局作用域 、 函数作用域）和上面的预编译没有区别 **这时候没有块级作用域**

es6和es6之后 的时候条件语句里面写了函数声明和变量声明 遵循下面几点（为了兼容以前老代码）由于**ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。**  

```js
// 根据 ES5 的规定都是非法的。 在现在es6的执行环境中 {}是块级作用域 
// 这就矛盾了es5明确规定 函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

// 情况一
if (true) {
    function f() {}
}
// 情况二
try {
    function f() {}
} catch (e) {
    // ...
}
```

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

所以**ES6 引入了块级作用域**，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，**函数声明语句的行为类似于let，在块级作用域之外不可引用。**

```js
//  ES5 环境中运行
function f() {
    console.log('I am outside!');
}
(function() {
    if (false) { //不管这里是true还是false 结果一样的 发生预编译的时候不管执行条件
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }

    f(); //会得到“I am inside!”，
}());

// 浏览器的 ES6 环境
console.log(foo);
if (false) {
    function foo() {
        return 1;
    }
}
// 在 Chrome 里：
// 'foo' 变量名被提升，但是 typeof foo 为 undefined
//
// 在 Firefox 里：
// 'foo' 变量名被提升。但是 typeof foo 为 undefined
//
// 在 Edge 里：
// 'foo' 变量名未被提升。而且 typeof foo 为 undefined
//
// 在 Safari 里：
// 'foo' 变量名被提升。而且 typeof foo 为 function

// 浏览器的 ES6 环境
// 根据下面 规则只对 ES6 的浏览器实现有效 分析
function f() {
    console.log('I am outside!');
}
(function() {
    // 函数作用域 AO { f = undefiend} 这里是if里面的函数提升上来的
    if (false) { //false true都不影响提升
        //es6 {} 这是一个块级作用域了 因为块级作用域内声明的函数类似于let
        // 重复声明一次函数f
        // 块作用域  预编译 AO{ f:function f() {...}}
        function f() {
            console.log('I am inside!');
        }
    }
    // 这里为什么会报错 如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
    f(); //报错 Uncaught TypeError: f is not a function  当执行到这里的时候 由于if是flase 没有执行到f函数声明语句 不会吧 块里面的f 赋值到 函数作用域里面的 f  所以执行函数作用域f报错
}());
```

**下面规则只对 ES6 的浏览器实现有效**
* 允许在块级作用域内声明函数。
* 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。（**这里类似`var` 所以提升到全局作用域或函数作用域的头部 变量=`undefiend`** **不同浏览器也不一样 `Safari`里面是 `function`**）
* 同时，函数声明还会提升到所在的块级作用域的头部。(**这里是 函数声明提升 所以这个变量在块级作用域的头部 变量=函数体**)
* 当执行到块里面的`函数声明`语句或者`var`声明 会把当前块里面这个`函数声明变量`或者`var声明变量`的值赋值给之前提升到(全局作用域、函数作用域)里面的变量
  

```js
// 例1
// GO={a:undefiend}
var a = 0;
// GO={a:0}
console.log("1 a:", a); //0
// GO:{a=1} 是if里面执行到 定义function a() {} 的时候更改的
if (true) {
    // AO={a:function a() {}}
    a = 1;
    //  AO={a:1}
    function a() {} //当执行到这一步的时候 将当前块作用域的 a = 1  赋值给 全局作用域的 a 
    //  AO={a:1}
    a = 5;
    //  AO={a:5}
    console.log("2 a:", a); //5
}
console.log("3 a:", a); //1

// 例2
var a = 0;
console.log("1 a:", a); //0
if (true) {
    a = 1;
    a = 5;
    console.log("2 a:", a); //5
    function a() {}
}
console.log("3 a:", a); //5

// 例3
var a = 0;
console.log("1 a:", a); //0
if (true) {
    function a() {}
    a = 1;
    a = 5;
    console.log("2 a:", a); //5
}
console.log("3 a:", a); //function a {}

// 例4
// GO={a:undefiend}
console.log("1 a:", a); //undefiend
// GO={a:function a() {} } 是if里面执行到 定义function a() {} 的时候更改的
if (true) {
    // AO={a: function a() {} }
    function a() {} //执行到这里 改变GO={a=AO.a=function a() {}}
    a = 1;
    // AO={a: 1 }
    a = 5;
    // AO={a: 5 }
    console.log("2 a:", a); //5
}
console.log("3 a:", a); //function a {}

// 例5 - 里面是var声明不是函数 
// GO={a:undefiend}
console.log("1 a:", a); //undefiend
// GO:{a=1} 是if里面执行到 var a; 的时候更改的
if (true) {
    // AO={a:undefind}
    a = 1;
    //  AO={a:1}
    var a; //当执行到这一步的时候 将当前块作用域的 a = 1  赋值给 全局作用域的 a 
    //  AO={a:1}
    a = 5;
    //  AO={a:5}
    console.log("2 a:", a); //5
}
console.log("3 a:", a); //1

// 例6 - 里面是var声明不是函数 
// GO={a:undefiend}
console.log("1 a:", a); //undefiend
if (false) { //false 走不进来 只是预编译的时候将 var a 提升到块顶部和全局顶部
    // AO={a:undefind}
    a = 1;
    var a;
    a = 5;
    console.log("2 a:", a); //5
}
console.log("3 a:", a); //undefiend
```
