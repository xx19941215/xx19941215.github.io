var list = $("#rotation-button");
EventUtil.addHandler(list, "click", function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    clearInterval(timer);
    rotate(target.index);
});

var dis;
var activeID = 1;
var nextID = 0;
var t = null;
var timer = null;
var next;
var arr = document.querySelectorAll("#rotation-button li");

var timer = setInterval(rotate, 3000);

for(var i=0;i<arr.length;i++){
	arr[i].index = i + 1;
}

function rotate(next){
	if(next){
		nextID = next;
	}else {
		nextID = nextID <= 4 ? activeID + 1 : 1;
	}
	addClass(arr[nextID-1], "active");
	removeClass(arr[activeID-1], "active");
	dis = (nextID - 1) * -500;
	move(dis);
	activeID = nextID;
}

function move(dis){
	clearInterval(t);
	t = setInterval(function (){
		var speed = (dis - $(".rotation-img").offsetLeft)/6;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		$(".rotation-img").style.left = $(".rotation-img").offsetLeft + speed + "px";
		//console.log(dis);
	},30);
}
