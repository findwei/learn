# 删除url中的一个参数

删除地址栏中，指定的参数名 如果传入的参数名没有，就返回当前地址
```js
/*删除地址栏中，指定的参数名*/ 
function delParam(paramKey) {
  var url = window.location.href;    //页面url
  var urlParam = window.location.search.substr(1);  //页面参数
  var index=url.indexOf('?') //没有？返回-1
  var beforeUrl = url.substr(0, index>0?index:undefined);  //页面主地址（参数之前地址）
  var nextUrl = "";
  var arr = new Array();
  if (urlParam != "") {
    var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
    for (var i = 0; i < urlParamArr.length; i++) {
      var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
      //删除一致，否则加入到参数中
      if (paramArr[0] != paramKey) {
        arr.push(urlParamArr[i]);
      }
    }
  }
  if (arr.length > 0) {
    nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url;
}
```

# 获取url中指定参数的值

```js
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}
```