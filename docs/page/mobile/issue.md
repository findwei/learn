
## 固定定位问题
**出现条件：**
1. 苹果内核的浏览器中
2. 使用了position:fixed  
3. 手机自带的小键盘被触发 （例如: input）
上面三个条件缺一不可

**解决方案：**
1. 使用绝对定位`absolute` 来模拟固定定位

    不让body滚动 使用一个div来模拟滚动 然后使用-webkit-overflow-scroll:touch 解决滑动无惯性的问题
    例如：
    [解决移动端固定定位的问题](page/mobile/[选修]移动端适配所需资料/01-移动端布局课件/22-解决固定定位的问题/解决移动端固定定位的问题.html ':include :type=iframe width=100% height=400px')

2. 通过事件的方式 (看后面事件处理)

## 1px被加粗问题

**出现条件：**

1. dpr=2 就是 1个css像素占用2个物理像素

dpr缩放适配就是通过缩放使1css像素等于1物理像素 就不会存在1px被加粗了的问题

**解决方案 ：**

1. 伪类加transfrom scaley 来缩小
   ```css
     div{
                width: 80%;
                height: 50px;
                border-top: 1px solid #000;
                /* border-bottom: 1px solid #000; */
                position: relative;
                margin-bottom: 50px;
            }
            div:after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background: #000;
                transform-origin: 0 0;
                transform: scaleY(0.5);
            }
 
            section{
                width: 80%;
                height: 50px;
 
                position: relative;
            }
            /**设置4条边*/
            section::after{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                border: 1px solid #000;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                transform-origin: 0 0;
                transform: scale(0.5);
            }
 
   ```
   