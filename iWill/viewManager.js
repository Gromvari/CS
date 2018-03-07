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
	body.innerHTML = 
	"<h1> View Events </h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>XXX</th>"+
		"<th>Event Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>When</th>"+
		"<th>ID</th>"+
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		
		"</tbody>"+
	
	"</table>";
	
	loadEvents();
	body.innerHTML += '<input type="button" value="Doom Button" onclick="clearAllEvents()">';
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
	
}

function loadDeleteEventDemo()
{
	var body = document.getElementById('body');
	body.innerHTML = 
	"<h1> View Events </h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Delete</th>"+
		"<th>Event Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>When</th>"+
		"<th>ID</th>"+
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		
		"</tbody>"+
	
	"</table>";
	
	loadEvents();
	body.innerHTML += '<input type="button" value="Doom Button" onclick="clearAllEvents()">';
	body.innerHTML += "<p id='eventText'></p><div id='alertPopup'></div>";		//alert functionality
}

// function loadEvents()
// {
		// var index = Number(sessionStorage.getItem("index"));
		// for(i = 0; i < index; i++)
		// {
			// t = sessionStorage.getItem(i);
			// obj = JSON.parse(t);
			// createRow(obj, i);
		// }
// }
function loadEvents()
{
	var s = JSON.parse(sessionStorage.getItem("STORE"));
	var i = 0; 
	for ( i; i < s.length; i++)
	{
		createRow( s[i], i);
	}
}
	function createRow(eventObj, i)
	{
		document.getElementById("eventTableBody").innerHTML +=
			"<tr>"+
				"<td>" +  "<button value=" +i+ " class='editEventButton' onclick='deleteEventIndex(" +i+ ")'>" + "</td>" +
				"<td>" + eventObj.Name  + "</td>" +
				"<td>" + eventObj.Desc  + "</td>" +
				"<td>" + eventObj.Time  + "</td>" +
				"<td>" + eventObj.When  + "</td>" +
				"<td>" + eventObj.ID + "</td>" +
			"</tr>";
	}
