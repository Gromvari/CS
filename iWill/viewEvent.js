// IS NOW DEFUNCT -> eventManager.js
function loadEvents()
{
					
	var index = Number(sessionStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		t = sessionStorage.getItem(i);
		obj = JSON.parse(t);
		createRow(obj);
	}
	document.getElementById("testField").innerHTML = "Index value: " + sessionStorage.getItem("index");
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

function clearAllEvents()
{
	sessionStorage.clear();
	document.getElementById("eventTableBody").innerHTML = "";
}