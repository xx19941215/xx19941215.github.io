function showHobby() {
	$(".res").innerHTML = "";
    var hobbies = $('textarea').value;
    var hobby = hobbies.replace(/(;|、|，|,|；)/g, " ").replace(/\s+/g, " ").split(" ");
    console.log(hobby);
    hobby = uniqArray(hobby);
    if (hobbies && hobby.length <= 10) {
    	var hobbyItem = document.createElement("form");
        for (var i = 0; i < hobby.length; i++) {
        	var hobbyLabel = document.createElement("label");
        	var labelText = document.createTextNode(" " + hobby[i] + " ");
        	hobbyLabel.appendChild(labelText);
        	var input = document.createElement("input");
        	input.type = "checkbox";
        	input.id = hobby[i];
        	hobbyLabel.setAttribute("for",hobby[i]);
        	hobbyItem.appendChild(input);
        	hobbyItem.appendChild(hobbyLabel);
        }
        $(".res").appendChild(hobbyItem);
    } else if (hobby.length > 10) {
    	$(".error").innerHTML = "不允许超过十个";
    } else {
    	$(".error").innerHTML = "至少写一个";
    }
}

function reset() {
	$(".error").innerHTML = " ";
	$(".res").innerHTML = " ";
	$("textarea").value = " ";
}
