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

*为rem铺路*

DPR缩放适配     根据dpr的值，把视口进行缩放，缩放到物理像素，也就是把css像素的值设置成物理像素，让所有的设备都变成一个css像素对应一个设备像素

    例如：iphone6 puls
        物理像素 ：750 css像素 ：375 dpr : 2
        利用dpr 将css像素设置成 750

> rem借鉴这种方式 实现了px转rem不用麻烦的计算 是一种相当好的适配方案

```js
 (function(){
    /*
        375*2   750 
        320*2   640

        375/?=750   => 375/750=2
        1/dpr

        320/scale=640   =>   scale=320/640   1/2
        */

    var meta=document.querySelector('meta[name="viewport"]');
    var scale=1/window.devicePixelRatio;

    if(!meta){
        //这个条件成立说明用户没有写meta标签，我需要创建一个
        meta=document.createElement('meta');
        meta.name='viewport';
        meta.content='width=device-width,initial-scale='+scale+',user-scalable=no,minimum-scale='+scale+',maximum-scale='+scale+'';
        document.head.appendChild(meta);
    }else{
        meta.setAttribute('content','width=device-width,initial-scale='+scale+',user-scalable=no,minimum-scale='+scale+',maximum-scale='+scale+'');
    }
})();
```
        
### rem适配 （主流）

**了解rem前先了解em**

     em     作为font-size的单位时，其代表父元素的字体大小（就是1em=父级的font-size大小），作为其他属性单位时，代表自身字体大小(就是1em=自己的font-size大小)          
            font-size:20px      1em=20px
            问题：
                1、chrom下有最小字体限制，必需为12px，所以这个值不能小于12
                2、如果两个一样的元素，但是里面字体不一样，那就不能统一设置了。或者元素字体变化了，就又要统一设置一遍
                
    rem     CSS3新增的一个相对单位，是相对于根元素字体大小；

            r   root
            html{font-size:20px}        2rem=40px


em 换算如下：
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,minimum-scale=1,maximum-scale=1">
        <title></title>
        <style>
            .em{
                font-size: 30px;
                border: 1px solid #000;
                width: 10em;    /* 1em=30px */
                height: 10em;
            }
            .em p{
                font-size: 2em; /* 1em=30px */
                width:5em; /* 1em=自己的font-size:2em=60px */
            }
 
            html{
                font-size: 20px;
            }
            .rem{
                width: 10rem;   /* 1rem=20px; */
                height: 10rem;
 
                border: 1px solid #000;
            }
        </style>
    </head>
    <body>
     
        <div class="em">
            <p>em-</p>
        </div>
        <div class="rem">
            rem-
        </div>
    </body>
