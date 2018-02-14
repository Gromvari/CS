function addEvent(){
	var eName = document.forms["eventForm"]["eventName"].value;
	var eDesc = document.forms["eventForm"]["eventDesc"].value;
	var eTime = document.forms["eventForm"]["eventTime"].value;
	if(eName == "") {
		alert("Name must be filled out");
		return false; 
	}
	else if(eDesc == ""){
		alert("Desc must be filled out");
		return false;
	}
	else if(eTime == ""){
		alert("Time must be filled out");
		return false;
	}
	var eventObj = {
		Name: eName,
		Desc: eDesc,
		Time: eTime
	};
	eventJSON = JSON.stringify(eventObj);
	localStorage.setItem("test", eventJSON);
		alert("Things were submitted" + eName + eDesc + eTime);
}