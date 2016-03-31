/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.querySelector("#aqi-city-input").value.trim();
    var index = document.querySelector("#aqi-value-input").value.trim();

    if (!city.match(/^[a-zA-Z\u4E00-\u9FA5]+$/)) {
        alert("请输入合法城市！");
        return false;
    }
    if (index.indexOf(".") !== -1) {
        alert("不允许输入小数！");
        return false;
    }
    aqiData[city] = index;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    if (!isEmpty()) {
        var str = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        //var row = document.createElement("tr");
        //var fragment = document.createDocumentFragment();

        for (var cities in aqiData) {
            //使用DOM修改table的方法貌似不行，因为重绘的时候会把aqiData里的所有数据在渲染一遍
            // var col_1 = document.createElement("td");
            // var txtCities = document.createTextNode(cities);
            // col_1.appendChild(txtCities);
            // row.appendChild(col_1);
            // var col_2 = document.createElement("td");
            // var txtIndex = document.createTextNode(aqiData[cities]);
            // col_2.appendChild(txtIndex);
            // row.appendChild(col_2);
            // var txtBtn = document.createTextNode("删除");
            // var btn = document.createElement("button");
            // btn.appendChild(txtBtn);
            // row.appendChild(btn);
            // fragment.appendChild(row);
            str += "<tr><td>" + cities + "</td><td>" + aqiData[cities] + "</td><td><button>删除</button></td></tr>";
        }

    } else {
        str = "";
    }
    tab.innerHTML = str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    var ele = EventUtil.getTarget(event);
    var parent = ele.parentNode.parentNode;
    var city = parent.firstChild.innerText;
    for (var i in aqiData) {
        if (i === city) {
            delete aqiData[i];
        }
    }

    renderAqiList();
}

function isEmpty() {
    for (var i in aqiData) {
        return false;
    }
    return true;
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.querySelector("#add-btn");
    EventUtil.addHandle(btn, "click", addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    tab = document.querySelector("#aqi-table");
    EventUtil.addHandle(tab, "click", delBtnHandle);
}

window.onload = init;
