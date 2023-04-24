# React 动画库

> npm 上面有很多动画库

这是比较常用的一个 React 动画库：react-transition-group 和 vue 的 transition 组件 基本一样

https://reactcommunity.org/react-transition-group/transition


# React 动画 - CSSTransition

本质就是切换 `class` `class` 里面定义好过度样式

当进入时，发生：

1. 为 CSSTransition 内部的 DOM 根元素（后续统一称之为 DOM 元素）添加样式 enter
2. 在一下帧(enter 样式已经完全应用到了元素)，立即为该元素添加样式 enter-active
3. 当 timeout 结束后，去掉之前的样式，添加样式 enter-done

当退出时，发生：

1. 为 CSSTransition 内部的 DOM 根元素（后续统一称之为 DOM 元素）添加样式 exit
2. 在一下帧(exit 样式已经完全应用到了元素)，立即为该元素添加样式 exit-active
3. 当 timeout 结束后，去掉之前的样式，添加样式 exit-done

设置 classNames 属性，可以指定类样式的名称

1. 字符串：为类样式添加前缀
2. 对象：为每个类样式指定具体的名称（非前缀）

关于首次渲染时的类样式，appear、apear-active、apear-done，它和 enter 的唯一区别在于完成时，会同时加入 apear-done 和 enter-done

还可以与 Animate.css 联用

# React动画 - SwitchTransition

用于有秩序的切换内部组件

默认情况下：out-in

1. 当key值改变时，会将之前的DOM根元素添加退出样式（exit,exit-active)
2. 退出完成后，将该DOM元素移除
3. 重新渲染内部DOM元素
4. 为新渲染的DOM根元素添加进入样式(enter, enter-active, enter-done)

in-out:
1. 重新渲染内部DOM元素，保留之前的元素
2. 为新渲染的DOM根元素添加进入样式(enter, enter-active, enter-done)
3. 将之前的DOM根元素添加退出样式（exit,exit-active)
4. 退出完成后，将该DOM元素移除

> 该库寻找dom元素的方式，是使用已经过时的API：findDomNode，该方法可以找到某个组件下的DOM根元素


# React动画 - TransitionGroup

该组件的children，接收多个Transition或CSSTransition组件，该组件用于根据这些子组件的key值，控制他们的进入和退出状态
