

function loadAddEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = 
		"<table>" +
			"<tr>" +
				"<td><button onclick='loadAddReminder()'>Reminder</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
			"</tr>" +
		"</table>";
}

function loadAddReminder()
{
	var body = document.getElementById('body');
	var currDate 	= new Date();
	var currMonth 	= currDate.getMonth();
	var currDay 	= currDate.getDate();
	var currYear 	= currDate.getFullYear();
	var currHour 	= currDate.getHours();
	var currMinute  = currDate.getMinutes();
	var currPeriod;
	
	if(currHour > 12)
	{
		currPeriod = "PM";
		currHour = currHour - 12;
	}
	else
	{
		currPeriod = "AM";
	}
	
	body.innerHTML =
		"<h1>Create a Reminder</h1>" +
		"<form name='eventForm' onsubmit='return addReminderFromHTML()' method='post'>" +
		"<table>" +
			"<tr>" +
				"<td>Name: </td>" +
				"<td><input type='text' name='eventName' required></td>" +
			"</tr>" +
			"<tr>" +
				"<td>Desciption: </td>" +
				"<td><input type='text' name='eventDesc'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>Time: </td>" +		//fetch current date 
				"<td><input type='text' class='TimeField char2' name='eventDateMonth'	value='" +currMonth+ "'>" + "/" +
				"<input type='text' 	class='TimeField char2' name='eventDateDay'		value='"+currDay+"'>" +  "/" +
				"<input type='text' 	class='TimeField char4' name='eventDateYear'	value='"+currYear+"'>" + "<br>" +
				"<input type='text' 	class='TimeField char2' name='eventDateHour'	value='"+currHour+"'>" + ":" +
				"<input type='text' 	class='TimeField char2' name='eventDateMinute'	value='"+currMinute+"'>" + 
				"<input type='text' 	class='TimeField char2' name='eventDatePeriod'	value='"+currPeriod+"'></td>" + 
			"</tr>" +
			"<tr>" +
				"<td>Recurrance: </td>" +
				"<td><select name='eventRec'>" +
						"<option value='never'>Never</option>" +
				"</td>" +
			"</tr>" +
			"<tr>" +
				"<td>Alert Type: </td>" +
				"<td><select name='eventAlert'>" +
						"<option value='standard'>Standard</option>" +
						"<option value='none'>None</option>" +
				"</td>" +
				
			"</tr>" +
			"<tr>" +
				"<td>Priority*: </td>" +
				"<td><select name='eventPriority'>" +
						"<option value='standard'>Standard</option>" +
						"<option value='low'>Low</option>" +
						"<option value='high'>High</option>" +
						"<option value='none'>None</option>" +
				"</td>" +
			"</tr>" +
		"</table>" +
		"<input type='submit'>" +
		"<form>"
		;
		
}

function loadViewEvent()
{
	var body = document.getElementById('body');
	body.innerHTML =
	"<h1>View</h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>ID</th>"+
		"<th>Alert Type</th>" +
		"<th>Priority</th>" +
		"<th>Status*</th>" +
		"<th>Type*</th>" +
		"<th>History</th>" +
		"<th>Value</th>" +
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		"</tbody>"+
	"</table>";
	
	loadEvents();
	body.innerHTML += "<button onclick='clearAllEvents()'> DOOM BUTTON </button>";
}

function loadEvents()
{
	var s = retriveSTORE();
	var b = document.getElementById("eventTable");
	for (i = 0; i < s.length; i++)
	{
		var date = new Date(s[i].e_date);
		
		b.innerHTML += 
			"<tr>" +
				"<td>" + s[i].e_name + "</td>" +
				"<td>" + s[i].e_desc + "</td>" +
				"<td>" + getDateString(date) + "</td>" +
				"<td>" + s[i].e_id + "</td>" +
				"<td>" + s[i].e_alert + "</td>" +
				"<td>" + s[i].e_priority + "</td>" +
				"<td>" + s[i].e_stat + "</td>" +
				"<td>" + s[i].e_type + "</td>" +
				"<td>" + "{}" + "</td>" +
				"<td>" + s[i].e_value + "</td>" +
			"</tr>";
	}
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
	var r = date.getDate() + "/" + date.getMonth() +"/" + date.getFullYear() + "<br>";
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