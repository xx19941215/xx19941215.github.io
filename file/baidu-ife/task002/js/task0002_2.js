var t;

function countTime() {
    clearInterval(t);
    var str = $("input").value;
    str = trim(str);
    var timeArr = str.split("-");
    if (timeArr.length != 3) {
        $(".error").innerHTML = "请正确输入";
        return false;

    } else {
        t = setInterval(countTime, 1000);
        var end = new Date();
        end.setFullYear(timeArr[0], timeArr[1] - 1, timeArr[2]);
        var endTime = end.setHours(0, 0, 0, 0);
        // console.log(myDate.getTime());
        var start = new Date();
        var startTime = start.getTime();
        $(".error").innerHTML = "";
        if (endTime - startTime < 0) {
            $(".error").innerHTML = "请输入一个将来的时间";
            $(".res").innerHTML = "";
            return;
        }
        //设置新的Date对象来方便计时
        var newStart = new Date();
        var newStartTime = newStart.getTime();

        var gapTime = endTime - newStartTime;
        // console.log(gapTime);
        // console.log(gapTime/(24*60*60*1000));
        var gapDay = Math.floor(gapTime / (24 * 60 * 60 * 1000));
        var gapHour = Math.floor((gapTime - (24 * 60 * 60 * 1000) * gapDay) / (60 * 60 * 1000));
        var gapMin = Math.floor((gapTime - (24 * 60 * 60 * 1000) * gapDay - gapHour * 60 * 60 * 1000) / (60 * 1000));
        var gapSec = Math.floor((gapTime - (24 * 60 * 60 * 1000) * gapDay - gapHour * 60 * 60 * 1000 - gapMin * 60 * 1000) / (1000));
        var daojishi = "距离" + timeArr[0] + "年" + timeArr[1] + "月" + timeArr[2] + "日" + "还有" + gapDay + "天" + gapHour + "小时" + gapMin + "分" + gapSec + "秒";
        $(".res").innerHTML = daojishi;
    }
}
