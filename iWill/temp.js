var standardEvent = {
	Name: 			'Standard Event',
	Description: 	'A pre-created event for demonstation purposes only.',
	Time: 			new Date(),
	AlertType:		'Standard'
}
var sound;

function eventAlert(eventObj)
{
	var alertObj = eventObj.AlertType;
	var alertSound = alertObj.Sound;
}

function eventAlertStandard(eventObj)
{
	sound = new Audio("alertPing.mp3");
	sound.loop = true;
	sound.play();
	
	var aPop = document.getElementById("alertPopup");
	aPop.innerHTML = 	'<b>' + eventObj.Name 			+ '</b><br>' +
								eventObj.Description 	+ '<br>' +
								eventObj.Time 			+ '<br>';
	aPop.innerHTML += "<button onclick='clearEventAlert(eventAlert)'> Finished </button>";
	aPop.setAttribute('class', 'alertPopupON');
	
	
	var t = setTimeout( eventAlertExit , 10000 );					
	function eventAlertExit(){
		sound.pause();
		aPop.innerHTML = '';
		aPop.setAttribute('class', 'hideThisShit');
	}
}

function clearEventAlert( alert )
{
	var aPop = document.getElementById("alertPopup");
	aPop.innerHTML = '';
	aPop.setAttribute('class', 'hideThisShit');
	sound.pause();
	clearTimeout(alert.t);
}

// CONTINUATION OF EVENTMANAGER
function addEventFromHTML()
{
	var eName = document.forms["eventForm"]["eventName"].value;
	var eDesc = document.forms["eventForm"]["eventDesc"].value;
	var eTime = document.forms["eventForm"]["eventTime"].value;
	var eWhen = document.forms["eventForm"]["eventWhen"].value;
	if(eName == "" || eDesc == "" || eTime == "" || eWhen == "")
	{
		alert ("Something was left empty. JS Testing Environment has submitted a Standard Event");
		addEventParam("Standard Event", "standard stuff", "?time?", "?time?");
	}
	else
	{
		addEventParam(eName, eDesc, eTime, eWhen);
	}
}

function addEventParam(eName, eDesc, eTime, eWhen)
{
	var eventObj = {
		Name: eName,
		Desc: eDesc,
		Time: eTime,
		When: eWhen
	};
	putStore(eventObj);
	
}

function clearAllEvents()
{
	sessionStorage.clear();
	document.getElementById("eventTableBody").innerHTML = "";
}
function putStore(obj)
{
	if(sessionStorage.getItem("STORE") == null){
		var s = new Array();
		sessionStorage.setItem("STORE", JSON.stringify(s));
	}
	var s = JSON.parse(sessionStorage.getItem("STORE"));
	obj.ID = s.length;
	s.push(obj);
	sessionStorage.setItem("STORE", JSON.stringify(s));
}
