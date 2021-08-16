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

    //以前的解决方案
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
    ```

3. 全局变量挂载到全局对象：全局对象成员污染问题

# 使用let声明变量
