var HOSTNAME = "127.0.0.1";
var PORT = 3000;
var xhr = new XMLHttpRequest();


function contactServer()
{
	xhr.onreadystatechange == function () {
		if(this.readyState == 4 && this.status == 200) {
			alert(this.responseText);
		}
	};
	xhr.open("POST", "http://" + HOSTNAME +":"+ PORT, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.send( "Ping|" ); 
	  console.log("contactServer()");
}

// xhr.onreadystatechange = function() {
		// if(this.readyState == 4 && this.status == 200)
			// sessionStorage.setItem("Setup", "touched");
		
	// };
	// xhr.open("GET", "http://" + HOSTNAME +":"+ PORT, true);
	// xhr.setRequestHeader('Content-Type', 'text/plain');
	// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	// xhr.send();
function createCORSRequest(method, url) {
  var chr = new XMLHttpRequest();
  if ("withCredentials" in chr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    chr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    chr = new XDomainRequest();
    chr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    chr = null;

  }
  return chr;
}



function initEventManager()
{
	if(!sessionStorage.getItem("IDCOUNTER"))
		sessionStorage.setItem("IDCOUNTER", 0);
	
	
	xhr = createCORSRequest('GET', "http://" + HOSTNAME +':'+ PORT);
	if (!xhr) 
		throw new Error('CORS not supported');
	
	xhr.send();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200)
			console.log("RESPONSE RECEIVED !!!!");
		
	}; 
}

function loadEvents()
{
	var index = Number(sessionStorage.getItem("index"));
	for(i = 0; i < index; i++)
	{
		
		t = sessionStorage.getItem(i);
		obj = JSON.parse(t);
		if(isEmpty(obj))
			continue; 
		createRow(obj);
	}
}

function testAlert(eventObj)
{
	testSound();
	alert(eventObj.Name);
}

function testSound()
{
	var snd = new Audio("_Sounds/alertPing.mp3");
	snd.play();
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

function deleteEvent(id)
{	  console.log("deleteEvent()");
	var s = retriveSTORE();
	
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id) //remove 
		{
			xhr.open("POST", "http://" + HOSTNAME +":"+ PORT, true);
			xhr.setRequestHeader('Content-Type', 'text/plain');
			xhr.send( "Deleted|" + JSON.stringify(s[i])); 
			  console.log('event sent');
			
			
			s.splice(i, 1);
		      console.log("Event Removed");
			break;
		}
	}
	updateSTORE( s );
	
}

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
	var id = sessionStorage.getItem("IDCOUNTER");
	obj.e_id = id;

	s.push(obj);
	updateSTORE(s);
	
	id++;
	sessionStorage.setItem("IDCOUNTER", id);
}

function removeStore(id)
{	  console.log("removeStore()");
	var s = retriveSTORE()
	for (i = 0; i < s.length; i++)
	{
		if ( s[i].e_id == id)
		{
			alert("An event has been removed " + s[i].ID);
			s.splice(i, 1);
			break;
		}
	}
	updateSTORE(s);
}

