function loadEvents()
{
	t = localStorage.getItem("test");
	obj = JSON.parse(t);
	document.getElementById("testField").innerHTML = obj.Name;
}