//{		GLOBAL VARIABLES
var alertStatus = false;

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
	console.log("Event Driver and Alert Driver Started");
	function dr( )
	{ 
		eventDriver();
		alertDriver();
	}
	dr();
	//var t = setTimeout( dr, 2000);
}


function eventDriver()
{
	eDrive = setTimeout(eventDriver, 2000);		// loop eventDriver
	var s = retriveSTORE();
	for(i = 0; i < s.length ; i++)		// loop event list 
	{
		if( s[i].e_stat == "S_ACTIVE")	// process only active
		{
			var currDate = new Date();
			var date = new Date(s[i].e_date);			//find matching time 
			if(isMatchingTime(currDate, date)
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



// create alert, wait/handle alert, restart event driver 
function processEvent( i )
{
	  console.log("processEvent(" + i + ")");
	var s = retriveSTORE();
	var eventObj = s[i];				//assuming S_PROCESSING
	s[i].e_stat = "S_ALERT";
	updateSTORE(s);
	
	createAlert(eventObj);				//create alert 
	
	setTimeout(deleteAlert, 10000);		// after 10 sec, clear alert
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

function alertDriver()
{
	if(sessionStorage.getItem("ALERT") == null)		//init "ALERT"
	{
		var ap = new Array();
		sessionStorage.setItem("ALERT", JSON.stringify(ap));
	}
	var a = JSON.parse(sessionStorage.getItem("ALERT"));
	
	if(a.length != 0)
	{
		var alertObj = a.pop();
		eventAlert(alertObj);
	}
	
	
	sessionStorage.setItem("ALERT", JSON.stringify(a));
	
	//for now just loop
	var t = setTimeout(alertDriver, 2000);
	
}

function pushAlert(i) // using storage index
{
	var s = retriveSTORE();	
	s[i].e_stat = "S_PROCESSING";		//set stat to processing
	updateSTORE( s );
	
	if(sessionStorage.getItem("ALERT") == null)
	{
		var ap = new Array();
		sessionStorage.setItem("ALERT", JSON.stringify(ap));
	}
	
	var a = JSON.parse(sessionStorage.getItem("ALERT"));
	a.push(s[i]);
	console.log("AlertQ: ");
	console.log( a );
	sessionStorage.setItem("ALERT", JSON.stringify(a));
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