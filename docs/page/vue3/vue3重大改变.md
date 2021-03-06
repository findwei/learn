1. vue 3中相比vue2 vue3没有构造函数了

vue2 main里面 相比vue3

``` javascript
//vue2
const app = new Vue({
    render: h => h(App),
}).$mount('#app')

// vue3
import {
    createApp
} from 'vue'
import App from './App.vue'
import './index.css'
const app = createApp(App).mount('#app')
```

2. vue3组件里面

 vue2里面this指向 vue当前组件实例

 vue3里面this指向的是一个代理（proxy）代理的当前组件实例

 ![avatar](./img/vue3的组件实例代理.jpg)
``` javascript
< template>
    <div > </div> 
</template>

    <script >
    export default {
        name: 'App',

    } 
    </script>
```
1. 利用composition api里面setup函数实现代码高度聚合，见下图：

   setup是在所有**生命周期钩子函数之前**执行

   setup 里面的**this是undefiend**(他在所有生命周期之前执行嘛 this肯定是`undefiend`

```javascript
<template>
  <h1>count:{{ countRef }}</h1>
  <p>
  </p>
</template>

import { ref } from "vue";
// ref 不依赖组件存在 ()
let aRef = ref('');
export default {
  setup() {
    // console.log("所有生命周期钩子函数之前调用");
    // console.log(this); // this -> undefined

    // setup中，count是一个对象
    // 实例代理中，count是count.value
    countRef=ref(0)
    //ref 后 countRef是一个proxy对象  countRef.value就是值  当时再return出setup时他就不是一个对象所有上面使用的时候不用.value
    // setup中要取值 就必须countRef.value

    //  在实例代理中，countRef是一个countRef.value
    return {
      countRef //在这里return 出去的时候做了处理的 是取的countRef.value
    };
  }
}

```
   **vue2** 

   ![avatar](./img/option%20api.jpeg) 
   
   **vue3**
   
   ![avatar](./img/composition%20api.jpg)