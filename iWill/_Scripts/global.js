function globalClock(){
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var p;
	m = checkTime(m);
	s = checkTime(s);
	if(h > 12)
	{
		h = h - 12;
		p = " PM"
	}
	else
	{
		p = " AM";
	}
	
	document.getElementById("globalClock").innerHTML =
	"<span class='centered'>" +h + ":" + m + ":" + s + p+"</span>";
	var t = setTimeout(globalClock, 1000);
}
function checkTime(i) {
	if(i < 10) {i = "0" + i};
	return i;
}