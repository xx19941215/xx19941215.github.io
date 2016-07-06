var json = '['+
'{"title":"心跳","singer":"王力宏","src":"mp3/心跳.mp3","img":"mp3/xintiao.jpg"},'+
'{"title":"心跳","singer":"王力宏","src":"mp3/心跳.mp3","img":"mp3/xintiao.jpg"},'+
'{"title":"裂心","singer":"王力宏","src":"mp3/裂心.mp3","img":"mp3/liexin.jpg"},'+
'{"title":"在梅边(live)","singer":"王力宏","src":"mp3/在梅边(Live).mp3","img":"mp3/zaimeibian.jpg"}'+']';

window.$ = HTMLElement.$ = function(sel){
	return (this == window?document:this).querySelectorAll(sel);
};

var data = eval('('+json+')');

var player = {
	oMusic:null,//媒体对象
	src:null,
	title:null,
	singer:null,
	img:null,
	time:null,
	curTime:null,
	isPause:true,
	isEnded:false,
	timer:null,
	index:1,//歌曲索引
	init:function(){
		//初始化成员属性
		this.oMusic = document.createElement("audio");
		this.oMusic.src = data[0].src;
		this.title = data[0].title;
		this.singer = data[0].singer;
		this.img = data[0].img;
		this.src = data[0].src;
		this.curTime = 0;
		//获取歌曲总时间
		this.load();
		this.renderList();
		console.log(this);
		//点击进度条设置时间
		//$("#all")[0].onclick = this.setTime;
		$("#all")[0].addEventListener("click",this.setTime,false);
		//点击list切换歌曲
		$("#player-list ol")[0].onclick = this.setSong;
		//点击PLAY按钮事件
		$("#play-btn")[0].onclick = this.playOrPause;
	},
	//渲染DOM
	render:function(){
		$("#player-img img")[0].src = this.img;
		$(".title")[0].innerHTML = this.title;
		$(".singer")[0].innerHTML = this.singer;
		$("#atime")[0].innerHTML = this.transTime(this.time) + "&nbsp;";
		$("#ptime")[0].innerHTML = this.transTime(this.curTime);

	},
	//播放歌曲
	play:function(){
		this.oMusic.play();
		this.isPause = false;
		this.timer = setInterval(this.paint,30);
	},
	pause:function(){
		this.oMusic.pause();
		this.isPause = true;
	},
	//暂停或者播放
	playOrPause:function(){
		//如果当前是暂停的
		if(player.isPause || player.isEnded) {
			player.play();
			$("#play-btn i")[0].style.fontSize = "14px";
			$("#play-btn i")[0].innerHTML = "&#xe803;"
			this.style.lineHeight = "16px";
			this.style.animation = "ani .3s forwards";
			this.style.mozAnimation = "ani .3s forwards";
			this.style.webkitAnimation = "ani .3s forwards";
		}else {
			//当前是播放的
			player.pause();
			$("#play-btn i")[0].style.fontSize = "24px";
			$("#play-btn i")[0].innerHTML = "&#xe804;"
			this.style.lineHeight = "26px";
			this.style.animation = "ani-two .3s forwards";
			this.style.mozAnimation = "ani-two .3s forwards";
			this.style.webkitAnimation = "ani-two .3s forwards";
		}
	},
	//进度条事件
	setTime:function(e){
		var e = event ? event : window.event;
		var length = e.offsetX;
		player.oMusic.currentTime = (length/270)*player.time;
		player.curTime = player.oMusic.currentTime;
		player.paint();
		console.log("setTime");
		//player.play();
	},
	//歌曲列表事件
	setSong:function(e){
		var e = event ? event : window.event;
		var tar = e.target || e.srcElement;
		//点击到了span 
		console.log(tar.nodeName);
		if(tar.nodeName == "SPAN"){
			tar = tar.parentNode;
		}
		console.log(tar.nodeName);
		if(tar.nodeName == "LI") {
			
			player.img = data[(tar.dataset.i)-1].img;
			player.singer = data[(tar.dataset.i)-1].singer;
			player.title = data[(tar.dataset.i)-1].title;
			player.oMusic.src = data[(tar.dataset.i)-1].src;
			player.paint();
			player.play();
			//按钮动画
			$("#play-btn i")[0].style.fontSize = "14px";
			$("#play-btn i")[0].innerHTML = "&#xe803;"
			$("#play-btn")[0].style.lineHeight = "16px";
			$("#play-btn")[0].style.animation = "ani .3s forwards";
			$("#play-btn")[0].style.mozAnimation = "ani .3s forwards";
			$("#play-btn")[0].style.webkitAnimation = "ani .3s forwards";
			//设置相关样式
			
			tar.setAttribute("class","played-now");
			var oSpn = document.createElement("span");
			oSpn.setAttribute("class","player-list-cur");
			tar.insertBefore(oSpn,tar.firstChild);
			this.children[player.index-1].removeAttribute("class");
			this.children[player.index-1].removeChild(this.children[player.index-1].firstChild);
			player.index = tar.dataset.i;
		}
		

		
	},
	//刻画进度条和时间
	paint:function(){
		player.curTime = player.oMusic.currentTime;
		player.isEnded = player.oMusic.isEnded;
		//console.log(player.curTime);
		$("#played")[0].style.width = ((player.curTime / player.time).toFixed(6))*100 + "%";
		$("#ptime")[0].innerHTML = player.transTime(player.curTime);
		if(player.isEnded){
			cleatInterval(player.timer);
		}
	},
	//转换时间为XX:XX形式
	transTime:function(t){
		var min = t/60;
		min = min.toString();
		var sec = Math.floor(parseFloat(min.substring(min.indexOf(".")))*60);
		min = parseInt(min);
		min = min < 10 ? "0"+min : min;
		sec = sec < 10 ? "0"+sec : sec;
		return min +":"+ sec; 
	},
	//加载歌曲列表
	renderList:function(){
		var html = "";
		for(var i = 0;i<data.length;i++){
			html += '<li data-i='+(i+1)+'></span>'+
        			'<span class="player-list-index">'+(i+1)+'</span>'+
        			'<span class="player-list-title">'+data[i].title+'</span>'+
        			'<span class="player-list-singer">'+data[i].singer+'</span></li>';
        		
		}
		$("#player-list ol")[0].innerHTML = html;
		$("#player-list ol li")[0].setAttribute("class","played-now");
		var oSpn = document.createElement("span");
		oSpn.setAttribute("class","player-list-cur");
		$("#player-list ol li")[0].insertBefore(oSpn,$("#player-list ol li")[0].firstChild);
		
	},
	load:function(){
		this.oMusic.onloadedmetadata = function(){
			player.time = this.duration;
			//歌曲加载完毕，第一次渲染
			player.render();
		};
	}
};

window.onload = function(){
	player.init();
};