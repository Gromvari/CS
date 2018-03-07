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
	body.innerHTML += "<p>" + sessionStorage.getItem("STORE") + "</p>";
}

function loadViewEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = "<h1> View Events </h1>" + t;
	
	loadEvents();
	body.innerHTML += '<input type="button" value="Doom Button" onclick="clearAllEvents()">';
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
	
}

function loadDeleteEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = "<h1> Delete Event </h1>" + t;
	
	loadEvents();
	body.innerHTML += '<input type="button" value="Doom Button" onclick="clearAllEvents()">';
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
}

function loadModifyEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = "<h1> Modify Event </h1>" + t;
	
	loadEventsModifyDemo();
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
}

function loadEvents()
{
	var s = JSON.parse(sessionStorage.getItem("STORE"));
	var i = 0; 
	for ( i; i < s.length; i++)
	{
		createRow( s[i]);
	}
}
function loadEventsModifyDemo()
{
	var s = JSON.parse(sessionStorage.getItem("STORE"));
	var i = 0; 
	for ( i; i < s.length; i++)
	{
		createRowModifyDemo( s[i]);
	}
}
function createRow(eventObj)
{
	document.getElementById("eventTableBody").innerHTML +=
		"<tr>"+
			"<td>" +  "<button class='editEventButton' onclick='deleteStorage(" +eventObj.ID+ ")'>" + "</td>" +
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

function createRowModifyDemo(eventObj)
{
	document.getElementById("eventTableBody").innerHTML +=
		"<tr>"+
			"<td>" +  "<button class='editEventButton' onclick='modifyStorage(" +eventObj.ID+ ")'>" + "</td>" +
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