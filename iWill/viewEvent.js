function loadEvents()
{
	t = localStorage.getItem("test");
	obj = JSON.parse(t);
	document.getElementById("eventTableBody").innerHTML = 	"<tr><td>" + obj.Name + "</td>" +
															"<td>" + obj.Desc + "</td>" +
															"<td>" + obj.Time + "</td></tr>";
}