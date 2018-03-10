//{   GLOBAL VARIABLES FOR TESTTING (AND ALERT?)

var standardEvent = {
	Name: 			'Standard Event',
	Description: 	'A pre-created event for demonstation purposes only.',
	Time: 			new Date(),
	When:			'Unknown',
	AlertType:		'Standard',
	EventType:		'Standard Event',
	Status:			'Active'
}
var sound;
//}

//{		ALERT CLASS to be created separate
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
//}
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
		putStore(standardEvent);
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
		updateSTORE(s);
	}
	var s = retriveSTORE()
	obj.ID = s.length;
	s.push(obj);
	updateSTORE(s);
}
function deleteStorage(id)
{
	var s = retriveSTORE()
	for (i = 0; i < s.length; i++)
	{
		if ( s[i].ID == id)
		{
			
			alert("An event has been removed " + s[i].ID);
			s.splice(i, 1);
			break;
		}
	}
	updateSTORE(s);
}

function eventDriver()
{
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	// var s = today.getSeconds();
	var s = retriveSTORE();
	for(i = 0; i < s.length; i++)
	{
		if(s[i].Time.getHours() == h && s[i].Time.getMinutes() == m)
			alert("we got a match");
		//check for time match
	}
	setTimeout(eventDriver, 1000);
}


//{ 	SHORTCUT TO STORE/LOAD
function retriveSTORE()
{
	return JSON.parse(sessionStorage.getItem("STORE"));
}

function updateSTORE( s )
{
	sessionStorage.setItem("STORE", JSON.stringify(s));
}
//}