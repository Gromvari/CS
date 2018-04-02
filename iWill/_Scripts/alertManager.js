//{		GLOBAL VARIABLES
var alertStatus = false;
var alertIndex;
var alertTimout0;
var alertTimout1;

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
	//var t = setTimeout( dr, 2000);
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

// create alert, wait/handle alert, restart event driver 
function processEvent( i )
{	  console.log("processEvent(" + i + ")");
	var s = retriveSTORE();
	var eventObj = s[i];				//assuming S_PROCESSING
	s[i].e_stat = "S_ALERT";
	updateSTORE(s);
	
	alertIndex = i;
	createAlert(eventObj);				//create alert 
	
	alertTimout0 = setTimeout(deleteAlert, 10000);		// after 10 sec, clear alert
	alertTimout1 =setTimeout(missedAlert , 10000);	// after 10 sec, change event status
	setTimeout(eventDriver, 10000);		// after 10 sec, star eventDriver back up 
	
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

function missedAlert()
{	  console.log("missedAlert()");
	var s = retriveSTORE();
	s[alertIndex].e_stat = "S_DEACTIVATED";
	s[alertIndex].e_value -= 5;
	
	var d = new Date();
	updateSTORE( s );
	addHistory(alertIndex, d, "Alert Missed", -5);
}


function clearAlert()
{	  console.log("clearAlert()");
	var s = retriveSTORE();
	s[alertIndex].e_stat = "S_DEACTIVATED";
	s[alertIndex].e_value += 5;
	updateSTORE( s );
	var d = new Date();
	addHistory(alertIndex, d, "Cleared Alert", 5);
	
	clearTimeout( alertTimout0);
	clearTimeout( alertTimout1);
	
	deleteAlert();
}

function earlyAlert( i )
{	  console.log("earlyAlert()");
	var s = retriveSTORE();
	s[i].e_stat = "S_DEACTIVATED";
	s[i].e_value += 10;
	updateSTORE( s );
	
	var d = new Date();
	addHistory( i, d, "Early Finish", 10);
}

function addHistory( i, date,  log, value ) //uses index
{	  console.log("addHistory()");
	var s = retriveSTORE();
	var h = {
		h_date:		date,
		h_log:		log,
		h_val:		value
	};
	//var ha = [h];
	//var currHis = s[i].e_history;
	s[i].e_history.push( h );
	//s[i].e_history[1] = h;
	//alert(s[i].e_history[1].h_date);
	//s[i].e_history = new Array();
	updateSTORE( s );	//why the good cuk is this not updating there????
}


//{ 	Helping functions

function retriveSTORE()
{
	return JSON.parse(sessionStorage.getItem("STORE"));
}

function updateSTORE( s )
{
	sessionStorage.setItem("STORE", JSON.stringify(s));
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
	aPop.innerHTML += "<button onclick='clearAlert()'>Done</button>";
	alertStatus = true;
							
	//aPop.innerHTML += "<button onclick='clearEventAlert(" + id + ")'> Finished </button>";
	//aPop.setAttribute('class', 'alertPopupON');
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
	var r = (Number(date.getMonth()) + 1) + "/" + (Number(date.getDate())  + 1)+"/" + date.getFullYear() + "<br>";
	var min = date.getMinutes();
	if(date.getMinutes() < 10)
		min = "0" + date.getMinutes();
	if(date.getHours() > 12)
		r += (date.getHours() - 12) + ":" + min + " PM";
	else 
		r += date.getHours() + ":" + min + " AM";
	return r;
}

// compare 2 Date objects up till minutes
function isMatchingTime(currDate, date )
{
	if(	currDate.getFullYear() 	== date.getFullYear() && 	
				currDate.getMonth() 	== date.getMonth() &&
				currDate.getDay()		== date.getDay() &&
				currDate.getHours()		== date.getHours() &&
				currDate.getMinutes()	== date.getMinutes() )
		return true;
	return false;
}
//}