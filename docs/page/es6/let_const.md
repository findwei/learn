#
# 声明变量的问题

使用var声明变量

1. 允许重复的变量声明：导致数据被覆盖

    ```js
    var a =1
    //此处省略十万行代码
    var a =2
    console.log(a) // 2 
    ```

2. 变量提升：怪异的数据访问、闭包问题

    ```js
    //变量声明提升
    console.log(a) //undefiend 你没报错就是因为变量声明提升
    var a = 123

    // 经典的闭包问题
    for (var i = 0; i < 10; i++) {
        var btn = document.createElement('button')
        btn.innerText = '按钮' + i
        btnc.appendChild(btn)
        btn.onclick = function () {
            console.log(i) //点击 一直输出10
        }
    }
    //上面写发相当于下面这种 因为变量声明提升
    var i = 123  
    for (i = 0; i < 10; i++) {
        var btn = document.createElement('button')
        btn.innerText = '按钮' + i
        btnc.appendChild(btn)
        btn.onclick = function () {
            console.log(i) //点击 一直输出10
        }
    }
    console.log(i) //10

    //以前的解决方案 （利用自执行函数）
     for (var i = 0; i < 10; i++) {
        var btn = document.createElement('button')
        btn.innerText = '按钮' + i
        btnc.appendChild(btn)
        (function(j){
        btn.onclick = function () {
            console.log(i) //输出正确
        }
        })(i)
    }
    // 用let 解决
     for (let i = 0; i < 10; i++) {
        var btn = document.createElement('button')
        btn.innerText = '按钮' + i
        btnc.appendChild(btn)
        btn.onclick = function () {
            console.log(i) //输出正确
        }
    }
    ```

3. 全局变量挂载到全局对象：全局对象成员污染问题

# 使用let声明变量

在es6之前只有全局作用域 与 函数作用域

ES6不仅引入let关键字用于解决变量声明的问题，同时引入了块级作用域的概念 

块级作用域：代码执行时遇到花括号，会创建一个块级作用域，花括号结束，销毁块级作用域

```js
    {
        // 一对花括号就是 块级作用域
    }
```

声明变量的问题

1. 全局变量挂载到全局对象：全局对象成员污染问题

let、const声明的变量不会挂载到全局对象

2. 允许重复的变量声明：导致数据被覆盖

let、const声明的变量，不允许当前作用域范围内重复声明

在块级作用域中用let、const定义的变量，在作用域外不能访问

3. 变量提升：怪异的数据访问、闭包问题

使用let不会有变量提升，因此，不能在定义let变量之前使用它

**底层实现上，let声明的变量实际上也会有提升**，但是，提升后会将其放入到“暂时性死区”，如果访问的变量位于暂时性死区，则会报错：“Cannot access 'a' before initialization”。当代码运行到该变量的声明语句时，会将其从暂时性死区中移除。

在循环中，用let声明的循环变量（**不能用const**），会特殊处理，每次进入循环体，都会开启一个新的作用域，并且将循环变量绑定到该作用域（每次循环，使用的是一个全新的循环变量）

在循环中使用let声明的循环变量，在循环结束后会销毁

# 使用const声明常量

const和let完全相同，仅在于用const声明的变量，必须在声明时赋值，而且不可以重新赋值。

实际上，在开发中，应该尽量使用const来声明变量，以保证变量的值不会随意篡改，原因如下：

1. 根据经验，开发中的很多变量，都是不会更改，也不应该更改的。
2. 后续的很多框架或者是第三方JS库，都要求数据不可变，使用常量可以一定程度上保证这一点。

注意的细节：

1. 常量不可变，是指声明的常量的**内存空间不可变，并不保证内存空间中的地址指向的其他空间不可变**。
    
    这意味着 可以改对象里面的属性

2. 常量的命名
   1. 特殊的常量：该常量从字面意义上，一定是不可变的，比如圆周率、月地距地或其他一些绝不可能变化的配置。通常，**该常量的名称全部使用大写，多个单词之间用下划线分割**
   2. 普通的常量：使用和之前一样的命名即可

3. 在for循环中，循环变量不可以使用常量

