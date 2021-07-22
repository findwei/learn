## 适配方案
    目前前端适配的方案基本就是下面这几种了
     适配的方法：
        1、百分比适配
        2、viewport缩放
        3、DPR缩放
        4、rem适配
        5、vw、vh适配
```html
     <!-- 
            适配：在不同尺寸的手机设备上，页面相对性的达到合理的展示（自适应）或者保持统一效果的等比缩放（看起来差不多）
                适配的元素：
                    1、字体
                    2、宽高
                    3、间距
                    4、图像（图标、图片） 
            https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
            https://material.io/tools/devices/
            http://screensiz.es/phone
         -->
```
### 百分比适配

    这个没什么好说了的

### viewport缩放

    viewport缩放适配原理就是利用js去设置viewport缩放比  把所有机型的设备独立像素设置成一致的（也就是css像素）
    1、viewport需要通过js动态的设置（不能直接把device的值设置成数值）
    2、通过设置比例（初始比例以及缩放比例），把宽度缩放成一致的

    缺点：1.以375为例 这样设置 就是将所有的手机的实际视口宽度 通过缩放 设置成375px 在高清屏上面就会出现模糊 
         例如现在现在iphon6 puls 实际像素1242 dpr3 那么css像素是414 但是现在视口是375px 将页面相当于放大了
         这对用户来说体验并不好（因为我买的一个大屏的手机）看到的效果和小屏幕手机是一样的 有可能还因为放大了而显示模糊

         2.还因为存在小数 有可能精度不准
        
    公式:
    页面缩放比=css像素/viewport宽度
    viewport宽度=css像素/缩放比
    dpr=设备物理像素/css像素
    css像素=设备物理像素/dpr
    例如：
    ipohe6 设备像素=750  dpr=2
    css像素 = 375 = 750/2
    页面缩放比=1 =375/375 viewport宽（这里是你想要的页面宽度）如果你设计图是375 那么就是375

    ipohe6puls 设备像素=1242  dpr=3
    css像素 = 414 = 1242/3
    页面缩放比=1.104= 414/375 viewport宽（这里是你想要的页面宽度）如果你设计图是375 那么就是375

```html
<meta name="viewport" id="view" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
 <script>
    (function(){
        //获取css像素（这时viewport没有缩放）
        var curWidth=document.documentElement.clientWidth;
        var curWidth=window.innerWidth;
        var curWidth=window.screen.width;
            
        console.log(curWidth);

        var targetWidth=375; //设计图宽 也就是想要的viewport的宽
        var scale=curWidth/targetWidth;
        console.log(scale);

        var view=document.getElementById('view');
        console.log(view.content);
        // 将minimum-scale、maximum-scale也设置成一样的是为了解决有些手机上面的bug
        view.content='initial-scale='+scale+',user-scalable=no,minimum-scale='+scale+',maximum-scale='+scale+'';
    })();
</script>
```

### dpr缩放

    为rem铺路
        
### rem适配 （主流）

