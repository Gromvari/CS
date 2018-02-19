function loadEvents()
{
					
	var index = Number(localStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		t = localStorage.getItem(i);
		obj = JSON.parse(t);
		document.getElementById("eventTableBody").innerHTML += 	
															"<tr><td>" + obj.Name + "</td>" +
															"<td>" + obj.Desc + "</td>" +
															"<td>" + obj.Time + "</td></tr>";
	}
	
	document.getElementById("testField").innerHTML = "Index value: " + localStorage.getItem("index");
}

function getEvent(i)
{
	
}