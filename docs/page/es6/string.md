#
# unicode

早期，由于存储空间宝贵，Unicode使用16位二进制来存储文字。我们将一个16位的二进制编码叫做一个码元（code unit）（能存储2的16次方）

后来，由于技术的发展，Unicode对文字编码进行了扩展，将某些文字扩展到了32位（占用两个码元），并且，将某个文字对应的二进制数字叫做码点（Code Point）。（能存储2的32次方）

ES6为了解决这个困扰，为字符串提供了方法：codePointAt，根据字符串码元的位置得到其码点。

同时，ES6为正则表达式添加了一个flag: u，如果添加了该配置，则匹配时，使用码点匹配

**码元是最小单位 一个码点可能占用一个码元或者两个码元**

```js
 const text = "𠮷" //(ji) 占用了两个码元
 console.log(text.length) // 2 //根据码元来取的所以是2
 console.log(/^.$/.test(text)) // false 匹配一个字符 正则也是更具码元来匹配的
```
```js
const text = "𠮷"; //占用了两个码元（32位）

console.log("字符串长度：", text.length);
console.log("使用正则测试：", /^.$/u.test(text)); // true 加了修饰符 u 更具码点来匹配
console.log("得到第一个码元：", text.charCodeAt(0)); //得到第一个码元： 55362
console.log("得到第二个码元：", text.charCodeAt(1)); //得到第二个码元： 57271
text.charCodeAt(0).toString(16) //d842
text.charCodeAt(1).toString(16) //dfb7
//𠮷：\ud842\udfb7
console.log("得到第一个码点：", text.codePointAt(0)); //得到第一个码点： 134071 codePointAt(0)检测到码点数大于2的16次方 就会往后面看 然后输出全部码点
// 与charCodeAt不同的地方是，当处理到当前位码元时，如果超过了16位2进制数值的上线，他就明白这是一个32位2进制数，就会以32位2进制数当作一个来处理。
console.log("得到第二个码点：", text.codePointAt(1)); //得到第二个码点： 57271 这个只会输出后面的 码点 因为他小于 2的16次法

/**
 * 判断字符串char，是32位，还是16位
 * @param {*} char 
 */
function is32bit(char, i) {
    //如果码点大于了16位二进制的最大值，则其是32位的
    return char.codePointAt(i) > 0xffff;
}

/**
 * 得到一个字符串码点的真实长度
 * @param {*} str 
 */
function getLengthOfCodePoint(str) {
    var len = 0;
    for (let i = 0; i < str.length; i++) {
        //i在索引码元
        if (is32bit(str, i)) {
            //当前字符串，在i这个位置，占用了两个码元
            i++;
        }
        len++;
    }
    return len;
}

console.log("𠮷是否是32位的：", is32bit("𠮷", 0))
console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab"))
```

# 更多的字符串API

以下均为字符串的实例（原型）方法

- includes 

判断字符串中是否包含指定的子字符串 返回boolean

`str.includes('a',3)` 重str下标3开始查找 a

- startsWith

判断字符串中是否以指定的字符串开始

相当于indexof() 返回0

- endsWith

判断字符串中是否以指定的字符串结尾

- repeat

将字符串重复指定的次数，然后返回一个新字符串。

`let str='ab'.repeat(3)` str => ababab

# 模板字符串

ES6之前处理字符串繁琐的两个方面：

1. 多行字符串
2. 字符串拼接


在ES6中，提供了模板字符串的书写，可以非常方便的换行和拼接，要做的，仅仅是将字符串的开始或结尾改为 ` 符号

如果要在字符串中拼接js表达式，只需要在模板字符串中使用```${JS表达式}```

```js
    // es6之前 利用\n来换行 （利用转意字符还实现换行 tab 等...）
    str='q'+b+'c\n
    d'
    //es6 里面直接使用不需要转意 但是也能使用转意字符
    str = `q${b}c
    d` 
```

# [扩展]模板字符串标记

在模板字符串书写之前，可以加上标记:

```js
标记名`模板字符串`
```

标记是一个函数，函数参数如下：

1. 参数1：被插值分割的字符串数组
2. 后续参数：所有的插值

[String.raw](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw) 原样输出 模板字符串里面的东西不会被转义 

```js
String.raw`abc\t\nbcd` //原样输出 不会被转义 

``` 


```js

var love1 = "秋葵";
var love2 = "香菜";

//myTag 必须是函数 如果不是函数会报错 myTag is not a function
var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}。`;
//相当于： 
// text = myTag(["邓哥喜欢", "，邓哥也喜欢", "。"], love1, love2)

var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}`;
//相当于： 
// text = myTag(["邓哥喜欢", "，邓哥也喜欢", ""], love1, love2)

function myTag(parts) {
     // Array.prototype.slice.apply(arguments)
    // 因为arguments 是类数组 Array.prototype.slice.apply(arguments)将他转换成真正的数组 还可以这样写 [].slice.call(arguments)  
    //详情： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const values = Array.prototype.slice.apply(arguments).slice(1);
    let str = "";
    for (let i = 0; i < values.length; i++) {
        str += `${parts[i]}：${values[i]}`;
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;
}

console.log(text);

// String.raw写什么输出什么 转义字符失效
var text = String.raw`abc\t\nbcd`;

console.log(text);
```


