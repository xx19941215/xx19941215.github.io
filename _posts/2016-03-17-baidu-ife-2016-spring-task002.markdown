---
layout:     post
title:      "百度IFE前端学院TASK002学习笔记"
subtitle:   "交流，记录，进步"
date:       2016-03-28 16:18:00
author:     "Xiao"
header-img: "img/in-post/baidu-ife-2016-spring/in-winter.jpg"
tags:
    - baidu-ife
---


这里是TASK002的学习笔记，关于Javascript的学习。

##### 任务一：JavaScript的简单基本语法，如变量、函数，DOM，事件。
1.对象里面写成员方法的时候一定要用逗号分隔开！！

##### 任务四：JavaScript的事件机制，事件代理等。
1.DocumentFragment类型
在所有节点类型中，只有DocumentFragment 在文档中没有对应的标记。DOM 规定文档片段（document fragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。DocumentFragment 节点具有下列特征：
 - nodeType 的值为11；
 - nodeName 的值为"#document-fragment"；
 - nodeValue 的值为null；
 - parentNode 的值为null；
子节点可以是Element、ProcessingInstruction、Comment、Text、CDATASection 或EntityReference。虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。要创建文档片段，可以使用document.createDocumentFragment()方法。
2.如果Boolean构造函数的参数不是一个布尔值,则该参数会被转换成一个布尔值.如果参数是 0, -0,  null, false, NaN, undefined, 或者空字符串 (""),生成的Boolean对象的值为false. 其他任何值,包括任何对象或者字符串"false", 都会创建一个值为true的Boolean对象。
3.布尔表达式中的所有对象都会被转换为true。基本类型与引用类型的布尔值还有两个区别。首先，typeof 操作符对基本类型返回"boolean"，而对引用类型返回"object"。其次，由于Boolean 对象是Boolean 类型的实例，所以使用instanceof操作符测试Boolean 对象会返回true，而测试基本类型的布尔值则返回false。
4.window.onload=functionName;这里不要加()，加了括号就成了函数返回值了，在页面还没加载完就执行了，当然是null。window.onload=functionName这样才是正确的写法。所以说一般情况下，DOMContentLoaded事件要在window.onload之前执行，当DOM树构建完成的时候就会执行DOMContentLoaded事件。当window.onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
5.return false 只在当前函数有效，不会影响其他外部函数的执行。
retrun true； 返回正确的处理结果。
return false；分会错误的处理结果，终止处理。
return；把控制权返回给页面。
6.访问HTML5 中的非标准的属性，可以通过元素的dataset 属性来访问自定义属性的值。dataset 属性的值是DOMStringMap 的一个实例，也就是一个名值对儿的映射。在这个映射中，每个data-name 形式的属性都会有一个对应的属性，只不过属性名没有data-前缀（比如，自定义属性是data-myname，那映射中对应的属性就是myname）。
7.在使用`.`访问对象属性的时候，要保证后面跟的不是变量，否则会提示undefined。最好使用`[]`来访问对象属性

##### 任务五：

##### 任务六：模拟队列
看了一个组的代码，写的相当简练，综合运用了JS的数组方法，研究了一番，就当来复习数组的相关方法了。
1.slice方法不会返回null,没有项的话就返回[];关于数组的栈方法和队列方法。只要是添加项目(push,unshift)返回值就是新数组的长度，删除项目(pop,shift)返回值就是移除的项。splice永远都是返回一个数组，该数组包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。