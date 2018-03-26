<<<<<<< HEAD
function loadEvents()
{
	var index = Number(sessionStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		
		t = sessionStorage.getItem(i);
		obj = JSON.parse(t);
		if(isEmpty(obj))
			continue; 
		createRow(obj);
	}
}
function testAlert(eventObj)
{
	testSound();
	alert(eventObj.Name);
}
function testSound()
{
	var snd = new Audio("_Sounds/alertPing.mp3");
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

=======
>>>>>>> 7705e07f62a3158cb68be8bf9b9a4f0acb40bb61
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
	obj.e_id = s.length;
	s.push(obj);
	updateSTORE(s);
}
function removeStore(id)
{
	var s = retriveSTORE()
	for (i = 0; i < s.length; i++)
	{
		if ( s[i].e_id == id)
		{
			alert("An event has been removed " + s[i].ID);
			s.splice(i, 1);
			break;
		}
	}
	updateSTORE(s);
}


function createReminder ( name, desc, date, alert, pri, stat)
{
	var eventObj = {
		e_name: 		name,
		e_desc:			desc,
		e_date: 		date,
		e_alert:		alert,
		e_priority:		pri,
		e_stat:			"S_ACTIVE",
		e_type:			"T_REMINDER",
		e_value:		0
		
	};
	   console.log( "Creating reminder" );
	   console.log( eventObj );
	putStore( eventObj );
}

function addReminderFromHTML()
{
	  console.log("adding Reminder from html");
	var name 			= document.forms["eventForm"]["eventName"].value;
	var desc 			= document.forms["eventForm"]["eventDesc"].value;
	var dateMonth 	= document.forms["eventForm"]["eventDateMonth"].value -1;
	var dateDay 		= Number(document.forms["eventForm"]["eventDateDay"].value) + 1;
	var dateYear 		= document.forms["eventForm"]["eventDateYear"].value;
	var dateHour 		= document.forms["eventForm"]["eventDateHour"].value;
	var dateMinute 	= document.forms["eventForm"]["eventDateMinute"].value;
	var datePeriod 	= document.forms["eventForm"]["eventDatePeriod"].value;
	var alert 			= document.forms["eventForm"]["eventAlert"].value;
	//var rec 			= document.forms["eventForm"]["eventRec"].value;
	var pri 				= document.forms["eventForm"]["eventPriority"].value;
	

	
	if(datePeriod == "PM")
		dateHour = dateHour - 12;
	
	var date = new Date(dateYear, dateMonth, dateDay , dateHour, dateMinute, 0, 0);
	
	createReminder(name, desc, date, alert, pri, "S_ACTIVE"); 
}

//{ 	SHORTCUT TO STORE/LOAD
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