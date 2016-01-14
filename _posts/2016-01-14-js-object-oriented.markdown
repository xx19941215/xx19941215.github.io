---
layout:     post
title:      "6.1 理解对象"
subtitle:   "好记性不如烂笔头"
date:       2016-01-14 21:29:00
author:     "Xiao"
header-img: "img/post-bj-jspro.jpg"
tags:
    - Javascript高级程序设计读书笔记
---

>好记性不如烂笔头.

创建对象的方法：

1. new Object
2. 字面量的方式创建

### 1.属性类型

#### 1. 数据属性

数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。

- [[Configurable]]：能否通过delete删除属性从而重新定义属性，能否修改属性的特性。或者能否把属性修改为访问器属性。默认为true。
- [[Enumerable]]：表示能否通过for-in循环返回属性。
- [[Writeable]]:表示能否修改属性的值。默认为true
- [[Value]]:包含这个属性的数据值。默认为undefined
例如：

```javascript
var person={};
Object.defineProperty(person,"name",{
	writable:false,
	value:"xiaoxiao"
});
console.log(person.name);//xiaoxiao
person.name="JD";
console.log(person.name);//xiaoxiao
```

在非严格模式下，赋值操作将被忽略。但在严格模式下，将会导致错误。也适用于configurable。一旦把属性定义为不可配置的，就不能再把它变回原配置了。要是此时再调用Object.definedProperty()方法修改除writeable之外的特性，都会导致错误。

```javascript
var person={};
Object.defineProperty(person,"name",{
	configurable:false,
	value:"xiaoxiao"
});
Object.defineProperty(person,"name",{
	configurable:true,
	value:"JD"
});
//Cannot redefine property: name
```

可以多次调用defineProperty，但是设置为false后就有限制了。

#### 2. 访问器属性

- [[Configurable]]:表示能否通过delete删除属性从而重新定义属性。默认为true
- [[Enumerable]]:表示能否通过for-in循环返回属性。对于直接在对象上定义的属性，这个特性为true。
- [[Get]]:在读取属性的时候调用的函数。默认值为:underfined
- [[Set]]:在写入属性的时候调用的函数。默认为underfined
访问器属性不可以直接定义，必须使用Object.defineProperty()来定义。请看下面的例子。

```javascript
var book={
	_year:2004,
	edition:1
};

Object.defineProperty(book,"year",{
	get:function (){
		return this._year;
	},
	set:function (newValue){
		if(newValue>2004){
			this._year=newValue;
			this.edition+=newValue-2004;
		}
	}
});

book.year=2005;
console.log(book.edition);
```

这是访问器属性的常见方法，即设置一个属性的值会导致其他属性发生变化。getter和setter不一定同时都要写，只指定getter意味着属性无法写，尝试写入属性的时候会被忽略。严格模式下尝试写入只指定了getter函数的属性会抛出错误。类似的。没有指定setter函数的属性也不能设置属性。

### 2.定义多个属性

由于为对象定义多个属性的可能性很大，ECMAscript5又定义了一个Object.defineProperties()方法。利用这个方法可以通过描述符一次定义多个属性。这个方法接受两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或者修改的属性一一对应，例如：

```javascript
var book={};
Object.defineProperties(book,{
	_year:{
		value:2014
	},
	edition:{
		value:1
	},
	year:{
		get:function () {
			return this._year;
		},
		set:function (newValue){
			if(newValue>2014){
				this._year=newValue;
				this.edition+=newValue-2014;
			}
		}
	}
});
```

以上代码在book对外定义了两个数据属性（_year和edition）和一个访问器属性（year）。
支持：IE9+ Firefox4+ Safari5+ Opera12+ 和Chrome

### 3.读取访问器属性

使用ECMAscript5的Object.getOwnPropertyDescriptor()方法，可以取得属性的描述符。这个方法接受两个参数：属性所在的对象和要读取其描述符的属性的名称。返回值是一个对象，如果是访问器属性，这个对象有configurable、enumerable、get和set；如果是数据属性这个对象的属性有configurable、enumrable、writeable和value。
例如：

```javascript
var book={};
Object.defineProperties(book,{
	_year:{
		value:2014
	},
	edition:{
		value:1
	},
	year:{
		get:function () {
			return this._year;
		},
		set:function (newValue){
			if(newValue>2014){
				this._year=newValue;
				this.edition+=newValue-2014;
			}
		}
	}
});
var descriptor=Object.getOwnPropertyDescriptor(book,"_year");
console.log(descriptor.value);//2014
console.log(descriptor.configurable);//false
console.log(typeof descriptor.get);//undefined

var descriptor=Object.getOwnPropertyDescriptor(book,"year");
console.log(descriptor.value);//undefined
console.log(descriptor.enumerable);//false，直接在对象上定义是true
console.log(typeof descriptor.get);//function 是指向getter函数的指针
```


包括BOM和DOM都可以使用，支持：IE9+ Firefox4+ Safari5+ Opera12+ Chrome



