var WINDOW_WIDTH = 1224;
var WINDOW_HEIGHT = 568;
var RADIUS = 8;
//倒计时第一个数字的开始位置
var MARGIN_TOP = 60;
var MARGIN_LEFT = 80;

//设置截止日期
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);

//设置当前倒计时时间
var curShowTimeSeconds = 0;
//设置随机颜色数组
var colors = ["#66CCCC","#CCFF66","#FF99CC","#99CC33","#FF9900","#FFCC00","#993366","#CCCC33","#666633"];
//存放小球的数组
var balls = [];
window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var cxt = canvas.getContext("2d");
    //设置画面分宽高
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    //获得当前要绘制的倒计时时间
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //设置定时器，每50毫秒调用匿名函数，即1秒20帧
    setInterval(function(){
        //渲染函数
    	render(cxt);
        //设置下一帧的状态
    	update();
    },50);
};
function getCurrentShowTimeSeconds() {
	var curTime = new Date();
    //计算距离倒计时时间的间隔大小
	var ret = endTime.getTime() - curTime.getTime();
    //转换成秒
	ret = Math.round(ret/1000);
    //最后一秒的处理
    return ret >= 0 ? ret : 0;
}

function update() {
    //获得下一帧需要渲染的倒计时时间(以秒计算)
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    //获得小时数
	var nextHours = parseInt(nextShowTimeSeconds/3600);
    //获得分钟数
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    //获得秒数
    var nextSeconds = nextShowTimeSeconds % 60;

    //取得当前记录的倒计时小时数、分钟数、秒数
    var curtHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curtHours*3600)/60);
    var curSeconds = curShowTimeSeconds % 60;
    //要是秒数改变，则需要看、分钟数、小时数改变了没有
    if(nextSeconds != curSeconds){
        //要是小时数的十位数字、个位数字改变
    	if(parseInt(curtHours/10) != parseInt(nextHours/10)) {
            //使用addBalls来存储数字改变时跳出的小球各类信息
    		addBalls(MARGIN_LEFT ,MARGIN_TOP,parseInt(curtHours/10));
    	}
    	if(parseInt(curtHours%10)!=parseInt(nextHours%10)){
    		addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curtHours%10));
    	}
        //要是分钟数的十位数字、个位数字改变
    	if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
    		addBalls(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
    	}
    	if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
    		addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
    	}
        //要是秒数的十位数字、个位数字改变
    	if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
    		addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
    	}
    	if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
    		addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
    	}
        //将当前倒计时计数改变
    	curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls() {
    //遍历数组balls,没50ms改变小球的位置信息，使之产生动画效果
	for(var i =0;i<balls.length;i++){
        //x坐标
		balls[i].x+=balls[i].vx;
        //y坐标
		balls[i].y+=balls[i].vy;
        //垂直分速度每50ms增加
		balls[i].vy+=balls[i].g;
        //垂直方向碰撞检测
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = - balls[i].vy*0.75;
		}
        //水平方向右侧碰撞检测
        if(balls[i].x>=WINDOW_WIDTH-RADIUS){
            balls[i].x = WINDOW_WIDTH-RADIUS;
            balls[i].vx = - balls[i].vx;
        }
        //水平方向左侧碰撞检测
        if(balls[i].x<=RADIUS) {
            balls[i].x = RADIUS;
            balls[i].vx = - balls[i].vx;
        }
	}
    //不断产生的小球消耗了内存，所以需要性能优化
    //var cnt = 0;
    // for(var i = 0;i<balls.length;i++) {
    //     //假如左边缘和右边原均在画布外面
    //     if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
    //         //将所有在画布的小球都放在了数组的前面  
    //         balls[cnt++] = balls[i];
    //     }
    // }
    
    //清除前500个小球
    while(balls.length>1000){
        for(var j = 0;j<500;j++){
            balls.shift();
        }
    }
}
/**
 * [添加需要绘制的小球信息]
 * @param {int} x   [绘制数字的第一个小球横坐标]
 * @param {int} y   [绘制数字的第一个小球纵坐标]
 * @param {int} num [需要绘制的数字]
 */
function addBalls(x,y,num) {
	for(var i =0;i<digit[num].length;i++) {
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+RADIUS+1,
					y:y+i*2*(RADIUS+1)+RADIUS+1,
                    //这里随机设置一下下落小球的重力加速度
					g:1.5+Math.random(),
                    //随机设置一下水平方向的速度为4或者-4
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    //初始垂直方向分速度为-5
					vy:-5,
                    //随机设置需要掉落的小球的颜色
					color:colors[Math.floor(Math.random()*colors.length)]
				}
                //添加小球信息到数组
				balls.push(aBall);
			}
			
		}
	}
}

function render(cxt) {
    //清除画布上一帧的内容
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    //分别计算出当前倒计时的小时数、分钟数、秒数。
    //parseInt可以直接取得小数的整数部分
    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    //XX:XX:XX
    //开始六个数字和两个冒号的绘制
    //这里单独封装一个绘制数字的函数
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    //绘制小球
    for(var i=0;i<balls.length;i++){
    	cxt.fillStyle = balls[i].color;
    	cxt.beginPath();
    	cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
    	cxt.closePath();
    	cxt.fill();
    }
}
/**
 * [单独绘制每个小球]
 * @param  {[int]} x   [需要绘制的该数字的第一个小球的横坐标]
 * @param  {[int]} y   [需要绘制的该数字的第一个小球的纵坐标]
 * @param  {[int]} num [需要绘制的数字]
 * @param  {[type]} cxt [绘图上下文]
 */
function renderDigit(x, y, num, cxt) {
    //设置每个数字内小球的颜色
    cxt.fillStyle = "rgb(0,102,153)";
    //遍历数字的二维数组
    for (var i = 0; i < digit[num].length; i++) {
        //遍历每一行
        for (var j = 0; j < digit[num][i].length; j++) {
            //假如该位置需要绘制小球
        	if(digit[num][i][j] == 1) {
                //开始绘制状态描述
        		cxt.beginPath();
                //数字内每个小球的边缘相差2个像素
        		cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
        		//结束绘制状态描述
                cxt.closePath();
                //填充小球
        		cxt.fill();
        	}
        }
    }

}