</html>
```
**rem 布局原理**

    rem适配的原理：把所有的设备都分成相同的若干份，再计算元素宽度所占的份数

    1、元素适配的宽度（算出来的）
        =元素所占的列数*一列的宽
        =元素所占的列数*1rem

    2、元素在设计稿里的宽度（量出来的）
    3、列数（随便给的）
        100
    4、一列的宽度（算出来的）
        =屏幕实际的宽度（css像素）/列数
        一列的宽度就是1rem

    5、元素实际占的列数（算出来的）
        =元素设计稿里的宽/一列的宽
        =元素设计稿里的宽/1rem

    var colWidth=屏幕实际的宽度（css像素）/100;
    50*colWidth //50列所占的宽
        
    var colWidth=0; //一列的宽
    var col=100;    //列数

    //分别算出iphone5与iphone6里面一列的宽度
    colWidth=375/100;   //3.75px    iphone6 
    colWidth=320/100;   //3.2px     iphone5

    //假如一个div需要占10列，算出div的分别在两个手机里的宽度
    var divWidth=0;     //div的宽度
    divWidth=10*3.75;   //37.5px    iphone6里div的宽度
    divWidth=10*3.2;    //32px      iphone5里div的宽度
        
    //根据设计稿里元素的宽算出来它所占的列数
    var divWidth=50;    //div在设计稿里实际的宽（量出来的）
    var divCol=0;       //要算出div所占的列数

    //以iphone6为例，一列的宽为3.75px，那50px占多少列？
    divCol=50/3.75;     //13.333    在iphone6里所占的列数
    divCol=50/3.2;      //15.625    在iphone5里所占的列数

    /* html{
        font-size:屏幕实际的宽度（css像素）/列数
    } */

**设置根节点大小**

        1、元素适配的宽度=元素所占的列数*1rem
        2、一列的宽度=屏幕实际的宽度（css像素）/列数
        3、元素实际占的列数=元素设计稿里的宽/1rem
            
        (function(){
            var html=document.documentElement;  //html
            var width=html.clientWidth;     //css像素
                
            console.log(width);
                
            html.style.fontSize=width/16+'px';  //把屏幕分成了16列，以iphone为例得出一个列的值为整数
        })();


        //iphone5
        //1rem=20px;        一列的宽度
        //80/1rem=80/20=4;  元素实际占的列数
        //4*1rem=4rem;      元素适配的宽度


        //iphone6
        //1rem=375/16=23.4375;  一列的宽度
        //4*1rem=4*23.4375=93.75;   元素适配的宽度
        //4*93.75=375;      css的宽度

        //真正切图时候的方法!!!
        //1、算rem，还是根据设备实际的css像素算
        //2、量出一个元素在设计稿里的尺寸
        //3、拿这个尺寸除以DPR值后，再去换算rem
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
        <title></title>
        <style>
            body{
                margin: 0;
            }
 
            div{
                background: green;
                float: left;
                 width: 1.875rem;
                 height: 1.875rem;
            }
            img{
                width: 7.5rem;
            }
        </style>
        <script>
            (function(doc, win, designWidth) {
                // designWidth 这是设计图的尺寸

                // 获取html元素
                const html = doc.documentElement;
                //const dpr = win.devicePixelRatio; //dpr
                
                function  refreshRem() { //  这里不能使用箭头函数 在ios12上面兼容有问题
                    // 获取 视口宽度
                    const clientWidth = html.clientWidth;
                    // 
                    if (clientWidth >= designWidth) { //给宽度一个最大值，如果设备的宽度已经超过设计稿的尺寸了，统一按一个值去算（传的第三个参数）
                        html.style.fontSize = '100px';
                    } else {
                        //html.style.fontSize= 16 * clientWidth / 375 + 'px';
                        // 将视口分成100份 
                        html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
                    }
                };
                 
                //dom加载完的一个事件
                doc.addEventListener('DOMContentLoaded', refreshRem);
            })(document, window, 750);
            /*
                16 * clientWidth / 375 
                    => clientWidth / 375 * 16 
                    => clientWidth / (375 / 16)
 
                //这么写的目的是为了找一个基准点，就是iphone6
 
                320 / (375 / 16) = 13.653;  iphone5 
                375 / (375 / 16) = 16;      iphone6
                414 / (375 / 16) = 17.664;  iphone6 p
 
                320 / 16 = 20;
                375 / 16 = 23.4375;
                424 / 16 = 26.5
             */
        </script>
    </head>
    <body>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <img src="images/img_12.jpg" alt="">
    </body>
</html>

```
 目前主流的rem 适配的方案
 1. hotcss （预处理语言来换算）
     https://github.com/imochen/hotcss 

 2. flexible
     https://github.com/amfe/lib-flexible

###  VW、VH适配 （这是未来最好的方案目前因为支持不好所以应用少）

    支持情况
        >=ios 8 
        >=Android 4.4

> vw vh其实是浏览器帮我们自动计算了 本质上和rem是一样的

    vw      Viewport's width的简写，1vw等于视口宽度的1% 相当于把视口分成100份
    vh      Viewport's height的简写，1vh等于视口高度的1%
    vmin    取vw和vh中最小的值
    vmax    取vw和vh中最大的值


1. 方案一：通篇使用vw 
   
    iphone6
    1vw=375/100=3.75px;

    iphone6 p
    1vw=414/100=4.14px;

    750/2/3.75=100
        => 750/(2*3.75)
        => 750/(7.5)
        => 750/(750/100)
        => 750/750*100

        100 * (clientWidth / designWidth)
例如：通过scss 自动设置 [预处理语言处理单位](/page/mobile/[选修]移动端适配所需资料/01-移动端布局课件/css)

```scss
    @function vw($px){
    @return $px / 750 * 100vw;
    }
    
    div{
        width: vw(250);
        height: vw(250);
    }
```
1. 方案二：通过vw设置根节点字体大小，页面里的尺寸依然使用rem

   就是利`vw`用来设置根节点的字体大小 这样可以不用去写js动态设置`html的font-size` `vw`自动帮我们计算了
   以iphone6为例子 
   ```html
   <style>
       /*
       设计图750
       */
       html{
           font-size: 13.333333333333334vw;
                /*  3.75=1vw的大小
                    50/3.75
                 */
       }
       /*
       后面还是按照rem的方式写
       */
       </style>
   ```
使用上面这种方法和rem的方式要注意 因为设置了根节点的`font-size`  比如图片（img）对齐是更具字体的大小来对齐 所有有时候图片位置不对 需要将父级字体大小设置成0


    
    






