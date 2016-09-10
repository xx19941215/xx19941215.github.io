---
layout:     post
title:      "button.disabled 和 button.getAttribute('disabled') 有什么区别？"
subtitle:   "JS每日一题"
date:       2016-09-08 16:18:00
author:     "Xiao"
header-img: "img/in-post/fenghuang.jpg"
tags:
    - Javascript
---

先上代码
```html
<button disabled="false">Lorem ipsum</button>
```
```javascript
var button = document.querySelector('button');
console.log(button.getAttribute('disabled'));
console.log(button.disabled);
button.disabled = false;
console.log(button.disabled);
console.log(button.getAttribute('disabled'));
```

控制台会依次输出
```javascript
false
true
false
null
```

按钮最终变成可以点击的状态。

首先，button.disabled 访问的是DOMElement提供的一个API(property)，button.getAttribute访问的是html标签的属性。


