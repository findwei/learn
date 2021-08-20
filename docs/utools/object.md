#
# 实现对象继承(打驼峰命名)

```js
Father.prototype.lastName = 'qw'
function Father() {

}
function Son() {

}
function inherit(target, origin) {
    target.prototype = origin.prototype;
}
inherit(Son, Father);
var son = new Son();
console.log(son.lastName);
```
# 实现浅层克隆
```js
function clone(origin,target){
    var target = target || {};  //容错处理   当传入target的不是一个对象  就返回一个对象
    for(var prop in origin){
        target[prop] = origin[prop];
    }
    return target;
}
```
# 实现深层克隆

```js
function deepClone(origin,target){
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[Object,Array]"; 
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] !=='null' && typeof(origin[prop]) == 'object'){
                if(toStr.call(origin[prop]) == arrStr){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(origin[prop] , target[prop]);
            }else{
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

// 利用三目运算符简化的深度克隆
function deepClone(origin,target){
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[Object,Array]"; 
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] !=='null' && typeof(origin[prop]) == 'object'){
               target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {} ;
                deepClone(origin[prop] , target[prop]);
            }else{
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}
```
# 进一步查看数据类型
```js
function type(target) {
    var template = {
        "[object Array]" : "array",
        "[object Object]" : "object",
        "[object Number]" : "Number - object",
        "[object Boolean]" : "Boolean - object",
        "[object String]" : "String - object"
    }
    if (target === null) {
        return null;
    }
    if (typeof(target) == "object") {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else if(typeof(target) == "function"){
        return 'function';
    } else{
        return typeof(target);
    }
}
```


