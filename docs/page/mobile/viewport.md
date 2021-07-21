<!-- ## viewport  -->
    viewport 默认是980px
    手机端如何实现缩放和按照什么像素来展示 是按照css像素展示还是物理设备像素展示

| 属性          | 值                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| width         | 可视宽度 为一个正整数或者是一个字符串`device-width`(设备的实际宽度=>css像素)，不建议为正整数 因为安卓不支持 |
| height        | 可视高度                                                                                                    |
| user-scalable | 是否允许用户进行页面缩放 no/yes                                                                             |
| initial-scale | 页面初始缩放值                                                                                              |
| mininum-scale | 页面初始缩放值                                                                                              |
| maxinum-scale | 页面初始缩放值                                                                                              |

```html
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <!-- 
        viewport   视口（可视区窗口），通过meta标签设置
            未设置
                1、屏幕的宽度默认为980，但不同的型号也会不同
                2、用document.documentElement.clientWidth方法获取
                    
            设置了
                content         视口里的相关设置
                    width           视口的宽度，值为一个正整数，或字符串device-width（设备的实际宽度--css像素）。不建议设置数字（安卓设备有些不支持）
                    height          视口的高度（与width一至）
                    user-scalable   是否允许用户进行页面缩放，值为no或yes，代表不允许与允许
                    initial-scale   页面初始缩放值，值为一个数字（可以带小数）。
                    minimum-scale   页面最小能够缩放的比例，值为一个数字（可以带小数）。
                    maximum-scale   页面最大能够缩放的比例，值为一个数字（可以带小数）。
                        
                注意：
                    1、有的时候大家会见到同时写了不允许缩放，又写了最小与最大能够缩放的比例，那这样不是冲突了，为什么都已经写了不允许缩放了，还要写那些？
                        原因：
                            1、会有一些第三方的工具能够破坏user-scalable，比方说一些给父母的手机把文字放大的工具，就会有可能。不过一般是没有问题的
                            2、像iphone5下还会有黑边
                            3、所以写全了，可以避免一些bug
                    2、ios10不支持user-scalable=no，后面事件解决（阻止document的touchstart的默认行为）
            initial-scale有值的情况下算页面的公式
                缩放比=css像素/viewport宽度
                viewport宽度=css像素/缩放比
        -->
        <!-- 
            750/980=0.77

            0.5=375/750=0.5
            375/0.5=750
        -->
         <!-- 
            **手机中打开电脑的页面，一定要保证手机与电脑在同一wifi下**
 
            禁止识别电话与邮箱(但是邮箱没效果)
            <meta name="format-detection" content="telephone=no,email=no" />
 
            设置添加到主屏后的标题(ios)
            <meta name="apple-mobile-web-app-title" content="标题">
 
            添加到主屏幕后，全屏显示，删除苹果默认的工具栏和菜单栏（无用）
            <meta name="apple-mobile-web-app-capable" content="yes" />
 
            放在桌面上的logo
            <link rel="apple-touch-icon-precomposed" href="iphone_logo.png" />
 
            启动时候的画面（无用）
            <link rel="apple-touch-startup-image" href="logo_startup.png" />
             
            设置x5内核浏览器只能竖屏浏览（只有UC有效）
            <meta name="x5-orientation" content="portrait" />
             
            设置x5内核浏览器全屏浏览
            <meta name="x5-fullscreen" content="true" />
             
            设置UC浏览器只能竖屏浏览
            <meta name="screen-orientation" content="portrait">
             
            设置UC浏览器全屏浏览
            <meta name="full-screen" content="yes">
            如果想屏蔽所有浏览器的横屏的话，需要在后面陀螺仪那章节讲
 
 
            windows => ipconfig 找ipv4地址
            mac =>  ifconfig 
         -->
```
