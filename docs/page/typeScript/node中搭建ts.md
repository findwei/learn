# 在node中搭建TS开发环境

# 安装TypeScript

默认情况下，TS会做出下面几种假设：

1. 假设当前的执行环境是dom
2. 如果代码中没有使用模块化语句（import、export），便认为该代码是全局执行
3. 编译的目标代码是ES3

有两种方式更改以上假设：

1. 使用tsc命令行的时候，加上选项参数
2. 使用ts配置文件，更改编译选项
```ts
{
    "compilerOptions": { //编译选项
        "target": "es2016", //配置编译目标代码的版本标准 
        "module": "commonjs", //配置编译目标使用的模块化标准 
        "lib": ["es2016"], //默认情况下的环境 
        "outDir": "./dist" //编译后输出的文件问价夹
    },
    "include": ["./src"] //要编译的文件夹
    "files":["./a.ts"] //只编译这一个文件
}
```

# TS的配置文件

生成配置文件 `tsc --init`

使用了配置文件后，使用tsc进行编译时，**不能跟上文件名，如果跟上文件名，会忽略配置文件。**

@types/node 

@types是一个ts官方的类型库，其中包含了很多对js代码的类型描述。

例如：
> JQuery：用js写的，没有类型检查
> 安装@types/jquery，为jquery库添加类型定义

# 使用第三方库简化流程

ts-node: 将ts代码在内存中完成编译，同时完成运行

nodemon: 用于检测文件的变化

```json
// package.json
{
    "scripts": {
        "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"
        // 监控  src 下面 以 ts结尾的文件 如果有变化 执行 ts-node src/index.ts
    },    
}
```