---
layout:     post
title:      "CSRF、AMD和水平垂直居中元素的方法"
subtitle:   "携程在线笔试"
date:       2016-09-18 10:18:00
author:     "Xiao"
header-img: "img/fenghuang.jpg"
tags:
    - 携程笔试
---

> 最近参加了携程前端工程师的在线笔试，有一些题目不是太懂，查了下资料，在这里记录一下。

##### CSRF和XSS

CSRF(Cross-site Request forgery)，即跨站请求伪造。之前了解到一个比较相似的概念XSS(Cross-site Scripting),即跨站脚本。

XSS是利用浏览器可以拼接成任意的JS，然后黑客拼接好JS让浏览器自动的给服务器发送多个请求(GET、POST请求)。CSRF是利用网站服务器所有的参数都是预先可以构造的原理，然后黑客拼接好具体url,引诱用户提交请求。

防范XSS的关键是过滤所有`<`和`>`,确保从后端来的数据并不带有任何的html标签。

CSRF攻击是源于WEB的隐式身份验证机制，WEB的身份验证机制可以保证一个请求是来自于某个用户的浏览器，但是无法保证这个请求是用户批准发起的！

1. 客户端防范CSRF的第一点是对于数据库的更改操作(update,delete,insert)，表单必须使用`POST`提交。这是为了防止类似于在一个img的src里面写一个路径，让用户错误的访问改动数据库的问题。

1. 服务端防范CSRF一般的做法是在表单里面添加一段隐藏的唯一的token(请求令牌)。

参考资料
[总结 XSS 与 CSRF 两种跨站攻击](http://www.cnblogs.com/wangyuyu/p/3388180.html)
[浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

##### AMD的模块命名规则

模块化相关问题汇总

> 什么是模块化？为什么要模块化？

1. 命名冲突：为了方便也避免重复造轮子，我们习惯把一些通用的、底层的工具抽离出来，例如写成一个函数放在另一个文件中，我们需要的时候再去引用他就好，并且我们希望这个工具是一个独立的空间，里面的变量不要影响到当前的页面开发中。

1. 文件依赖：当我们再写一个小工具的时候，可能需要先使用一个其他的工具。因为`script`标签天生同步，所以引入的顺序必须要严格控制，当引入的文件较多或者顺序错乱的之后维护起来很不方便。

使用模块化主要是为了解决`命名冲突`和`文件依赖`这两个问题。

> AMD CMD 和CommonJS规范分别指什么？

CommonJS规范通过定义丰富的能够解决一些通常的应用开发的API来补足了JS官方中关于标准库的不足。建立他的意图是希望开发者可以运用这些API去开发应用，而且所开发的应用能够在不同的JS环境中运行。服务端的Nodejs就是一个例子，服务端的程序比在浏览器端更复杂，需要操作系统和其他程序互动，因此服务器必须要模块化以应对上述问题。`NodeJS`参照`CommonJS`规范创建了模块系统，模块系统通过`exports`暴露接口返回对象，通过`require`获取接口返回的对象。例如
```js
// math.js文件 的内容：
 exports.method=function(){
  var obj=xxx;
  // doing something
  return obj;
 };

 // main.js文件 的内容：
 var newObj= require('math').method;
 // 当然 main.js可以继续exports接口 以供其他文件调用
```

 AMD即Asynchronous Module Definition (异步模块定义)，实现AMD的库有RequireJs等。在服务器端采用的CommonJs规范因为在浏览器同步执行加载的问题会导致浏览器在加载JS的时候处于假死状态，AMD就是为了解决这个问题而诞生的。AMD采用异步的方式去获取引用的JS，待加载完毕之后再执行对应的程序，避免了浏览器的假死。

```js
 //语法
define(id,dependencies,factory); 
// id 即对这个模块命名
// dependencies 这个模块所依赖的其他模块 多个时用数组传递
// factory 加载完成后执行的回调函数

// math.js文件 定义模块
define(function(){
  var obj=xxx;
  // doing somethig 
  return obj
})

// main.js文件 加载模块
define(method,['math'],function(math){
  //把加载的模块传递进来 doing something
})
```

CMD规范是`Sea JS`推广过程中产生的。在CMD规范中，一个模块就是一个文件，其语法与Common Js类似，不过就是多了一个外包装，且相对于`AMD`的提前设置依赖，CMD的区别就是它将依赖内置了，需要的时候就使用`require`获取，从表面上看实现了commonJS的浏览器端化，但实质上是通过设置外包装`define(function(require,exports,module){})`来包裹代码，提前加载引用模块，等待加载完毕之后再执行代码。

```js
// 语法 一个模块就是一个文件
define(factory);

//math.js 定义
define(function(require, exports, module){
  exports.obj=xxx;
})
// main.js 加载引用
define(function(require, exports, module){
  var method=require('math').obj;
  //doing something
})
// 当然这个模块也可以继续exports接口 让其他模块调用
```
> AMD中的模块id命名规则

- 模块名是由一个或多个的正斜杠（/）为分隔符拼接而成的字符串；
- 单词须为驼峰式形式或者".",".."；
- 模块名不允许文件扩展名的形式，如.js；
- 模块名可以是相对的或顶级的。如果首字母为"."或者".."则为相对的；
- 顶级的模块名从根命名空间的概念模块开始解析；
- 相对的模块名从require书写和调用的模块开始解析。

##### 使用五种方法实现未知元素的水平垂直居中

HTML部分

```html
<div class="outer">
  <div class="inner">fsdfsdfsdf</div>
</div>
```
CSS部分

```css
html,body {
  height:100%;
}
.outer {
  width: 300px;
  border:1px solid #666;
  height:300px;
}
.inner {
  width: 50px;
  height: 50px;
  border:1px solid #999;
}
/*第一张方法*/
/* .outer {
  display:flex;
  justify-content:center;
  align-items:center;
} */
/*第二种方法*/
/* .outer {
  display:table-cell;
  text-align:center;
  vertical-align:middle;
}
.inner {
  display:inline-block;
} */
/*第三种方法*/
/* .outer {
  position:relative;
}
.inner {
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
} */
/*第四种方法*/
/* .outer {
  position:relative;
}
.inner {
  position:absolute;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  margin:auto;
}  */
/*第五种方法*/
/* .outer {
   line-height:300px;
   text-align:center;
}
.inner {
  display:inline-block;
  vertical-align:middle;
} */
/*第六种*/
/* .outer {
  display:flex;
}
.inner {
  margin:auto;
}
 */
/*flex兼容*/
.outer {
  display:box;
  display:-webkit-box;
  -webkit-box-pack:center;/*水平居中*/
  -webkit-box-align:center;/*垂直居中*/
}
.inner {
  
}
```