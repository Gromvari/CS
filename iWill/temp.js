var standardEvent = {
	Name: 			'Standard Event',
	Description: 	'A pre-created event for demonstation purposes only.',
	Time: 			new Date(),
	AlertType:		'Standard'
}

function eventAlert(eventObj)
{
	var alertObj = eventObj.AlertType;
	var alertSound = alertObj.Sound;
}
var sound;
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