## 移动端基础事件 <!-- {docsify-ignore} -->

| 事件名     | 解释                       |
| ---------- | -------------------------- |
| touchstart | 手指按下事件 类似mousedown |
| touchmove  | 手指移动事件 类似mousemove |
| touchend   | 手指抬起事件 类似mouseup   |

**注意**：移动端事件最好用事件监听函数来添加，不要用on添加
**原因** ：addEventListenner可以重复添加函数 而on是覆盖原来的

```html
     <body>
        <div id="box"></div>
        <script>
            var box=document.querySelector('#box'); //iso10 里面querySelector不支持id选择器 
            box.addEventListener('touchstart',()=>{
                console.log('手指按下去了');
            });
 
            box.addEventListener('touchmove',()=>{
                console.log('手指滑动了');
            });
 
            box.addEventListener('touchend',()=>{
                console.log('手指抬起了');
            });
             
        </script>
    </body>
```
## 移动端事件与pc事件的区别 <!-- {docsify-ignore} -->

1、触发点

    pc端
        mousemove   不需要鼠标按下，但是必需在元素上才能触发
        mouseup     必需在元素上抬起才能触发 
    移动端
        touchmove   必需手指按下才能触发，但是，按下后不在元素上也能触发
        touchend    不需要在元素上抬起就能触发

2、触发顺序

    touchstart → touchend → mousedown → click → mouseup

    （pc的事件在移动端里会有延迟，300ms左右）这是当时苹果发布一款（2007年）当时网页还基本没有手机端的适配
     ios手机为了实现放大的就做了双击放大 后面（2008年）安卓发布照搬ios的这个方案

3、touchstart与click的区别

    touchstart为手指碰到元素就触发，click为手指碰到元素并且抬起才会触发
    click事件=>如果点击过后过一段时间在抬起 click是不会触发的

## 移动端事件的问题 <!-- {docsify-ignore} -->

事件点透

    出现场景：有两层重叠的元素，上面的元素有touch事件（点击后要消失），下面是一个默认会触发click事件的元素（a、表单元素、带click事件的元素）
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
        <title></title>
        <style>
            #box{
                width: 200px;
                height: 200px;
                background: green;
                color: #fff;
 
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0.5;
            }
 
            input{
                border: 1px solid #000;
            }
        </style>
    </head>
    <body>
        <a href="http://www.baidu.com/">度娘</a><br>
        <input type="text">
        <p>测试文字</p>
        <div id="box"></div>
        <script>
            const box=document.querySelector('div');
            box.addEventListener('touchstart',ev=>{
                box.style.display='none';
                // ev.preventDefault();    //取消事件的默认动作
            });
            const p=document.querySelector('p');
            p.addEventListener('click',()=>{
                alert('测试被点击了');
            });
        </script>
    </body>
</html>
```
解决方案：

    1、下层的元素不要用能点击的标签，并且不要给它们添加事件
    2、把上面的元素的事件换成click事件
    3、取消事件的默认动作 e.preventDefault()