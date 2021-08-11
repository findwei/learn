## 动画

1. transition 
2. animation
3. 定时器 
   
   一般不用，因为不好有延迟而且更具不同设备的刷新频率不一样但是定时器设置的值是一样的效果不好，**定时器做动画容易丢帧和卡顿**
4. requestAnimationFrame 
   
   相当于一个定时器，h5新增，他刷新的频率是取的屏幕得刷新频率 **一般不会发生丢帧和卡顿**
   页面使用了requestAnimationFrame但是未激活是不会发生动画的
5. Tween.js （第三放动画库）
   
## requestAnimationFrame

requestAnimationFrame(callback)     由浏览器专门为动画提供的API

    1、参数为回调函数
    2、函数有个返回值，为编号（与定时器一样），用于清除动画

cancelAnimationFrame(返回值)       清除动画

支持情况：

    1、Firefox   11~22的版本需要加前缀，22以上版本不需要加
    2、Chrome    22-23的版本需要加前缀，23以上版本不需要加
    3、IE        9以上版本支持，不需要加前缀
    4、IOS       6的版本需要加前缀，6以上的版本不需要加
    5、Android   4.4的版本需要加前缀，4.4以上的版本不需加

问题：
requestAnimationFrame()**调用一次走一次** 一般利用递归来调用就可以实现循环 如下：

```js
<body>
<div style="background: lightblue;width: 0;height: 20px;">0%</div>
<button>走你</button>
</body>
const div=document.querySelector('div'),
    btn=document.querySelector('button');
    
let timer=null;
 btn.onclick=()=>{
        //requestAnimationFrame(move);
        div.style.width=0;
        cancelAnimationFrame(timer);    //避免多次调用

        timer=requestAnimationFrame(function fn(){
            move();

            timer=requestAnimationFrame(fn);

            if(div.offsetWidth>=500){    //关闭
                cancelAnimationFrame(timer);
            }
        });

    }
function move(){
    div.style.width=div.offsetWidth+5+'px';
    div.innerHTML=div.offsetWidth/5+'%';
}
```

注意：它们是window身上的方法
[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

## Tween.js 

```js
  const div=document.querySelector('div'),
        btn=document.querySelector('button');

    let t=0,    //当前的时间，这里为0，表示从0开始
        b=0,    //初始值，元素一开始的位置
        c=200,  //运动200px
        d=100;  //整个运动所需要的时间 
        
    btn.onclick=()=>{
        t++;
        const result=Tween['linear'](t,b,c,d);
        div.style.transform=`translateX(${result}px)`;
    }
```
