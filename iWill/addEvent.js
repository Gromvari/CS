function addEvent(){
	var eName = document.forms["eventForm"]["eventName"].value;
	var eDesc = document.forms["eventForm"]["eventDesc"].value;
	var eTime = document.forms["eventForm"]["eventTime"].value;
	if(eName == "") {
		alert("Name must be filled out");
		return false; 
	}
	else if(eDesc == ""){
		alert("Desc must be filled out");
		return false;
	}
	else if(eTime == ""){
		alert("Time must be filled out");
		return false;
	}
	var eventObj = {
		Name: eName,
		Desc: eDesc,
		Time: eTime
	};
	eventJSON = JSON.stringify(eventObj);
	if(localStorage.getItem("index"))
	{
		var i = Number(localStorage.getItem("index"));
		localStorage.setItem(i, eventJSON);
		alert("Things were submitted" + eName + eDesc + eTime);
	}
	else
	{
		localStorage.setItem("index","0");
		localStorage.setItem("0", eventJSON);
		alert("Things were submitted" + eName + eDesc + eTime);
	}
}

function addEventParam(eName, eDesc, eTime)
{
	var eventObj = {
		Name: eName,
		Desc: eDesc,
		Time: eTime
	};
	eventJSON = JSON.stringify(eventObj);
	
	if(localStorage.getItem("index"))
	{
		var i = Number(localStorage.getItem("index"));
		localStorage.setItem(i, eventJSON);
		localStorage.setItem("index", i + 1);
		alert("Things were submitted" + eName + eDesc + eTime);
	}
	else
	{
		localStorage.setItem("index","0");
		localStorage.setItem("0", eventJSON);
		localStorage.setItem("index", i + 1);
		alert("Things were submitted" + eName + eDesc + eTime);
	}
	
	// localStorage.setItem("test", eventJSON);
		// alert("Things were submitted" + eName + eDesc + eTime);
}

function addEventFromHTML()
{
	var eName = document.forms["eventForm"]["eventName"].value;
	var eDesc = document.forms["eventForm"]["eventDesc"].value;
	var eTime = document.forms["eventForm"]["eventTime"].value;
	if(eName == "") {
		alert("Name must be filled out");
		return false; 
	}
	else if(eDesc == ""){
		alert("Desc must be filled out");
		return false;
	}
	else if(eTime == ""){
		alert("Time must be filled out");
		return false;
	}
	addEventParam(eName, eDesc, eTime);
}