function loadEvents()
{
	testAlert();
	var index = Number(sessionStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		t = sessionStorage.getItem(i);
		obj = JSON.parse(t);
		createRow(obj);
	}
	document.getElementById("testField").innerHTML = "Index value: " + sessionStorage.getItem("index");
}
function testAlert()
{
	testSound();
	alert("Test Alert!!! yay?");
}
function testSound()
{
	var snd = new Audio("alertPing.mp3");
	snd.play();
}
function createRow(eventObj)
{
	document.getElementById("eventTableBody").innerHTML +=
		"<tr>"+
			"<td>" +  "<button class='editEventButton'>" + "</td>" +
			"<td>" + eventObj.Name  + "</td>" +
			"<td>" + eventObj.Desc  + "</td>" +
			"<td>" + eventObj.Time  + "</td>" +
			"<td>" + eventObj.When  + "</td>" +
		"</tr>";
}

function clearAllEvents()
{
	sessionStorage.clear();
	document.getElementById("eventTableBody").innerHTML = "";
}

// note to self: might have an issue with seesionStorage on public computers
function addEventParam(eName, eDesc, eTime, eWhen)
{
	var eventObj = {
		Name: eName,
		Desc: eDesc,
		Time: eTime,
		When: eWhen
	};
	eventJSON = JSON.stringify(eventObj);
	
	if(sessionStorage.getItem("index") != null)
	{
		var i = Number(sessionStorage.getItem("index"));
		sessionStorage.setItem(i, eventJSON);
		sessionStorage.setItem("index", i + 1);
		alert("Things were submitted" + eName + eDesc + eTime + eWhen +"\n" + " index: " + (i + 1));
		
	}
	else
	{
		sessionStorage.setItem("index","0");
		sessionStorage.setItem("0", eventJSON);
		sessionStorage.setItem("index", "1");
		alert("Things were submitted" + eName + eDesc + eTime + eWhen);
	}
	testAlert();
	// sessionStorage.setItem("test", eventJSON);
		// alert("Things were submitted" + eName + eDesc + eTime);
}

function addEventFromHTML()
{
	var eName = document.forms["eventForm"]["eventName"].value;
	var eDesc = document.forms["eventForm"]["eventDesc"].value;
	var eTime = document.forms["eventForm"]["eventTime"].value;
	var eWhen = document.forms["eventForm"]["eventWhen"].value;
	if(eName == "") {
		// alert("Name must be filled out");
		// return false; 
		addEventParam("A Standard Event", "With a standard description", "01-01-2012", eWhen);
	}
	else if(eDesc == ""){
		// alert("Desc must be filled out");
		// return false;
		addEventParam("A Standard Event", "With a standard description", "01-01-2012", eWhen);
	}
	else if(eTime == ""){
		// alert("Time must be filled out");
		// return false;
		addEventParam("A Standard Event", "With a standard description", "01-01-2012", eWhen);
	}
	else
	{
		addEventParam(eName, eDesc, eTime, eWhen);
	}
}

function initIndex()
{
	if(sessionStorage.getItem("index") != null)
	{
		// alert("the index is set: " + sessionStorage.getItem("index"));
	}
	else
	{
		sessionStorage.setItem("index", "0");
		// alert("index initialized");
	}
}
function initForm()
{
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	if(m < 10){ m = "0" + m;}
	document.forms["eventForm"]["eventWhen"].value = h +":"+ m;
}

function eventDriver()
{
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var index = Number(sessionStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		t = sessionStorage.getItem(i);
		obj = JSON.parse(t);
		
		//check for time match
	}
}

