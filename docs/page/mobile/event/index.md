## 移动端基础事件 

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
## 移动端事件与pc事件的区别 

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

## 移动端事件的问题 

事件点透

    出现场景：有两层重叠的元素，上面的元素有touch事件（点击后要消失），下面是一个默认会触发click事件的元素（a、表单元素、带click事件的元素）
    
**注意**：如果上面元素和下面元素是同一样的事件 是不会触发的事件点透的

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

## 取消事件默认动作的作用及问题 

取消事件默认动作的作用 `e.preventDefault()` 

    1、touchmove
        1、阻止了浏览器的滚动条
        2、阻止了用户双指缩放
    2、touchstart
        1、解决ios10+及部分安卓机通过设置viewport禁止用户缩放的功能（双指滑动、双击）
        2、解决事件点透问题
        3、阻止图片文字被选中
        4、阻止了长按元素会弹出系统菜单
        5、阻止了浏览器回弹的效果
        6、阻止了浏览器的滚动条
        7、阻止了鼠标的事件
        8、阻止了input框的输入功能

如果设置在**全局**上面就像是页面假死一样 什么都不能操作了

## 事件对象 

目前移动端浏览器里面 最大只能识别5根手指 （至少google浏览器是这样）

| 事件对象里面相当重要的三个属性 | 解释                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------- |
| touches                        | 位于当前屏幕上的所有手指列表（但是**必需至少**有1个手指在添加触发事件的元素上） |
| targetTouches                  | 位于当前DOM元素上的手指列表                                                     |
| changedTouches                 | 触发当前事件的手指列表                                                          |

## 轮播图案例 

利用了淘宝的 [transformjs库](https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs)  
[案例地址](/page/mobile/[选修]移动端适配所需资料/03-移动端事件课件/07-轮播图例子.html)
