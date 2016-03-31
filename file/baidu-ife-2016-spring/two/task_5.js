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
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    switch (nowGraTime) {
        case "day":

            break;

        case "week":

            break;

        case "month":

            break;

        default:
            console.log("ok");
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        // 调用图表渲染函数
        renderChart();
    }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

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
    //希望得到的数据格式
    /*chartData = {
      "day":{
        "北京":{
          "2016-01-01": 10,
          "2016-01-02": 10,
          "2016-01-03": 10,
          "2016-01-04": 10
        },
        "深圳":{
          "2016-01-01": 10,
          "2016-01-02": 10,
          "2016-01-03": 10,
          "2016-01-04": 10
        }
      },
      "week":{
        "北京":{
          "2016-01月第1周":170,
          "2016-01月第2周":170,
          "2016-01月第3周":170
        },
        "深圳":{
          "2016-01月第1周":170,
          "2016-01月第2周":170,
          "2016-01月第3周":170
        }
      },
      "month":{
        "北京":{
          "2016-01月":170,
          "2016-02月":170,
          "2016-03月":170
        },
        "深圳":{
          "2016-01月":170,
          "2016-02月":170,
          "2016-03月":170
        }
      }
    }*/
    // 将原始的源数据处理成图表需要的数据格式
    var week = {},
        month = {},
        singleWeek = {},
        singleMonth = {};
    var weekTemp = {};
    var countDay = 0,
        countMonth = 0;
    var weekTempArr = [],
        monthTempArr = [];
    var weekNo = 1;
    var day = 0;
    for (var keys in aqiSourceData) {
        //记录月数
        var monthNo = 0;
        for (var keys_2 in aqiSourceData[keys]) {
            //day记录天数，从0开始，一共92天
            day++;
            //countWeek记录天数，7天重置为0
            countDay++;
            //weekTempArr记录7天AQI的数组，7天重置一次
            weekTempArr.push(aqiSourceData[keys][keys_2]);
            //每个月的个数都大于4个而小于5个，所以第5周不能用7天求平均值
            //记录月数
            switch (day) {
                    case day <= 31:
                    monthNo = 1;
                    break;
                    case day <= 60:
                    monthNo = 2;
                    break;
                    case day >= 61:
                    monthNo = 3;
                    break;
                    default:
                    console.log("ok");
                }
            if (countDay % 7 == 0 && weekNo <= 4) {
                var sum = 0;
                var average = 0;
                for (var i = 0; i < 7; i++) {
                    sum += weekTempArr[i];
                }
                average = Math.ceil(sum / 7);
                weekNo++;
                
                singleWeek[keys + "monthNo" + "月第" + weekNo + "周的AQI"] = average;
                weekTempArr = [];
                countDay = 0;
            }else if(day <= 31 && ){ 
            	
            	
            }
            
            week[keys] = singleWeek;
        }
        weekNo = 0;
        singleWeek = {};
    }
    // 处理好的数据存到 chartData 中
    chartData.week = week;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

window.onload = init;
