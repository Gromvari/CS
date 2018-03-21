var StandardEvent = {
	e_name: "Standard Event Name",
	e_desc: "just a quick one",
	e_date: new Date(),
	e_stat: "S_ACTIVE"
};

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

function eventAlert(eventObj)
{
	  console.log("eventAlert()");							//play alert sound
	sound = new Audio("_Sounds/alertPing.mp3");
	sound.loop = true;
	sound.play();
	
	var id = eventObj.e_id;
	
	var aPop = document.getElementById("alertPopup");			//create popup
	aPop.innerHTML = 	'<b>' + eventObj.e_name 			+ '</b><br>' +
								eventObj.e_desc 			+ '<br>' +
								getDateString(new Date(eventObj.e_date) )		+ '<br>';
	aPop.innerHTML += "<button onclick='clearEventAlert(" + id + ")'> Finished </button>";
	aPop.setAttribute('class', 'alertPopupON');
	
						
	var t = setTimeout( eventAlertExit , 10000 );					//clear alert after timeout	
	function eventAlertExit(){
		  console.log("eventAlertExit() : timout");
		sound.pause();
		aPop.innerHTML = "";
		aPop.setAttribute('class', 'hideThisShit');
	}
}

function clearEventAlert( id ) // stop the alert
{
	var aPop = document.getElementById("alertPopup");		//stop sound and remove alert popup
	sound.pause();
	aPop.innerHTML = "";
	aPop.setAttribute('class', 'hideThisShit');
	
	var a = JSON.parse(sessionStorage.getItem("ALERT"));
	var eventObj = a.pop();
	  console.log( eventObj );
	eventObj.e_stat = "PROCESSED";
}

function eventDriver()
{
	var s = retriveSTORE();
	var date = new Date();
	for(i = 0; i < s.length ; i++)
	{
		if( s[i].e_stat == "S_ACTIVE")
		{
			var currDate = new Date();
			var date = new Date(s[i].e_date);
			  //console.log( date);
			  //console.log( currDate);
			if(	currDate.getFullYear() 	== date.getFullYear() && 
				currDate.getMonth() 	== date.getMonth() &&
				currDate.getDay()		== date.getDay() &&
				currDate.getHours()		== date.getHours() &&
				currDate.getMinutes()	== date.getMinutes() )
			{
				  console.log("Matching time in Active found");
				pushAlert( i );
			}
		}
	}
	
	setTimeout(eventDriver, 2000);
}

function alertDriver()
{
	if(sessionStorage.getItem("ALERT") == null)
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


//{ 	SHORTCUT TO STORE/LOAD
function retriveSTORE()
{
	return JSON.parse(sessionStorage.getItem("STORE"));
}

function updateSTORE( s )
{
	sessionStorage.setItem("STORE", JSON.stringify(s));
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
//}