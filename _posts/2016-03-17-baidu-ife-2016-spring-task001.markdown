---
layout:     post
title:      "百度IFE前端学院TASK001学习笔记"
subtitle:   "交流，记录，进步"
date:       2016-03-17 20:29:00
author:     "Xiao"
header-img: "img/in-post/baidu-ife-2016-spring/in-winter.jpg"
tags:
    - baidu-ife
---


关于百度IFE相信学习前端的大家都很熟悉了，相比以前的自己单独编码，2016年的IFE前端学习强调了交流的重要性，正如IFE所说的那样，实践、交流与合作是技术学习有效且高效的手段。下面是我的一些实践记录，会持续更新。

> 任务一：了解与实践HTML基本标签

新了解的HTML标签

- `main`:标签规定文档的主要内容;
- `hgroup`:<hgroup> 标签用于对网页或区段（section）的标题进行组合;
- `time`:定义实践和日期，标签不会在任何浏览器中呈现任何特殊效果。
- `figure`:用作文档中插入图像。
- `figcaption`:用作文档中插图的图像，带有一个标题


> 任务二：了解与实践css

- `box-shadow`:向框添加一个或多个阴影。取值有`h-shadow`：必需，水平阴影的位置，允许负值。`v-shadow`：垂直阴影的位置。允许负值。`blur`:可选。模糊距离。`spread`：可选。阴影的尺寸。`color`:可选。阴影的颜色。请参阅 CSS 颜色值。`inset`：可选。将外部阴影 (outset) 改为内部阴影。[点击这里查看实例](http://www.w3school.com.cn/tiy/t.asp?f=css3_image_gallery)

> 任务三：三栏式布局。要求：左右两栏宽度固定，中间一栏根据父元素宽度填充满，最外面的框应理解为浏览器。背景色为 #eee 区域的高度取决于三个子元素中最高的高度。如下图

![任务图片](http://7xrp04.com1.z0.glb.clouddn.com/task_1_3_1.png)


针对这个任务，目前我了解到的有四种解决方案。

##### 方案A：利用BFC和浮动元素不重叠的特性。

***

三栏的顺序分别为`左-右-中`,左右两栏分别设置宽度以及左浮动和右浮动，脱离普通流，这时如果让中间栏高度大于2个边栏会发现两边栏实际上是叠在main上面的，因为main是块状元素，独占一行，浮动元素向相应的方法浮动，直到遇到容器的边框中间栏设置overflow：hidden创建BFC，这样就可以利用BFC不和浮动元素重叠的特性，让main的宽度自适应。[demo点此](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/3.html)


HTML部分:

```HTML
<div class="left">左边定宽</div>
<div class="right">右边定宽</div>
<div class="main">中间自适应</div>
```
CSS核心部分：

```CSS
.left {
  float: left;
  width: 200px
}
.right {
  float: right;
  width: 120px
}
.main {
  overflow: hidden; /*创建BFC*/
}
```
这里提到了BFC。关于BFC，我之前只是了解到使用`over:hidden`可以创建它用来清除浮动 。查了一些资料，了解到了更加详细的内容。

BFC（Block Formatting Context）直译为`块级格式化范围`。

- 如何产生BFC？
`float`的值不为`none`。
`overflow`的值不为`visible`。
`display`的值为`table-cell`, `table-caption`, `inline-block`中的任何一个。
`position`的值不为`relative`和`static`。

- BFC能用来做什么？
`a`、不和浮动元素重叠
如果一个浮动元素后面跟着一个非浮动的元素，那么就会产生一个覆盖的现象，给后面的元素创建BFC就可以解决这种现象，很多自适应的两栏布局就是这么做的。
[demo点此](https://jsfiddle.net/xx19941215/nuc8uybw/)
`b`、清除元素内部浮动
只要把父元素设为BFC就可以清理子元素的浮动了，最常见的用法就是在父元素上设置`overflow: hidden`样式，对于IE6加上`zoom:1`就可以了(IE Haslayout)。清除浮动常用方法之一
`c`、解决上下相邻两个元素重叠
两个元素垂直排列，上门的元素设置`margin-bottom`，下面的设置`margin-top`。这两个值会产生一定的重叠。这是将这两个元素包裹在两个BFC区域中就可以避免。

##### 方案B：圣杯布局

***

三栏的顺序为`中-左-右`，并包裹在`warp`容器内

三栏同时设置`float:left`，左右两栏定宽、中间宽度100%

利用负边距分别把`left`和`right`，这时视觉上`left`和`right`是叠在`main`上面的

设置`warp`的`左右padding`分别为左右栏的宽度

利用相对定位让`left`和`right`回到合适的位置

```HTML
<div class="warp">
  <div class="main">中间自适应</div>
  <div class="left">左边定宽</div>
  <div class="right">右边定宽</div>
</div>
```

关于圣杯布局的简单案例，我之前在[2015百度前端技术学院TASK001笔记](http://xiaoxiao.work/2016/02/27/baidu-ife-task001/) 提到过，针对这个题目，按照基本的圣杯布局思路做好之后，分别给`left块`和`right块`的`left`或者`right`值按照情况加上20px，再给`wrap`加上20px的padding-top值。left的图片设置左浮动，然后文字移动到相应的位置。right里面的图片默认有4px的行高，给父元素设置`font-size:0`即可消除该影响。

##### 方案C:双飞翼布局

***

双飞翼布局和圣杯布局类似，利用负边距使写在后面的块显示在前面，但这时只需要在main中包裹一个div块，然后设置他的外边距即可。[查看双飞翼的简单例子](http://jsfiddle.net/youaz22m/?utm_source=website&utm_medium=embed&utm_campaign=youaz22m)

#### 方案D:flex布局

***

flex三栏的顺序为`左中右`，并包裹在`wrap`容器内。wrap设置`display:flex`。

```HTML
<div class="warp">
    <div class="left">左边定宽</div>
    <div class="main">中间自适应</div>
    <div class="right">右边定宽</div>
</div>
```

```CSS
.wrap {
        display: flex;
        display: -wekkit-flex;
        align-items: flex-start;
        background-color: #eee;
        border: 1px solid #B3B3B3;
        padding: 20px;
} 
.main {
        flex: 1;
        -webkit-flex: 1;
}
```

[方案A](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/3.html) [方案B](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/3_2.html) [方案C](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/3_3.html) [方案D](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/3_4.html)

###### 关于Flex布局

> 网页布局（layout）是CSS的一个重点应用。Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为Flex布局。

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。
![](http://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

以下6个属性设置在容器上。

- flex-direction:决定主轴的方向（即项目的排列方向）。`row`（默认值）：主轴为水平方向，起点在左端。  `row-reverse`：主轴为水平方向，起点在右端。  `column`：主轴为垂直方向，起点在上沿。 `column-reverse`：主轴为垂直方向，起点在下沿。
![](http://www.runoob.com/wp-content/uploads/2015/07/0cbe5f8268121114e87d0546e53cda6e.png)
- flex-wrap:默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。`nowrap`（默认）：不换行。`wrap`：换行，第一行在上方。`wrap-reverse`：换行，第一行在下方。
![](http://www.runoob.com/wp-content/uploads/2015/07/903d5b7df55779c03f2687a7d4d6bcea.png)
- flex-flow:flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
- justify-content:justify-content属性定义了项目在主轴上的对齐方式。 `flex-start` :左对齐 `flex-end` :右对齐 `center` :居中 `space-between`:两端对齐，项目之间的间隔都相等。 `space-around`:每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
![](http://www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)
- align-items:align-items属性定义项目在交叉轴上如何对齐。`flex-start`：交叉轴的起点对齐。`flex-end`：交叉轴的终点对齐。`center`：交叉轴的中点对齐。`baseline`: 项目的第一行文字的基线对齐。`stretch（默认值）`：如果项目未设置高度或设为auto，将占满整个容器的高度。
![](http://www.runoob.com/wp-content/uploads/2015/07/2b0c39c7e7a80d5a784c8c2ca63cde17.png)
- align-content:align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。`flex-start`：与交叉轴的起点对齐。`flex-end`：与交叉轴的终点对齐。`center`：与交叉轴的中点对齐。`space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。`space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。`stretch（默认值）`：轴线占满整个交叉轴。
![](http://www.runoob.com/wp-content/uploads/2015/07/f10918ccb8a13247c9d47715a2bd2c33.png)

以下6个属性设置在项目上。

- order:order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
![](http://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)
- flex-grow:flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
![](http://www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink:flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
![](http://www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)
- flex-basis:flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
- flex:flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
- align-self:align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
![](http://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)

来自：http://www.runoob.com/w3cnote/flex-grammar.html

> 任务四：定位问题

这道题考察了position定位问题。在这里在复习一下非static的的块究竟是相对于谁进行定位。

- staic:不进行定位，元素处于原始文档流之中。
- relative:元素框偏离某一个距离。相对于原来的位置。
- absolute：参照点是离自己最近的那个"positioned"(除position为static的盒子以外所有的盒子)而言，并不一定都是相对于body。
- fixed: 相对于body定位。

[任务四DEMO点这里](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/4.html)

> 任务五：HTML+CSS综合实践2

主要实现页面左侧宽度自适应。我是使用了BFC块和浮动元素不重叠的方法。大体HTML和CSS结构如下：

```HTML
<div>
	<aside></aside>
	<main></main>
</div>
```

```CSS
main {
	overflow:hidden;
}
aside {
	float:right;
}
```

[任务五DEMO点这里](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/5.html)

> 任务六：通过HTML及CSS模拟报纸排版

- div嵌套引起的margin-top不起作用 
现象：在一些浏览器中，一些外层div要是没有padding值的话，内部的div的margin-top或者或者margin-bottom会传递外层div。[例子](https://jsfiddle.net/xx19941215/cb281aku/)
解决办法有下面几种：
	
	1.父盒子设置`overflow:hidden`
	2.把margin-top改成外部盒子的`padding`
	3.让父元素生成`block formating context(BFC)` ，在这里复习一下产生BFC的方法。`A`:float不为none。`B`:overflow不为visible。`C`:display的值为table-cell，table-caption，inline-block中的任何一个。`D`:postion值不为relative和static。

- font样式的学习
	在一个声明中规定字体属性：
	`font:italic bold 12px/30px arial,sans-serif;`(依次为font-style,font-weight,font-size/line-height,font-family)
- css画三角形
	用css画出包括三角形在内基本图形，主要是使用了CSS3中的一些属性。这里我就不再做记录了，用到的时候去搜索一下，会加深对CSS3中一些属性的认识。
- line-height可以使用百分比。`word-spacing`和`letter-spacing`则是使用的数字。
	`line-height`可以使用百分比来设置，当使用百分比来设置时，需要注意的百分比是基于当前字体尺寸的百分比行间距。设置数字，此数字会与当前的字体尺寸相乘来设置行间距。设置像素则是设置固定的行间距。
	关于`line-height`，这里借用一张[网上](http://www.cnblogs.com/dolphinX/p/3236686.html)的图片来说明一下：
	![](http://images.cnitblog.com/blog/349217/201308/04191646-bdab6a76666f4747a58b5e9b7c6be74c.png)
	从上到下四条线分别是顶线、中线、基线、底线，很像才学英语字母时的四线三格，我们知道vertical-align属性中有top、middle、baseline、bottom，就是和这四条线相关。
	尤其记得基线不是最下面的线，最下面的是底线。
	`行高`是指上下文本行的基线间的垂直距离，即图中两条红线间垂直距离。
	`行距`是指一行底线到下一行顶线的垂直距离，即第一行粉线和第二行绿线间的垂直距离。
	[任务六DEMO点这里](http://xiaoxiao.work/file/baidu-ife-2016-spring/one/6.html)

> 任务七：实现常见的技术产品官网的页面架构及样式布局

- background-size：cover铺满 contain:图片扩展至最大尺寸。background-size是CSS3中新增的控制背景大小的属性，取值可以是`length`,`percentage`,`cover`,`contain`。其中前两个要是只设置一个值的话，那么第二个描述宽度的值会设置为`auto`
- li平铺可以不用float实现，对li使用inline-block
- 新的选择器：.nav ul li:not(:last-child) 选择除最后一个li的所有li
- inpu type类型不同的两个input元素无法垂直对齐。最后我是在form上设置了display:flex才对齐的。

> 任务十：Flexbox 布局练习

该任务主要运用了flex布局和媒体查询的相关知识

> 任务十二：学习CSS3的新特性

做了这个任务，感觉自己对css3的一些属性的记忆和掌握不是很好。这里记录一些做任务过程中想起或者总结的属性。

- 选择器部分：
	- `:target` 例如#news:target ，通常在a标签下添加的href属性为`#news`，则该选择器会选择id属性为`new`的元素(该元素即当前活动的目标元素)。
	- `element1~element2`:选择前面有element1的每一个element2元素。e1和e2是同级元素，拥有相同的父亲。
	- `[attribute]`	用于选取带有指定属性的元素。
	- `[attribute=value]`	用于选取带有指定属性和值的元素。
	- `[attribute~=value]`	用于选取属性值中包含`指定词汇`的元素。
	- `[attribute|=value]`	用于选取带有以指定值开头的属性值的元素，该值必须是`整个单词`。
	- `[attribute^=value]`	匹配属性值以指定值开头的每个元素。
	- `[attribute$=value]`	匹配属性值以指定值结尾的每个元素。
	- `[attribute*=value]`	匹配属性值中包含指定值的每个元素。
`*` 选择所有元素
	- `:root`匹配文档根元素
	- `::selection`文字选中时候的样式

- CSS3 Transition 
transition即过渡属性。`transition` 属性是一个简写属性，用于设置四个过渡属性：`transition-property`（规定设置过渡效果的 CSS 属性的名称），`transition-duration`（规定完成过渡效果需要多少秒或毫秒），`transition-timing-function`（规定速度效果的速度曲线），`transition-delay`（定义过渡效果何时开始）[例子](http://www.w3school.com.cn/tiy/t.asp?f=css3_transition)
其中transition-timing-function 属性规定过渡效果的速度曲线，该属性允许过渡效果随着时间来改变其速度，默认`ease`，其他的值和描述分别为：
	- `linear`	规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
	- `ease`	规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
	- `ease-in`	规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
	- `ease-out`	规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
	- `ease-in-out`	规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
	- `cubic-bezier(n,n,n,n)`	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
	[DEMO](http://www.w3school.com.cn/tiy/t.asp?f=css3_transition-timing-function3)

- CSS3 2D转换
通过 CSS3 转换，我们能够对元素进行移动、缩放、转动、拉长或拉伸。2D转换有如下方法：
	- translate() 元素从当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数。[DEMO](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform_translate)
	- rotate() 元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。[DEMO](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform_rotate)
	- scale() 通过 scale() 方法，元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数 例如：值 scale(2,4) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍。[DEMO](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform_scale)
	- skew() 通过 skew() 方法，元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数，例如值 skew(30deg,20deg) 围绕 X 轴把元素翻转 30 度，围绕 Y 轴翻转 20 度。[DEMO](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform_skew)
	- matrix() matrix() 方法把所有 2D 转换方法组合在一起。matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。