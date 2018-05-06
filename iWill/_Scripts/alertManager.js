//{		GLOBAL VARIABLES
var alertStatus = false;
var alertIndex;
var alertTimout0;
var alertTimout1;

var PRI_STANDARD = 1;
var PRI_LOW = .5;
var PRI_HIGH = 2;
var PRI_NONE = 0;

var ALERT_LENGTH = 10000;

var alertSound = new Audio("_Sounds/alertPing.mp3");
var StandardEvent = {
	e_name: "Standard Event Name",
	e_desc: "just a quick one",
	e_date: new Date(),
	e_stat: "S_ACTIVE"
};
//}

function startDrivers()
{
	console.log("Event Driver  Started");
	eventDriver();
}

function eventDriver()
{
	eDrive = setTimeout(eventDriver, 2000);		// loop eventDriver
	var s = retriveSTORE();
	if(s != null)						// list is not empty
	{
		for(i = 0; i < s.length ; i++)		// loop event list 
		{
			if( s[i].e_stat == "S_ACTIVE")	// process only active
			{
				var currDate = new Date();
				var date = new Date(s[i].e_date);			//find matching time 
				if(isMatchingTime(currDate, date))
				{	
					// begin processing event, break loop 
					  console.log("Matching time in Active found");
					s[i].e_stat = "S_PROCESSING"; 
					updateSTORE( s ); 
					clearTimeout(eDrive);
					processEvent( i );
					break;
				}
			}
		}
	}
	
}

function processEvent( i )
{	  console.log("processEvent(" + i + ")");
	var s = retriveSTORE();
	var eventObj = s[i];				//assuming S_PROCESSING
	s[i].e_stat = "S_ALERT";
	updateSTORE(s);
	
	alertIndex = i;
	createAlert(eventObj);				//create alert 
	
	alertTimout0 = setTimeout(deleteAlert, ALERT_LENGTH);		// after 10 sec, clear alert
	alertTimout1 =setTimeout(missedEvent , ALERT_LENGTH);	// after 10 sec, change event status
	setTimeout(eventDriver, ALERT_LENGTH);		// after 10 sec, star eventDriver back up 
	
}

function createAlert(eventObj)
{	  console.log("createAlert()");
	var date = new Date(eventObj.e_date);
	
	playAlertSound();
	createAlertPopup(eventObj.e_name, eventObj.e_desc, date); //might have to cast as date 
}

function deleteAlert()
{	  console.log("deleteAlert()");
	stopAlertSound();
	deleteAlertPopup();
}

function deactivateEvent(id)
{	  console.log("deactivateEvent()");
	var s = retriveSTORE();
	var i = getIndex(id);
	s[i].e_stat = "S_DEACTIVATED";
	updateSTORE(s);
	
	var d = new Date();
	addHistory(i, d, "Deactivated", 0);
}
function activateEvent(id)
{	  console.log("deactivateEvent()");
	var s = retriveSTORE();
	var i = getIndex(id);
	s[i].e_stat = "S_ACTIVE";
	updateSTORE(s);
	
	var d = new Date();
	addHistory(i, d, "Activated", 0);
}
function missedEvent()
{	  console.log("missedEvent()");
	var s = retriveSTORE();
	
	if(s[alertIndex].e_rec != "REC_NONE")
		s[alertIndex].e_date = procRec(s[alertIndex].e_date, s[alertIndex].e_rec);	
	else
		s[alertIndex].e_stat = "S_DEACTIVATED";
	
	var point = (-5 * priorityModifier(s[alertIndex].e_priority));
	
	point = s[alertIndex].e_value + point;
	if(point >= 100)
		s[alertIndex].e_value = 100;
	else if(point <= -100)
		s[alertIndex].e_value = -100;
	else 
		s[alertIndex].e_value = point;
	
	var d = new Date();
	updateSTORE( s );
	addHistory(alertIndex, d, "Alert Missed", point);
}
function missedEventIndex( i )
{	  console.log("missedEventIndex()");
	var s = retriveSTORE();
	s[i].e_stat = "S_DEACTIVATED";
	
	var point = -(10 * priorityModifier(s[i].e_priority) );
	point = s[i].e_value + point;
	if(point >= 100)
		s[i].e_value = 100;
	else if(point <= -100)
		s[i].e_value = -100;
	else 
		s[i].e_value = point;
	updateSTORE( s );
	
	var d = new Date();
	addHistory( i, d, "Alert Missed", point);
}
function clearEvent()
{	  console.log("clearEvent()");

	var s = retriveSTORE();
	
	if(s[alertIndex].e_rec != "REC_NONE")
		s[alertIndex].e_date = procRec(s[alertIndex].e_date, s[alertIndex].e_rec);	
	else
		s[alertIndex].e_stat = "S_DEACTIVATED";
	
	var point = (5 * priorityModifier(s[alertIndex].e_priority));
	point = s[alertIndex].e_value + point;
	if(point >= 100)
		s[alertIndex].e_value = 100;
	else if(point <= -100)
		s[alertIndex].e_value = -100;
	else 
		s[alertIndex].e_value = point;
	updateSTORE( s );
	
	
	var d = new Date();
	addHistory(alertIndex, d, "Cleared Alert", point);
	
	clearTimeout( alertTimout0);
	clearTimeout( alertTimout1);
	
	deleteAlert();
}

