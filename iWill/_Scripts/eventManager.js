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
		if ( s[i].ID == id)
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
		e_stat:			"Active",
		e_type:			"Reminder",
		e_value:		0
		
	};

	putStore( eventObj );
}

function addReminderFromHTML()
{
	var name 		= document.forms["eventForm"]["eventName"].value;
	var desc 		= document.forms["eventForm"]["eventDesc"].value;
	var dateMonth 	= document.forms["eventForm"]["eventDateMonth"].value;
	var dateDay 	= document.forms["eventForm"]["eventDateDay"].value;
	var dateYear 	= document.forms["eventForm"]["eventDateYear"].value;
	var dateHour 	= document.forms["eventForm"]["eventDateHour"].value;
	var dateMinute 	= document.forms["eventForm"]["eventDateMinute"].value;
	var datePeriod 	= document.forms["eventForm"]["eventDatePeriod"].value;
	var alert 		= document.forms["eventForm"]["eventAlert"].value;
	//var rec 		= document.forms["eventForm"]["eventRec"].value;
	var pri 		= document.forms["eventForm"]["eventPriority"].value;
	

	
	if(datePeriod == "PM")
		dateHour = dateHour + 12;
	
	var date = new Date(dateYear, dateMonth, dateDay, dateHour, dateMinute, 0, 0);
	
	createReminder(name, desc, date, alert, pri, "Active"); 
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