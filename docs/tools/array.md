
#
# 数组去重

```js
// 利用对象key 的唯一性
var qw = [1, 2, 3, 3, 2, 4, 4, 4, 4];
Array.prototype.unique = function () {
    var template = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!template[this[i]]) {
            template[this[i]] = i;
            arr.push(this[i]);
        }
    }
    return arr;
}
qw.unique();
```