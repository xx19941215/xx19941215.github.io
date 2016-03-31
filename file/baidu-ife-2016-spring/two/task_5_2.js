/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}
//背景随机颜色
function randomColor(){
  var color = ["#66CCCC","#CCFF66","#FF99CC","#99CC33","#FF9900","#FFCC00","#993366","#CCCC33","#666633"];
  var num = Math.floor(Math.random() * 8);
  return color[num];
}
/**
 * 渲染图表
 */
function renderChart() {
    var aqiChart = document.querySelector(".aqi-chart-wrap");
    var city = pageState.nowSelectCity;
    switch (pageState.nowGraTime) {
        case "day":
            aqiChart.innerHTML = "<h1>"+city+"1到3月每日AQI</h1>";
            for(var key in chartData[city].day){
              aqiChart.innerHTML += "<div style='width:10px;height:"+chartData[city].day[key]+"px;'><div style='background-color:"+randomColor()+";width:10px;height:"+chartData[city].day[key]+"px;' title='时间："+key+"\r\n"+"AQI:"+chartData[city].day[key]+"'></div></div>";
            }
            break;

        case "week":
            aqiChart.innerHTML = "<h1>"+city+"1到3月每周平均AQI</h1>";
            for(var key in chartData[city].week){
              aqiChart.innerHTML += "<div style='width:50px;height:"+chartData[city].week[key]+"px;'><div style='background-color:"+randomColor()+";width:50px;height:"+chartData[city].week[key]+"px;' title='时间："+key+"\r\n"+"AQI:"+chartData[city].week[key]+"'></div></div>";
            }
            break;

        case "month":
            aqiChart.innerHTML = "<h1>"+city+"1到3月每月平均AQI</h1>";
            for(var key in chartData[city].month){
              aqiChart.innerHTML += "<div style='width:200px;height:"+chartData[city].month[key]+"px;'><div style='background-color:"+randomColor()+";width:200px;height:"+chartData[city].month[key]+"px;' title='时间："+key+"\r\n"+"AQI:"+chartData[city].month[key]+"'></div></div>";
            }
            break;

        default:
            console.log("ok");
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange(evt) {
    // 确定是否选项发生了变化 
    var event = EventUtil.getEvent(evt);
    var srcEle = EventUtil.getTarget(event);
    if(srcEle.value!==""){
      // 设置对应数据
      pageState.nowGraTime = srcEle.value;
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    var city = this.value;
    if (city !== "") {
        // 设置对应数据
        pageState.nowSelectCity = city;
        
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime = document.querySelector("#form-gra-time");
  EventUtil.addHandle(graTime,"click",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cities = document.querySelector("#city-select");
    for (var i in aqiSourceData) {
        var opt = document.createElement("option");
        var txt = document.createTextNode(i);
        opt.appendChild(txt);
        cities.appendChild(opt);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var sel = document.querySelector("#city-select");
    EventUtil.addHandle(sel, "change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    //原数据格式
    /*var aqiSourceData = {
    "北京": {
      "2016-01-01": 10,
      "2016-01-02": 10,
      "2016-01-03": 10,
      "2016-01-04": 10
      },
      "深圳": {
      "2016-01-01": 10,
      "2016-01-02": 10,
      "2016-01-03": 10,
      "2016-01-04": 10
      }
    }*/
    // 将原始的源数据处理成图表需要的数据格式
    
    for(var key in aqiSourceData){
      //创建一个对象来存储当前城市的所有数据
      var city = {};
      //创建三个对象用来保存每个城市的三类数据
      var day = {},month = {},week = {};
      //遍历单个城市每天的数据
      //dayCount:对遍历的天数进行计数,定义在循环外面，每个城市所有天数遍历完重置
      var dayCount = 0;
      //weekCot:用来计算每周平均AQI值的所有数据
      var weekCot = [];
      //weekCot_2:用来计算最后一周(不满7天)平均AQI的所有数据
      var weekCot_2 = [];
      //7天计数变量，每七天重置
      var sevenCount = 0;
      //记录每月的周数
      var weekCount = 0;
      //分别存储每个月所有数据的数组
      var monthAll_1 = [], monthAll_2 = [],monthAll_3 = [];
      for(var keys in aqiSourceData[key]) {
        //直接存储该城市day对象内的数据
        day[keys] = aqiSourceData[key][keys];
        //开始处理该城市按周计算的数据
        //dayCount:对遍历的天数进行计数
        dayCount++;
        //第一个月
        if(dayCount <= 31) {
          monthAll_1.push(aqiSourceData[key][keys]);
          weekCot.push(aqiSourceData[key][keys]);
          sevenCount ++;
          if(sevenCount % 7 == 0 && weekCount <= 4){
            var avg = avgCal(weekCot);
            weekCount ++;
            var str = "一月第"+weekCount+"周";
            week[str] = avg;
            //重置sevenCount
            sevenCount = 0;
            //清空weekCot
            weekCot = [];
          }else if( weekCount > 3){
            //开始计算最后不满7天的最后一周
            //存储最后不满7天的周的数据
            weekCot_2.push(aqiSourceData[key][keys]);
            //到了一月最后一天，开始计算最后一周的平均值
            if(dayCount == 31){
              var avg_2 = avgCal(weekCot_2);
              weekCount ++;
              var str_2 = "一月第"+weekCount+"周";
              week[str_2] = avg_2;
              //清空这个数组以便计算其他月份最后几天的时候使用
              weekCot_2 = [];
              weekCount = 0;
              sevenCount = 0;
            }
          }else {
            //计算月平均值
            var avg_3 = avgCal(monthAll_1);
            month["1月"] = avg_3;
          }
        }//第二个月
        else if (dayCount<=60){
          monthAll_2.push(aqiSourceData[key][keys]);
          weekCot.push(aqiSourceData[key][keys]);
          sevenCount ++;
          if(sevenCount % 7 == 0 && weekCount <= 4){
            var avg = avgCal(weekCot);
            weekCount ++;
            var str = "二月第"+weekCount+"周";
            week[str] = avg;
            //重置sevenCount
            sevenCount = 0;
            //清空weekCot
            weekCot = [];
          }else if(weekCount > 3){
            //清空第60天的数据
            weekCot = [];
            //开始计算最后不满7天的最后一周
            //存储最后不满7天的周的数据
            weekCot_2.push(aqiSourceData[key][keys]);
            //到了一月最后一天，开始计算最后一周的平均值
            if(dayCount == 60){
              var avg_2 = avgCal(weekCot_2);
              weekCount ++;
              var str_2 = "二月第"+weekCount+"周";
              week[str_2] = avg_2;
              //清空这个数组以便计算其他月份最后几天的时候使用
              weekCot_2 = [];
              weekCount = 0;
              sevenCount = 0;
            }
            
          }else {
            //计算月平均值
            var avg_3 = avgCal(monthAll_2);
            month["2月"] = avg_3;
          }
        }else 
        //第三个月
        {
          monthAll_3.push(aqiSourceData[key][keys]);
          weekCot.push(aqiSourceData[key][keys]);
          sevenCount ++;
          if(sevenCount % 7 == 0 && weekCount <= 4){
            var avg = avgCal(weekCot);
            weekCount ++;
            var str = "三月第"+weekCount+"周";
            week[str] = avg;
            //重置sevenCount
            sevenCount = 0;
            //清空weekCot
            weekCot = [];
          }else if (weekCount > 3){
            //开始计算最后不满7天的最后一周
            //存储最后不满7天的周的数据
            weekCot_2.push(aqiSourceData[key][keys]);
            //到了一月最后一天，开始计算最后一周的平均值
            if(dayCount == 91){
              var avg_2 = avgCal(weekCot_2);
              weekCount ++;
              var str_2 = "三月第"+weekCount+"周";
              week[str_2] = avg_2;
              //清空这个数组以便计算其他月份最后几天的时候使用
              weekCot_2 = [];
              weekCount = 0;
              sevenCount = 0;
          }
        }else{
          //计算月平均值
            var avg_3 = avgCal(monthAll_3);
            month["3月"] = avg_3;
        }
        
      }
      

      
      city.week = week;
      city.month = month;
      city.day = day;
      // 处理好的数据存到 chartData 中
      chartData[key] = city;
    }
    //重置dayCount
    dayCount = 0;
  }
}
function avgCal(arr){
  var sum = 0;
  var avg = 0;
  for(var i = 0; i<arr.length; i++){
    sum += arr[i];
  }
  avg = Math.ceil(sum / arr.length);
  return avg;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;
