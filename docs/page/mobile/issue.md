
## 固定定位问题
出现条件：
1. 苹果内核的浏览器中
2. 使用了position:fixed  
3. 手机自带的小键盘被触发 （例如: input）
上面三个条件缺一不可

解决方案：
1. 使用绝对定位`absolute` 来模拟固定定位
   不让body滚动 使用一个div来模拟滚动 然后使用-webkit-overflow-scroll:touch 解决滑动无惯性的问题

2. 通过事件的方式

## 1px问题
