2021/4/29

# vue3 重大改变

    composition api 
    

# vue3 搭建方式

    - vue cli （内部使用的webpack）

        webpack 再开发过程中 打包速度不行 热更新速度也不行

    - veit-cli 

        开发过程中 打包速度超快 热更新也快

# veit cli  

    vue 官方出的构建工具 他比webpack 速度要快很多 打包线上版本时相比webpack 体积小了 
    veit 搭建 vue3

``` javascript
npm init vite - app vue3 - app - vite
//npm init vite-app   是下载当前最新的 vite版本 然后创建工程 后删除掉vite  (这样可以保证下次用的vite是最新而不是全局安装) 目前vite还再开发 没有成熟的版本
```

    veit 里面引入文件 除了.js 不用加后缀 其他的要再上后缀（不然报错） 例如：

``` javascript
    import './index'; //index.js
    import './a.vue'; //a.vue
```
