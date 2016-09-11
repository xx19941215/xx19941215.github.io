---
layout:     post
title:      "JavaScript中创建对象的几种方式和优缺点"
subtitle:   "6.2创建对象"
date:       2016-04-21 16:18:00
author:     "Xiao"
header-img: "img/in-post/fenghuang.jpg"
tags:
    - Javascript高级程序设计读书笔记
---

最近读到了《JavaScript高级程序设计》中的第六章，在创建对象这一小节，了解到了一些在JavaScript中创建对象的方法和他们各种的优缺点。

##### 字面量创建

##### 使用Object的构造函数

以上的两个方法会产生大量的重复代码，所以就产生了下面的第三种方法

##### 工厂模式

```javascript
function createPerson(name,age,job) {
    var o=new Object();
       o.name=name;
       o.age=age;
       o.job=job;
       o.sayName=function(){
         console.log(this.name);
    };
     return o;
 }
var person1=createPerson("xiaoxiao",21,"Digital Media Technology");
person1.sayName();
```

函数createPerson()虽然能够根据参数来构建一个包含必要的信息的Person对象。可以无数次的调用这个函数，而每次它都会返回一个包含三个属性的方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但是没有解决对象识别的问题（即怎么样知道一个对象的类型）。

##### 构造函数模式

这应该是目前使用的最多的一种方式。

```javascript
    function Person(name,age,job){
        this.name=name;
        this.age=age;
        this.job=job;
        this.sayName=function(){
           console.log(this.name);
        }
      
    }
    var person1=new Person("xiaoxiao",21,"Digital Media Technology");
    person1.sayName();
```

与工厂模式相比较

1. 没有显式创建对象
1. 没有直接将属性和方法赋给了this对象
1. 没有return语句
按照惯例，构造函数始终都需要以一个大写字母开头，而非构造函数使用非大写字母开头。
	
构造函数创建对象经过一下几个步骤
	
1. 创建一个新对象
1. 将构造函数的作用域赋给新对象（使用this就指向了这个新对象）
1. 执行构造函数中的代码（为这个新对象添加属性）
1. 返回新对象
	
person1对象的constructor属性指向Person

```javascript
alert(person1.constructor==Person);//true
```

对象的`constructor`属性最初是用来标识对象的。检测对象类型最好使用instanceof操作符。

```javascript
lert(person1 instanceof Object);//true
alert(person1 instanceof Person);//true
```

使用构造函数生成对象的时候每个方法都要在每一个实例上创建一遍。其实完全没有这个必要。
证明：

```javascript
function Person(name,age,job){
      this.name = name;
      this.age = age;
      this.job = job;
      
      this.sayName = function(){
      alert(this.name);
     }
}
      
var person1 = new Person("xiaoxiao",22,"student");
var person2 = new Person("xcf",46,"businessman");
      
alert(person1.sayName == person2.sayName);
```

可以在构造函数内部定义sayName属性为全局的sayName函数。但是在全局的定义的函数只可以被某个函数调用，而且这样也破坏了函数封装。

##### 使用原型模式创建对象

这种方式我目前用的最多

```javascript
function Person() {}
      Person.prototype.name = "Xiaoxiao";
      Person.prototype.age = 22;
      Person.prototype.job = "student";
      Person.prototype.sayName = function() {
      alert(this.name);
}
var person1 = new Person();
 person1.sayName();
```
![](http://7fv8kc.com1.z0.glb.clouddn.com/prototype.png)