function createReminder ( name, desc, date, alert, pri, stat, rec)
{	  console.log("createReminder()");
	var h = {
		h_date: date, 
		h_log: "Created", 
		h_val: 0
	};
	var ha = [h];
	var eventObj = {
		e_name: 		name,
		e_desc:			desc,
		e_date: 		date,
		e_alert:		alert,
		e_priority:		pri,
		e_stat:			"S_ACTIVE",
		e_type:			"T_REMINDER",
		e_rec:			rec,
		e_value:		0,
		e_history:		 ha 
		
	};
	   console.log( "Creating reminder" );
	   console.log( eventObj );
	putStore( eventObj );
	

	xhr.open("POST", "http://" + HOSTNAME +":"+ PORT, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.send( "Created|" + JSON.stringify(eventObj)); 
	  console.log('event sent');
	
}

function editReminder(id, name, desc, date, alert, pri, stat, rec)
{
	var s = retriveSTORE();
	var i = getIndex(id);

	
	if(name)
		s[i].e_name = name;
	if(desc)
		s[i].e_desc = desc;
	if(date)
		s[i].e_date = date;
	if(alert)
		s[i].e_alert = alert;
	if(pri)
		s[i].e_pri = pri;
	if(stat)
		s[i].e_stat = stat;
	if(rec)
		s[i].e_rec = rec;
	updateSTORE( s );
	
	var d = new Date();
	addHistory(i, d, "Edited", 0);
	
	xhr.open("POST", "http://" + HOSTNAME +":"+ PORT, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.send( JSON.stringify(s[i])); 
	  console.log('event sent');
}

function addReminderFromHTML()
{	 console.log("addReminderFromHTML()");
	var name 			= document.forms["eventForm"]["eventName"].value;
	var desc 			= document.forms["eventForm"]["eventDesc"].value;
	var dateMonth 	= document.forms["eventForm"]["eventDateMonth"].value;
	var dateDay 		= document.forms["eventForm"]["eventDateDay"].value;
	var dateYear 		= document.forms["eventForm"]["eventDateYear"].value;
	var dateHour 		= document.forms["eventForm"]["eventDateHour"].value;
	var dateMinute 	= document.forms["eventForm"]["eventDateMinute"].value;
	var datePeriod 	= document.forms["eventForm"]["eventDatePeriod"].value;
	var alert 			= document.forms["eventForm"]["eventAlert"].value;
	var rec 				= document.forms["eventForm"]["eventRec"].value;
	var pri 				= document.forms["eventForm"]["eventPriority"].value;
	
	if(datePeriod == "PM" && dateHour != 12)
		dateHour = dateHour - 12;
	
	var date = new Date(dateYear, Number(dateMonth) - 1, Number(dateDay) + 1, dateHour, dateMinute, 0, 0);

	createReminder(name, desc, date, alert, pri, "S_ACTIVE", rec); 
}

function modifyReminderFromHTML(id)
{	  console.log("modifyReminderFromHTML()");
	var name 			= document.forms["eventForm"]["eventName"].value;
	var desc 			= document.forms["eventForm"]["eventDesc"].value;
	var dateMonth 		= document.forms["eventForm"]["eventDateMonth"].value -1;
	var dateDay 		= Number(document.forms["eventForm"]["eventDateDay"].value) + 1;
	var dateYear 		= document.forms["eventForm"]["eventDateYear"].value;
	var dateHour 		= document.forms["eventForm"]["eventDateHour"].value;
	var dateMinute 		= document.forms["eventForm"]["eventDateMinute"].value;
	var datePeriod 		= document.forms["eventForm"]["eventDatePeriod"].value;
	var alert 			= document.forms["eventForm"]["eventAlert"].value;
	var rec 			= document.forms["eventForm"]["eventRec"].value;
	var pri 			= document.forms["eventForm"]["eventPriority"].value;
	

	
	if(datePeriod == "PM")
		dateHour = dateHour - 12;
	var date = new Date(dateYear, dateMonth, dateDay , dateHour, dateMinute, 0, 0);
	
	editReminder(id, name, desc, date, alert, pri, "S_ACTIVE", rec); 
	
}

function deleteAllEvents()
{
	var s = new Array();
	updateSTORE(s);
}

//{		MODIFIERS
function procRec(date, mod)
{	  console.log("procRec()");
	var curr = new Date(date);
	if(mod == "REC_WEEKLY")
	{
		curr.setDate(curr.getDate() + 7);
		return curr;
	}
	if(mod == "REC_DAYLY")
	{
		curr.setDate(curr.getDate() + 1);
		return curr;
	}
	return curr;
}
//}
//{ 	SHORTCUT TO STORE/LOAD
function retriveSTORE()
{
	return JSON.parse(sessionStorage.getItem("STORE"));
}

function updateSTORE( s )
{
	  console.log("storing an object");
	sessionStorage.setItem("STORE", JSON.stringify(s));
}

function getIndex(id)
{
	var s = retriveSTORE();
	for(i = 0; i <s.length; i++)
	{
		if(s[i].e_id == id)
		{
			return i;
			break;
		}
	}
}
//}