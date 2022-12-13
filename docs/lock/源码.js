/*
 * @Author: 钱巍
 * @Date: 2022-12-09 17:42:38
 * @LastEditTime: 2022-12-09 18:07:09
 * @LastEditors: 钱巍
 * @Description: 
 * @FilePath: \auto.javascriptd:\wei.qian\learn\docs\lock\源码.js
 * 没有理想，何必远方。
 */
islock();
window.addEventListener('hashchange', function (event) {
  islock();
});
$("#input").on('input propertychange', (e) => {
  if (e.target.value === 'webber') {
    localStorage.setItem('--', window.btoa(e.target.value));
    $('#lock').hide();
  }
});
let islock = function () {
  if (window.atob(localStorage.getItem('--') || '') === 'webber') {
    $('#lock').hide();
  } else {
    $('#lock').show();
  }
}