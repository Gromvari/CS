//{		FINAL GLOBAL VARs
var t = 
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Action</th>"+
		"<th>Event Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>When</th>"+
		"<th>ID</th>"+
		"<th>Alert Type</th>" +
		"<th>Event Type</th>" +
		"<th>Status</th>" +
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		"</tbody>"+
	"</table>";
//}
function loadAddEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = 
	"<h1> Add Event </h1>"	+
	"<form name='eventForm' onsubmit='return addEventFromHTML()' method='post'>"	+
	"<table>"	+
		"<tr><td>Name: </td>			<td><input type='text' name='eventName' class='addField'></td> </tr>"	+
		"<tr><td>Description: </td>	<td><textarea type='text' name='eventDesc' class='addField'></textarea></td></tr> "	+
		"<tr><td>Time: </td>			<td><input type='date' name='eventTime' class='addField'></td> </tr>"	+
		"<tr><td>When?: </td>		<td><input type='text' name='eventWhen' class='addField'></td> </tr>"	+
	"</table>"	+	
	"<input type='submit' value'Add Event'>"	+
	"</form>";	
	
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
	
	//test for STORE
	//body.innerHTML += "<p>" + sessionStorage.getItem("STORE") + "</p>";
}
function loadAddEventAdvencedDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = 
	"<h1> Add Event </h1>"	+
	
	"</form>";	
	
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
}
function loadEventDemo( demo )
{
	var body = document.getElementById('body');
	if(demo == "modify")
		body.innerHTML = "<h1> Modify Event </h1>" + t;
	else if(demo == "delete")
		body.innerHTML = "<h1> Delete Event </h1>" + t;
	else 
		body.innerHTML = "<h1> View Events </h1>" + t;

	loadEvents( demo );
	body.innerHTML += '<input type="button" value="Doom Button" onclick="clearAllEvents()">';	// DOOM button
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
	
}
function loadEvents( demo)
{
	var s = JSON.parse(sessionStorage.getItem("STORE"));
	var i = 0; 
	for ( i; i < s.length; i++)
	{
		createRow(s[i], demo );
	}
}

function createRow(eventObj, demo)
{
	var button;
	if (demo == "delete")
		button = "<td>" +  "<button class='editEventButton' onclick='deleteStorage(" +eventObj.ID+ ")'>" + "</td>";
	else if (demo == "modify")
		button = "<td>" +  "<button class='editEventButton' onclick='modifyStorage(" +eventObj.ID+ ")'>" + "</td>";
	else
		button = "<td>" +  "<button class='editEventButton' onclick='alert('useless!')'>" + "</td>";
	
	document.getElementById("eventTableBody").innerHTML +=
		"<tr>"+
			button +
			"<td>" + eventObj.Name  + "</td>" +
			"<td>" + eventObj.Desc  + "</td>" +
			"<td>" + eventObj.Time  + "</td>" +
			"<td>" + eventObj.When  + "</td>" +
			"<td>" + eventObj.ID + "</td>" +
			"<td>" + eventObj.AlertType + "</td>" +
			"<td>" + eventObj.EventType + "</td>" +
			"<td>" + eventObj.Status + "</td>" +
		"</tr>";
}

function loadAdvancedAddEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = 
		"<table>" +
			"<tr>" +
				"<td><button onclick='loadAddReminderDemo()'>Reminder</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
				"<td><button>WORKINPROGRESS</button></td>" +
			"</tr>" +
		"</table>";
}

function loadAddReminderDemo()
{
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
	var body = document.getElementById('body');
	
	body.innerHTML =
		"<h1>Create a Reminder</h1>" +
		"<form name='eventForm' onsubmit='return addReminderFromHTML()' method='post'>" +
		"<table>" +
			"<tr>" +
				"<td>Name: </td>" +
				"<td><input type='text' name='eventName'></td>" +
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
						//"<option value=''>some other optoin</option>" +
						//"<option value=''>yeas</option>" +
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

function loadAdvancedViewEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML +=
	"<h1>AdvancedView</h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Action</th>"+
		"<th>Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>ID</th>"+
		"<th>Alert Type</th>" +
		"<th>Priority</th>" +
		"<th>Status*</th>" +
		"<th>History</th>" +
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		"</tbody>"+
	"</table>";
	
}

