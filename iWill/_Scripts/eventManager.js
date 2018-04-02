function initEventManager()
{
	if(!sessionStorage.getItem("IDCOUNTER"))
		sessionStorage.setItem("IDCOUNTER", 0);
}

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

function deleteEvent(id)
{	  console.log("deleteEvent()");
	var s = retriveSTORE();
	
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id) //remove 
		{
			s.splice(i, 1);
		  console.log("Event Removed");
		  break;
		}
	}
	updateSTORE( s );
	
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
	var id = sessionStorage.getItem("IDCOUNTER");
	obj.e_id = id;

	s.push(obj);
	updateSTORE(s);
	
	id++;
	sessionStorage.setItem("IDCOUNTER", id);
}

function removeStore(id)
{	  console.log("removeStore()");
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
{	  console.log("createReminder()");
	var h = {
		h_date: date, 
		h_log: "Created", 
		h_val: 0
	};
	var ha = [h];
	var eventObj = {
		e_name: 		name,
		e_desc:			desc,
		e_date: 		date,
		e_alert:		alert,
		e_priority:		pri,
		e_stat:			"S_ACTIVE",
		e_type:			"T_REMINDER",
		e_value:		0,
		e_history:		 ha 
		
	};
	   console.log( "Creating reminder" );
	   console.log( eventObj );
	putStore( eventObj );
}

function editReminder(id, name, desc, date, alert, pri, stat)
{
	var s = retriveSTORE();
	var index;
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id)
		{
			index = i;
			break;
		}
	}
	var eventObj = s[i];
	
	if(name)
		eventObj.e_name = name;
	if(desc)
		eventObj.e_desc = desc;
	if(date)
		eventObj.e_date = date;
	if(alert)
		eventObj.e_alert = alert;
	if(pri)
		eventObj.e_pri = pri;
	if(stat)
		eventObj.e_stat = stat;
	
	updateSTORE( s );
}

function addReminderFromHTML()
{	 console.log("addReminderFromHTML()");
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

function modifyReminderFromHTML()
{	  console.log("modifyReminderFromHTML()");
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

//{		MODIFIERS

//}
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