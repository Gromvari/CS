var StandardEvent = {
	e_name: "Standard Event Name",
	e_desc: "just a quick one",
	e_date: new Date(),
	e_status: "Active"
};

function eventAlert(eventObj)
{
	sound = new Audio("_Sounds/alertPing.mp3");
	sound.loop = true;
	sound.play();
	
	var aPop = document.getElementById("alertPopup");
	aPop.innerHTML = 	'<b>' + eventObj.e_name 			+ '</b><br>' +
								eventObj.e_desc 			+ '<br>' +
								eventObj.e_date 			+ '<br>';
	aPop.innerHTML += "<button onclick='clearEventAlert(eventAlert)'> Finished </button>";
	aPop.setAttribute('class', 'alertPopupON');
	
	
	var t = setTimeout( eventAlertExit , 10000 );					
	function eventAlertExit(){
		sound.pause();
		aPop.innerHTML = "";
		aPop.setAttribute('class', 'hideThisShit');
	}
}

function clearEventAlert() // stop the alert
{
	var aPop = document.getElementById("alertPopup");
	sound.pause();
	aPop.innerHTML = "";
	aPop.setAttribute('class', 'hideThisShit');
	
	var a = JSON.parse(sessionStorage.getItem("ALERT"));
	var eventObj = a.pop();
	eventObj.e_stat = "PROCESSED";
	
}

function eventDriver()
{
	var s = retriveSTORE();
	var date = new Date();
	
	for(i = 0; i < s.length ; i++)
	{
		//alert(s[i].e_stat);
		if( s[i].e_stat == "Active")
		{
			var currDate = new Date();
			var date = new Date(s[i].e_date);
			if(	currDate.getFullYear() 	== date.getFullYear() && 
				currDate.getMonth() 	== date.getMonth() &&
				currDate.getDay()		== date.getDay() &&
				currDate.getHours()		== date.getHours() &&
				currDate.getMinutes()	== date.getMinutes() )
			{
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
	s[i].e_status = "S_PROCESSING";		//set current to 
	updateSTORE( s );
	
	if(sessionStorage.getItem("ALERT") == null)
	{
		var ap = new Array();
		sessionStorage.setItem("ALERT", JSON.stringify(ap));
	}
	var a = JSON.parse(sessionStorage.getItem("ALERT"));
	a.push(s[i]);
	
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
//}