function earlyEvent( i )
{	  console.log("earlyEvent()");
	var s = retriveSTORE();
	s[i].e_stat = "S_DEACTIVATED";
	
	var point = (10 * priorityModifier(s[i].e_priority) );
	point = s[i].e_value + point;
	if(point >= 100)
		s[i].e_value = 100;
	else if(point <= -100)
		s[i].e_value = -100;
	else 
		s[i].e_value = point;
	updateSTORE( s );
	
	var d = new Date();
	addHistory( i, d, "Early Finish", point);
}

function addHistory( i, date,  log, value ) 
{	  console.log("addHistory()");
	var s = retriveSTORE();
	
	var h = {
		h_date:		date,
		h_log:		log,
		h_val:		value
	};

	s[i].e_history.push( h );
	
	xhr.open("POST", "http://" + HOSTNAME +":"+ PORT +"/jst", true);
			xhr.setRequestHeader('Content-Type', 'text/plain');
			xhr.send( "Updated|" + JSON.stringify(s[i])); 
			  console.log('event sent');
			  
	updateSTORE( s );
}


//{ 	Helping functions

function priorityModifier( pri )
{
	switch(pri){
		case "PRI_STANDARD":
			return PRI_STANDARD;
			break;
		case "PRI_LOW":
			return PRI_LOW;
			break;
		case "PRI_HIGH":
			return PRI_HIGH;
			break;
		default:
			return 0;
	}
}

function playAlertSound()
{	  console.log("playAlertSound()");
	alertSound.loop = true;
	alertSound.play();
}
function stopAlertSound()
{	  console.log("stopAlertSound()");
	alertSound.pause();
}

function createAlertPopup(name, desc, date)
{	  console.log("createAlertPopup()");
	var aPop = document.getElementById("alertPopup");
	aPop.innerHTML = 	'<b>' + name+ '</b><br>' +
								desc+ '<br>' +
								getDateString(date)	+ '<br>';
	aPop.setAttribute('class', 'alertPopupON');	//make visible 
	aPop.innerHTML += "<button onclick='clearEvent()'>Done</button>";
	alertStatus = true;
}

function deleteAlertPopup()
{	  console.log("deleteAlertPopup()");
	var aPop = document.getElementById("alertPopup");
	aPop.innerHTML = "";
	aPop.setAttribute('class', 'hidden');
	alertStatus = false;
}

function getDateString( date )
{	
	var r = (Number(date.getMonth()) + 1) + "/" + (Number(date.getDate()) )+"/" + date.getFullYear() + "<br>";
	var min = date.getMinutes();
	
	if(date.getMinutes() < 10)
		min = "0" + date.getMinutes();
		
	if(date.getHours() > 12)
		r += (date.getHours() - 12) + ":" + min + " PM";
	else if(date.getHours() == 12)
		r += date.getHours() + ":" + min + " PM";
	else 
		r += date.getHours() + ":" + min + " AM";
	return r;
}

// compare 2 Date objects up till minutes
function isMatchingTime(currDate, date )
{
	if(			currDate.getFullYear() 	=== date.getFullYear() && 	
				currDate.getMonth() 	=== date.getMonth() &&
				currDate.getDay()		=== date.getDay() &&
				currDate.getHours()		=== date.getHours() &&
				currDate.getMinutes()	=== date.getMinutes() )
		return true;
	return false;
}

function retriveSTORE()
{
	return JSON.parse(sessionStorage.getItem("STORE"));
}

function updateSTORE( s )
{
	  console.log("storing an object");
	sessionStorage.setItem("STORE", JSON.stringify(s));
}
//}