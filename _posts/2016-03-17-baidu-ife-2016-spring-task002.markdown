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


这里是TASK002的学习笔记，关于Javascript的学习。一共有6各系列的任务，在这里将一系列的任务集中到到一起记录学习过程中的心得。

##### JavaScript的简单基本语法，如变量、函数，DOM，事件。(任务13-17)

1.`DocumentFragment类型`
在所有节点类型中，只有DocumentFragment 在文档中没有对应的标记。DOM 规定文档片段（document fragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。DocumentFragment 节点具有下列特征：

 - nodeType 的值为11；
 - nodeName 的值为"#document-fragment"；
 - nodeValue 的值为null；
 - parentNode 的值为null；
 
子节点可以是`Element`、`ProcessingInstruction`、`Comment`、`Text`、`CDATASection` 或`EntityReference`。虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。要创建文档片段，可以使用document.createDocumentFragment()方法。

2.如果Boolean构造函数的参数不是一个布尔值,则该参数会被转换成一个布尔值.如果参数是 `0`, `-0`,  `null`, `false`, `NaN`, `undefined`, 或者空字符串 `("")`,生成的`Boolean对象`的值为`false`。其他任何值,包括任何对象或者字符串·"false"·, 都会创建一个值为·true·的·Boolean对象·。

3.布尔表达式中的所有对象都会被转换为true。基本类型与引用类型的布尔值还有两个区别。首先，typeof 操作符对基本类型返回"boolean"，而对引用类型返回"object"。其次，由于Boolean 对象是Boolean 类型的实例，所以使用instanceof操作符测试Boolean 对象会返回true，而测试基本类型的布尔值则返回false。

4.window.onload=functionName;这里不要加()，加了括号就成了函数返回值了，在页面还没加载完就执行了，当然是null。window.onload=functionName这样才是正确的写法。所以说一般情况下，DOMContentLoaded事件要在window.onload之前执行，当DOM树构建完成的时候就会执行DOMContentLoaded事件。当window.onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

5.关于return的解释
`return false`：只在当前函数有效，不会影响其他外部函数的执行。
`retrun true`； 返回正确的处理结果。
`return false`；分会错误的处理结果，终止处理。
`return`；把控制权返回给页面。

6.访问HTML5 中的非标准的属性，可以通过元素的`dataset` 属性来访问自定义属性的值。`dataset`属性的值是`DOMStringMap` 的一个实例，也就是一个名值对儿的映射。在这个映射中，每个data-name 形式的属性都会有一个对应的属性，只不过属性名没有data-前缀（比如，自定义属性是data-myname，那映射中对应的属性就是myname）。

7.在使用`.`访问对象属性的时候，要保证后面跟的不是变量，否则会提示undefined。最好使用`[]`来访问对象属性

8.对象里面写成员方法的时候一定要用逗号分隔开！！

##### 使用数组模拟栈和队列(任务17-21)

看了一个组的代码，写的相当简练，综合运用了JS的数组方法，研究了一番，就当来复习数组的相关方法了。

1.`slice`方法不会返回null,没有项的话就返回`[]`;

2.关于数组的栈方法和队列方法。只要是添加项目`(push,unshift)`返回值就是新数组的长度，删除项目`(pop,shift)`返回值就是移除的项。`splice`永远都是返回一个数组，该数组包含`从原始数组中删除的项`，如果没有删除任何项，则返回一个`空数组`。

##### Javascript和树(任务22-25)

这一部分的任务，牵扯到了基本的数据结构——树。要求使用可视化的方法将树的遍历表现出来。

树的遍历我部分参考了其他组同学的代码。

其中二叉树的先、中、后序遍历核心代码如下：

```javascript
/**
 * 遍历一棵树
 */
function TreeWalker() {
    this.stack = [];
    this.isWalking = false;
}
/**
 * 先序遍历
 */
TreeWalker.prototype.preOrder = function(node) {
    this.stack.push(node);
    if (node.firstElementChild) {
        this.preOrder(node.firstElementChild);
    }
    if (node.lastElementChild) {
        this.preOrder(node.lastElementChild);
    }
}

/**
 * 中序遍历
 */
TreeWalker.prototype.inOrder = function(node) {
        if (node.firstElementChild) {
            this.inOrder(node.firstElementChild);
        }
        this.stack.push(node);
        if (node.lastElementChild) {
            this.inOrder(node.lastElementChild);
        }
    }
    /**
     * 后序遍历
     */
TreeWalker.prototype.postOrder = function(node) {
    if (node.firstElementChild) {
        this.postOrder(node.firstElementChild);
    }
    if (node.lastElementChild) {
        this.postOrder(node.lastElementChild);
    }
    this.stack.push(node);
}
```

数的深度优先遍历和广度优先遍历算法核心代码如下：

