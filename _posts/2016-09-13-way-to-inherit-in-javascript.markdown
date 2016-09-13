---
layout:     post
title:      "JavaScript中实现继承的几种方式"
subtitle:   "6.3继承"
date:       2016-04-21 16:18:00
author:     "Xiao"
header-img: "img/fenghuang.jpg"
tags:
    - Javascript高级程序设计读书笔记
---

最近读到了《JavaScript高级程序设计》中的第六章，在继承的这一小节，了解到了在Javascript中实现继承的几种方式和优缺点，记录一下。

> 继承是指一个对象直接使用另一个对象的属性和方法

JacaScript原生不支持继承，Javascript将原型链作为实现继承的主要方式。那么，到底什么是原型链？简单回顾一下构造函数、原型和实例的关系。每个构造函数都有一个`prototype`指向原型对象，每个原型对象都有一个指针`constructor`指回构造函数，每一个实例都有一个指向原型对象的内部指针，在现代浏览器中就是`__proto__`。在使用原型链实现的继承中，实例的`__proto__`指向的不是一个原型而是`另一个原型`的实例，这个实例自己的`__proto__`不是指向自己的原型对象，而又是另外一个类的实例，那么这样层层递进，就构成了实例和原型的链条，这就是所谓的原型链的基本概念。

- 默认的原型

	所有的引用类型都继承了Object，这个继承也是通过原型链实现的，所有函数的默认原型都是`Object`的实例，因此默认原型都会包含一个内部指针指向(`__proto__`)指向`Object.prototype`。这也是为什么所有的自定义类型都会继承`tostring()`、`valueOf()`等默认方法的原因了。

- 确定原型和实例的关系
	- instanceof
	- isPrototypeOf()

- 谨慎的定义方法
	- 为原型添加方法的代码一定要放在替换原型的语句之后。
	- 通过原型链实现继承的时候，不能使用对象字面量创建原型方法，因为这会重写原型链

- 原型链的问题
	- 原型链继承会导致实例之间互相修改原型引用类型属性的值。
	- 在创建子类型的实例的时候，无法向超类型的构造函数传递参数

```js
	function SuperType(){
		this.colors = ["red","blue","green"];
	}
	function SubType(){}
	//继承了SuperType
	SubType.prototype = new SuperType();
	var instance1 = new SubType();
	instance1.colors.push("black");
	var instance2 = new SubType();
	console.log(instance2.colors);//red,blue,green,black
```

	

##### 借用构造函数实现继承
先看下面的代码

```javascript
	function SuperType(){
		this.name = name;
	}
	function SubType(){
		//继承了SuperType,同时传递了参数
		SuperType.call(this,"Xiaoxiao");
		//实例属性
		this.age = 22;
	}
	var instance = new SubType();
	console.log(instance.name);//"Xiaoxiao"
	console.log(instance.age);//22
```
存在的问题

1. 方法在构造函数中定义，因此函数复用就无从谈起
1. 在超类中定义的方法，对于子类型而言也是不可见的，所以所有的类型只能使用构造函数模式。

##### 最常用的方法-组合继承

```javascript
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
}
function SubType(name,age){
	//继承属性
	//call在在这改变了函数上下文，函数作为构造函数使用时this指代创建的对象，相当于初始化了三个一个属性
	SuperType.call(this,name);
	this.age = age;
}
//继承方法
SubType.prototype = new SuperType();//也会经常使用 SubType.prototype = Object.create(SuperType.prorotypr);
SubType.constructor.prototype = SubType;
SubType.prorotype.sayAge = function(){
	alert(this.age);
}

var instance1 = new SubType("Xiaoxiao",21);
instance1.colors.push("black");

var instance2 = new SubType("xx",22);
console.log(instance2.colors);//red,blue,green
```

优点：组合继承避免了原型链和借用构造函数的缺陷，融合了他们的优点，是最常使用的方式。

##### 原型式继承

ECMAScript5通过`Object.create()`方法实现了这一继承方式。第一个参数是父对象，第二个参数是扩展的属性。
当只传递一个参数时，`Object.create()`的行为和如下object方法类似：

```js
function object(){
	var args = arguments;
	var proto = args[0];
	function F(){};
	F.prototype = proto;
	return new F();
}
```

当有两个参数时，`Object.create`的polyfill如下

```js
if(typeof Object.create != "function"){
	Object.create = function(){
		function F();
		var hasOwn = Object.hasOwnProperty;
		return function(){
			var args = arguments,proto = args[0];
			if(typeof proto != "object") return;
			F.protoytpe = proto;
			var obj = new F();
			F.prototype = null;//每次释放掉
			if(args.length > 1){
				var properties = Object(args[1]);
				for(var key in properties){
					if(hasOwn.call(properties,key)){
						obj[pro] = properties[key];
					}
				}
			}
			return obj;
		}
	}
}
```

浏览器支持：IE9+ FF4+ Safari5+ Opear12+ 和 Chrome

在没有必要兴师动众的创建构造函数，而只是想让一个对象和另一个对象保持类似的情况下，原型式继承是完全可以胜任的，但是，包含引用类型的值得属性使用都会共享响应的值，就像使用原型模式一样。


##### 最有效的方法-组合寄生式继承

前面的组合继承是JavaScript里面最常用的继承模式，不过，他也有自己的不足。组合继承最大的问题就是无论什么情况下，都会调用两次超类构造函数。一次是在创建子类型原型的时候，另一次是在子类型狗仔函数内部。

```javascript
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
}
function SubType(name,age){
	//在创造实例时会执行第二次调用，这时实例上有age,name,colors属性
	SuperType.call(this,name);
	this.age = age;
}
//初始化SubType时会执行第一次调用，这时SubType原型上会有name和colors属性
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
}
```
所谓的组合寄生式继承，就是通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

基本的模式如下

```js
function inheritPrototype(subType,superType){
	var prototype = Object(superType.prototypr);
	prototype.constructor = subType;
	subType.prototype = prototypr;
}
```

避免了在SubType.prototype上创建不必要的，多余的属性。