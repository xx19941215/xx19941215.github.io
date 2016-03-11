/**
 * @auther xiaoxiao
 * @version [v1.0]
 */
//判断arr是否为数组，返回一个bool值
function isArray(arr) {
    //在ECMAscript5中可以使用新增方法Array.isArray()来判断
    //其他版本中应当使用如下方法实现
    //return typeof arr == "object"&&Object.prototype.toString.call(arr)==="[object Array]";
    return Array.isArray(arr);
}
//判断fn是否是一个函数
function isFunction(fn) {
    return typeof fn == "function" && Object.prototype.toString.apply(fn) === "[object Function]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //对于undefined null boolean number string
    if (src == null || typeof src != "object") {
        return src;
    }
    //对于Date
    if (src instanceof Date) {
        var date = new Date(src.valueOf());
        return date;
    }
    //对于数组
    if (src instanceof Array) {
        var clone = [];
        for (var i = 0, len = src.length; i < len; i++) {
            clone[i] = src[i];
        }
        return clone;
    }
    //对于Object
    if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var newarr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (newarr.indexOf(arr[i]) < 0) {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var i, j;
    for (var i = 0, len = str.length; i < len; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != "\t") {
            break;
        }
    }
    for (var j = len - 1; j > 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") {
            break;
        }
    }
    return str.substring(i, j + 1);
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for (var key in obj) {
        count++;
    }
    return count;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phone = phone + '';
    return phone.search(/^(13[0-9]|14[67]|15[012356789]|17[678]|18[0-9])\d{8}$/) !== -1;
}
//为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.className += " " + newClassName;
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.className = element.className.replace(oldClassName, "");
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var width = element.offsetLeft;
    var height = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        height += current.offsetLeft;
        width += current.offsetTop;
        current = current.offsetParent;
    }
    //document.body取得对body的引用，document.documentElement取得对html的引用
    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    height -= scrollTop;
    width -= scrollLeft
    return {
        height: height,
        width: width
    };
}
//实现一个简单的Query
function $(selector) {

    var ele = document.getElementsByTagName("html")[0];
    var sele = selector.replace(/\s+/, " ").split(" ");

    var childs = function(element) {
        return element.getElementsByTagName("*");
    };
    for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var eleLength = ele.length;
        switch (sele[i][0]) {
            case "#":
                var key = sele[i].substring(1);
                ele = document.getElementById(key);
                break;

            case ".":
                var key = sele[i].substring(1);
                ele = document.getElementsByClassName(key)[0];
                break;
            case "[":
                if (sele[i].indexOf("=") == -1) {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < eleLength; j++) {
                        if (ele[j].getAttribute(key) !== null) {
                            ele = ele[j];
                            break;
                        }
                    }
                } else {
                    var loca = sele[i].indexOf("=");
                    var key = sele[i].substring(1, loca);
                    var attrValue = sele[i].substring(loca + 1, sele[i].length - 1);
                    console.log(loca + 1);
                    console.log(sele[i]);
                    for (var j = 0; j < eleLength; j++) {
                        if (ele[j].getAttribute(key) === attrValue) {
                            ele = ele[j];
                            break;
                        }
                    }
                }
                break;
            default:
                for (var j = 0; j < eleLength; j++) {
                    if (ele[j].tagName === sele[i].toUpperCase()) {
                        ele = ele[j];
                        break;
                    }
                }
                break;
        }
    }
    return ele;
}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element['on' + event] = listener;
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element['on' + event] = null;
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.onclick = listener;
}
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    event.onkeydown = function(e) {
        var e = e || window.event; //兼容IE，在IE中e是undefined,返回window.event
        if (e.keyCode === 13) {
            listener();
        }
    }
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
//先简单一些
function delegateEvent(element, tag, eventName, listener) {
    element[on + 'eventName'] = function(e) {
        var e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        var tname = target.nodeName.toLowerCase();
        listener.call(target, event);
    }
}
$.delegateEvent = delegateEvent;

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var s = navigator.userAgent.toLowerCase();
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if (ie) {
        console.log(ie);
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURLComponent(cookieName) + "=" + encodeURLComponent(cookieValue);
    if (expiredays instanceof Date) {
        cookieText += ";expires=" + expiredays.toUTCString();
    }
    //使用下面的写法不会覆盖之前的cookie,除非相同的cookieName已经存在
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookieName = encodeURLComponent(cookieName),
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;

    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURLComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }

    return cookieValue;
}
//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法
function ajax(url, options) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest;
    } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (option.date) {
        if (Object.prototype.toString.call(option.data) == "[object Object]") {
            var tempArr = [];
            for (var key in option.date) {
                tempArr.push(option.data[key]);
            }
            var data = tempArr.join("&");
        }
    }
    if (!option.type) {
        option.type = "GET";
    }
    option.type = option.type.toUpperCase();

    //开始发送请求
    if (option.type == "GET") {
        var myurl = "";
        if (option.data) {
            myurl = option.url + "?" + data;
        } else {
            myurl = url;
        }
        xmlhttp.open("GET", myurl, true);
        xmlhttp.send();
    } else {
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xml.send();
    }
    //指定回调函数
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                if (option.onsuccess) {
                    option.onsuccess(xmlhttp.responseText);
                }
            } else {
                if (option.onfail) {
                    option.onfail();
                }
            }
        }
    }
}
var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.attEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement; 
    },

}