```javascript

function Travel() {
    this.stake = [];
    this.isTraveling = false;
    this.nodes = 0;
}
//深度优先遍历
Travel.prototype.depthFirst = function(node) {
        if (node) {
            this.stake.push(node);
        }
        if (node && node.childElementCount != 0) {
            this.depthFirst(node.firstElementChild);
        }
        if (node) {
            this.depthFirst(node.nextElementSibling);
        }
    }
//广度优先遍历
Travel.prototype.breadthFirst = function(node) {
        if (node) {
            this.stake.push(node);
            this.breadthFirst(node.nextElementSibling);
            node = this.stake[this.nodes++];
            this.breadthFirst(node.firstElementChild);
        }

    }
```

###### 总结一下JS中的`this`

在js的中，this的表示意义是跟随着作用域而改变的。当在window环境下，this就是指window对象，而在HTML事件中，this就是表示的那个元素。在这里总结一下Javascipt中的this，根据调用方法的不同分为如下情况

***
1.作为对象方法调用

```javascript 
var point = { 
 x : 0, 
 y : 0, 
 moveTo : function(x, y) { 
     this.x = this.x + x; 
     this.y = this.y + y; 
     } 
 }; 
 point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象
```
 
2.作为函数调用，函数也可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象。
 
```javascript 
 function makeNoSense(x) { 
 this.x = x; 
 } 
 makeNoSense(5); 
 x;// x 已经成为一个值为 5 的全局变量
```

比如下面的例子：函数被调用时，this 被绑定到全局对象，接下来执行赋值语句，相当于隐式的声明了一个全局变量，这显然不是调用者希望的。

```javascript
 var point = { 
 x : 0, 
 y : 0, 
 moveTo : function(x, y) { 
     // 内部函数
     var moveX = function(x) { 
     this.x = x;//this 绑定到了哪里？实际上绑定到了window
    }; 
    // 内部函数
    var moveY = function(y) { 
    this.y = y;//this 绑定到了哪里？实际上绑定到了window
    }; 

    moveX(x); 
    moveY(y); 
    } 
 }; 
 point.moveTo(1, 1); 
 point.x; //==>0 
 point.y; //==>0 
 x; //==>1 
 y; //==>1
```

这属于 JavaScript 的设计缺陷，正确的设计方式是内部函数的 this 应该绑定到其外层函数对应的对象上，为了规避这一设计缺陷，有时候我们可以直接定义另外一个变量来绑定这个this指定的对象。聪明的 JavaScript 程序员想出了变量替代的方法，约定俗成，该变量一般被命名为 that。

```javascript 
var point = { 
 x : 0, 
 y : 0, 
 moveTo : function(x, y) { 
      var that = this; 
     // 内部函数
     var moveX = function(x) { 
     that.x = x; 
     }; 
     // 内部函数
     var moveY = function(y) { 
     that.y = y; 
     } 
     moveX(x); 
     moveY(y); 
     } 
 }; 
 point.moveTo(1, 1); 
 point.x; //==>1 
 point.y; //==>1
```

3.作为构造函数调用
JavaScript 支持面向对象式编程，与主流的面向对象式编程语言不同，JavaScript 并没有类（class）的概念，而是使用基于原型（prototype）的继承方式。相应的，JavaScript 中的构造函数也很特殊，如果不使用 new 调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，this 绑定到新创建的对象上。
 
```javascript
 function Point(x, y){ 
    this.x = x; 
    this.y = y; 
 }
```

4.使用 apply 或 call 调用
让我们再一次重申，在 JavaScript 中函数也是对象，对象则有方法，apply 和 call 就是函数对象的方法。这两个方法异常强大，他们允许切换函数执行的上下文环境（context），即 this 绑定的对象。很多 JavaScript 中的技巧以及类库都用到了该方法。让我们看一个具体的例子：

```javascript
 function Point(x, y){ 
    this.x = x; 
    this.y = y; 
    this.moveTo = function(x, y){ 
        this.x = x; 
        this.y = y; 
    } 
 } 

 var p1 = new Point(0, 0); 
 var p2 = {x: 0, y: 0}; 
 p1.moveTo(1, 1); 
 p1.moveTo.apply(p2, [10, 10]);
```

关于函数的执行环境，这里需要理解几个重要的概念。

- 执行环境：即`execution context`，有时候也叫做`环境`。执行环境定义了`变量`或`函数`有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的`变量对象（variable object）`，环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。执行环境分为全局执行环境，在web浏览器中是指window对象，每一个函数都有自己的执行环境。
- 作用域链：作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象
![](http://7fv8kc.com1.z0.glb.clouddn.com/2016-04-08_170210.png)

JavaScript 中的函数既可以被当作普通函数执行，也可以作为对象的方法执行，这是导致 this 含义如此丰富的主要原因。一个函数被执行时，会创建一个执行环境`（ExecutionContext）`，函数的所有的行为均发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 `arguments变量`，其中包含调用函数时传入的参数。接下来创建`作用域链`。然后`初始化变量`，首先初始化函数的`形参表`，值为 arguments变量中对应的值，如果 arguments变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在`执行环境（ExecutionContext）`创建成功后，函数执行时才会执行，这点对于我们理解 JavaScript 中的变量作用域非常重要。最后为 this变量赋值，如前所述，会根据函数调用方式的不同，赋给 this全局对象，当前对象等。至此函数的执行环境（ExecutionContext）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ExecutionContext）中读取。