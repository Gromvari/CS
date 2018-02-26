//IS NOW DEFUNCT -> eventManager.js
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
