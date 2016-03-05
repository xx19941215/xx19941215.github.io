---
layout:     post
title:      "百度前端技术学院TASK001笔记"
subtitle:   "希望可以踏进前端的坑"
date:       2016-02-27 21:29:00
author:     "Xiao"
header-img: "img/han-river.jpg"
tags:
    - baidu-ife
---


[百度前端技术学院](https://github.com/baidu-ife/ife)第一期没有报上名，但是听说这个在线任务型的前端教程作为入门前端的资料来学习还是很不错的，最重要的原因还是因为这个资料是免费的~\(≧▽≦)/~。下面是做TASK001任务时对题目的一些总结。

>用两种方法实现一个块居中

- 第一种方法我用的是 `margin: 0 auto`
- 第二种方法我用的是父盒子嵌套子盒子，父盒子设置 `text-aligin: center`。不过这里有一个坑就是`text-aligin: center`只能对图片，按钮，文字等行内元素(`display`为`inline`或`inline-block`等)进行水平居中。但要说明的是在IE6、7这两个奇葩的浏览器中，它是能对任何元素进行水平居中的。

>用两种不同的方法来实现一个两列布局，其中左侧部分宽度固定、右侧部分宽度随浏览器宽度的变化而自适应变化 

这个题目考察的两种基础的布局方法：浮动和定位。

- 定位解法：父级盒子`relative`,左侧盒子`absolue`定位。
- 浮动解法：左侧盒子左浮动即可实现。

>用两种不同的方式来实现一个三列布局，其中左侧和右侧的部分宽度固定，中间部分宽度随浏览器宽度的变化而自适应变化

这道题我是使用了来自[淘宝的圣杯和双飞翼布局](http://www.imooc.com/wenda/detail/254035)来实现的。圣杯布局的主要思路就是利用负边距使写在后面的块显示在前面，然后你发现还要再设置main的`padding`属性使中间的块的内容完整显示。但这时左右块也会被压到里面，这时再使用相对定位使左右的块回归到正常位置。下面是具体的代码

<script async src="http://jsfiddle.net/nrfry8j2/embed/"></script>

双飞翼的思想和圣杯布局的写法类似。利用负边距使写在后面的块显示在前面，但这时只需要在main中包裹一个div块，然后设置他的外边距即可。代码如下：

<script async src="http://jsfiddle.net/youaz22m/embed/"></script>

>实现一个浮动布局，红色容器中每一行的蓝色容器数量随着浏览器宽度的变化而变化 

这一题我直接是将每一个盒子浮动起来了，不知道对不对。

接下来我用将近5天的时间完成了TASK001的综合练习，这是我第一次自己写静态页面，自己也亲自踩了许多坑。

>内联和inline-block元素会产生4px的默认line-height（例如img）会产生空白间距

我用的方法是设置父元素的字体大小为0，然后在需要设置字体大小的地方重新设置即可。更多详细的解决方法：[解决inline-block元素的空白间距](http://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements)

<script async src="http://jsfiddle.net/tpaqbux0/embed/"></script>

>当元素块在父盒子内，这个元素设置左浮动的时候然后通过父盒子的padding可以来定位这个元素。但是紧邻他的元素内假如有文本的时候，这时文本会环绕左边的这个浮动的元素。

解决方法是在围绕的元素上加上

```css
  .fixWrapper {
          overflow: hidden;
          zoom: 1;
      }
```
>关于first-child伪类

在使用使用:first-child伪类时一定要保证前面没有兄弟节点；要是有的话可以使用一个div包住这个元素然后在css这样写：

```css
div thisElement:first {
	some....
}
```
或者使用 CSS3 :first-of-type

例如：

```css
p:first-of-type {
	background: #ff0000;
}
```

在线预览在demo在[这里](http://xiaoxiao.work/file/baidu-ife/task001/index.html)