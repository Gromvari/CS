

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
	var currDate 		= new Date();
	var currMonth 	= currDate.getMonth() + 1;
	var currDay 		= currDate.getDate();
	var currYear 		= currDate.getFullYear();
	var currHour 		= currDate.getHours();
	var currMinute  	= currDate.getMinutes();
	var currPeriod;
	
	if(currHour == 12)
		currPeriod = "PM"
	else if( currHour > 12)
	{
		currHour -= 12;
		currPeriod = "PM";
	}
	else
		currPeriod = "AM";
	
	body.innerHTML =
		"<h1>Create a Reminder</h1>" +
		"<form autocomplete='off'name='eventForm' onsubmit='return addReminderFromHTML()' method='post'>" +
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
				"<td><input type='text' class='TimeField char2' name='eventDateMonth'	value='" +currMonth+"'>" + "/" +
				"<input type='text' 	class='TimeField char2' name='eventDateDay'		value='"+currDay+"'>" +  "/" +
				"<input type='text' 	class='TimeField char4' name='eventDateYear'	value='"+currYear+"'>" + "<br>" +
				"<input type='text' 	class='TimeField char2' name='eventDateHour'	value='"+currHour+"'>" + ":" +
				"<input type='text' 	class='TimeField char2' name='eventDateMinute'	value='"+currMinute+"'>" + 
				"<input type='text' 	class='TimeField char2' name='eventDatePeriod'	value='"+currPeriod+"'></td>" + 
			"</tr>" +
			"<tr>" +
				"<td>Recurrance: </td>" +
				"<td><select name='eventRec'>" +
						"<option value='REC_NONE'>None</option>" +
						"<option value='REC_WEEKLY'>Weekly</option>" +
						"<option value='REC_DAYLY'>Dayly</option>" +
				"</td>" +
			"</tr>" +
			"<tr>" +
				"<td>Alert Type: </td>" +
				"<td><select name='eventAlert'>" +
						"<option value='ALE_STANDARD'>Standard</option>" +
						"<option value='ALE_NONE'>None</option>" +
				"</td>" +
				
			"</tr>" +
			"<tr>" +
				"<td>Priority*: </td>" +
				"<td><select name='eventPriority'>" +
						"<option value='PRI_STANDARD'>Standard</option>" +
						"<option value='PRI_LOW'>Low</option>" +
						"<option value='PRI_HIGH'>High</option>" +
						"<option value='PRI_NONE'>None</option>" +
				"</td>" +
			"</tr>" +
		"</table>" +
		"<input type='submit'>" +
		"</form>"
		;
		
}

function loadModifyReminder( id )
{
	var body = document.getElementById('body');
	var s = retriveSTORE();
	var i = 0;
	for(j = 0; j < s.length; j++)
	{
		if(s[j].e_id == id)
		{
			i = j;
			break;
		}
	}
	var d = new Date(s[i].e_date);
	var currHour 	= d.getHours();
	var currPeriod;
	
	if(currHour >= 12)
	{
		currPeriod = "PM";
		currHour = currHour - 12;
	}
	else
		currPeriod = "AM";
	
	body.innerHTML =
		"<h1>Modify a Reminder</h1>" +
		"<form autocomplete='off' name='eventForm' onsubmit='return modifyReminderFromHTML("+ id +")' method='post'>" + //change to modify
		"<table>" +
			"<tr>" +
				"<td>Name: </td>" +
				"<td><input type='text' name='eventName' value='" + s[i].e_name + "' required></td>" +
			"</tr>" +
			"<tr>" +
				"<td>Desciption: </td>" +
				"<td><input type='text' name='eventDesc' value='" + s[i].e_desc + "' ></td>" +
			"</tr>" +
			"<tr>" +
				"<td>Time: </td>" +		
				"<td><input type='text' class='TimeField char2' name='eventDateMonth'	value='" + (Number(d.getMonth()) +1) + "'>" + "/" +
				"<input type='text' 	class='TimeField char2' name='eventDateDay'		value='"+ d.getDay() +"'>" +  "/" +
				"<input type='text' 	class='TimeField char4' name='eventDateYear'	value='"+ d.getFullYear() + "'>" + "<br>" +
				"<input type='text' 	class='TimeField char2' name='eventDateHour'	value='"+ currHour + "'>" + ":" +
				"<input type='text' 	class='TimeField char2' name='eventDateMinute'	value='"+ d.getMinutes() +"'>" + 
				"<input type='text' 	class='TimeField char2' name='eventDatePeriod'	value='"+ currPeriod + "'></td>" +  //chagne later
			"</tr>" +
			"<tr>" +
				"<td>Recurrance: </td>" +
				"<td><select name='eventRec'>" +
						"<option value='REC_NONE'>None</option>" +
						"<option value='REC_WEEKLY'>Weekly</option>" +
						"<option value='REC_DAYLY'>Dayly</option>" +
				"</td>" +
			"</tr>" +
			"<tr>" +
				"<td>Alert Type: </td>" +
				"<td><select name='eventAlert'>" +
						"<option value='ALE_STANDARD'>Standard</option>" +
						"<option value='none'>None</option>" +
				"</td>" +
				
			"</tr>" +
			"<tr>" +
				"<td>Priority*: </td>" +
				"<td><select name='eventPriority'>" +
						"<option value='PRI_STANDARD'>Standard</option>" +
						"<option value='PRI_LOW'>Low</option>" +
						"<option value='PRI_HIGH'>High</option>" +
						"<option value='PRI_NONE'>None</option>" +
				"</td>" +
			"</tr>" +
		"</table>" +
		"<input type='submit'>" +
		"</form>"
		;
		
}

function loadViewGraph()
{
	var body = document.getElementById('body');
	body.innerHTML = "<h2> Progress </h2>" + 
	"Show: <select id='viewGraphNameList' onchange='redrawGraph()'> " + 
			getViewGraphNameList() + 
		"</select> Period:<select id='viewGraphPeriodList'>" +
			"<option value='D'>Today</option>" +
			"<option value='W'>Week</option>" +
		"</select><br>" +
	"<canvas id='viewGraph' width="+viewGraphWidth+" height="+viewGraphHeight+"></canvas><br>"+
	"<button onclick='addPoint(50, -50)'>CIRCLE BABBY</button><br>" +
	"<button onclick='clearGraph()'>Clear Graph</button>";
	initGraph();
	drawFirstEvent();
}

function getViewGraphNameList()
{
	var s = retriveSTORE();
	var str = ''; 
	if(s != null)
	for(i = 0; i < s.length; i++)
	{
		str += "<option value='" + s[i].e_id + "'>" + s[i].e_name + "</option>";
	}
	return str;
}

function redrawGraph() 
{
	var a = document.getElementById('viewGraphNameList').value;
	drawEvent( a );
}
function consolePing()
{
	console.log('Ping!');
}

function loadViewEvent()
{
	var body = document.getElementById('body');
	body.innerHTML =
	"<h1>View</h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Actions</th>" +
		"<th>Name</th>"+
		"<th class='w40'>Description</th>"+
		"<th>Date</th>"+
		"<th>ID*</th>"+
		"<th>Alert Type</th>" +
		"<th>Priority</th>" +
		"<th>Status*</th>" +
		"<th>Type*</th>" +
		"<th>Recurrance*</th>" +
		"<th>History*</th>" +
		"<th>Value</th>" +
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		"</tbody>"+
	"</table>";
	
	loadEvents();
	body.innerHTML += "<button onclick='deleteAllEvents() loadViewEvent()'> DOOM BUTTON </button>";
}

function loadEvents()
{
	var s = retriveSTORE();
	var b = document.getElementById("eventTable");
	if( s != null)
	for (i = 0; i < s.length; i++)
	{
		var date = new Date(s[i].e_date);
		var his = "";
		for(j = 0; j < s[i].e_history.length; j++)
		{
			his += getHistoryString( s[i].e_history[j])  +  "<br>";
		}
		b.innerHTML += 
			"<tr>" +
				"<td>" + "<button class='actionButton' onclick='earlyEvent(" + i + ")'>Finished</button>" +"<br>"  +
				"<button class='actionButton' onclick='loadModifyReminder("+ s[i].e_id +")'>Edit</button>" + 
				"<button class='actionButton' onclick='deactivateEvent(" + s[i].e_id +")'>Remove</button>" + "</td>" +
				"<td>" + s[i].e_name + "</td>" +
				"<td>" + s[i].e_desc + "</td>" +
				"<td>" + getDateString(date) + "</td>" +
				"<td>" + s[i].e_id + "</td>" +
				"<td>" + s[i].e_alert + "</td>" +
				"<td>" + s[i].e_priority + "</td>" +
				"<td>" + s[i].e_stat + "</td>" +
				"<td>" + s[i].e_type + "</td>" +
				"<td>" + s[i].e_rec + "</td>" +
				"<td>" + his+ "</td>" + 
				"<td>" + s[i].e_value + "</td>" +
			"</tr>";
	}
}

function loadViewEventClient()
{
	var body = document.getElementById('body');
	body.innerHTML =
	"<h1>View</h1>" +
	"<table id='eventTable'>"+
		"<thead>"+
		"<th>Actions</th>" +
		"<th>Name</th>"+
		"<th>Description</th>"+
		"<th>Date</th>"+
		"<th>Alert Type</th>" +
		"<th>Priority</th>" +
		"<th>Value</th>" +
		"</thead>"+
		"<tbody id='eventTableBody'>"+
		"</tbody>"+
	"</table>";
	
	loadEventsClient();
	body.innerHTML += "<button onclick='deleteAllEvents(), loadViewEvent()'> DOOM BUTTON </button>";
}

function loadEventsClient()
{
	var s = retriveSTORE();
	var b = document.getElementById("eventTable");
	if( s != null)
	for (i = 0; i < s.length; i++)
	{
		var date = new Date(s[i].e_date);
		var his = "";
		for(j = 0; j < s[i].e_history.length; j++)
		{
			his += getHistoryString( s[i].e_history[j])  +  "<br>";
		}
		
		var c = "";
		var b1 = "<button class='actionButton' onclick='earlyEvent(" + i + ");loadViewEventClient()'>Finished</button>";
		var b2 = "<button class='actionButton' onclick='deactivateEvent(" + s[i].e_id +");loadViewEventClient()'>Remove</button>";
		
		if(s[i].e_stat == "S_DEACTIVATED")
		{
			c = "deactivated";
			b1 = "<button class='actionButton' onclick='activateEvent(" + s[i].e_id + ");loadViewEventClient() '>Activate</button>";
			b2 ="<button class='actionButton delButton' onclick='deleteEvent(" + s[i].e_id +");loadViewEventClient()'>Delete</button>";
		}
		var style = "";  		
		
		b.innerHTML += 
			"<tr class='"+ c +"'>" +
				"<td>" + b1 +"<br>"  +
					"<button class='actionButton' onclick='loadModifyReminder("+ s[i].e_id +");loadViewEventClient()'>Edit</button>" + 
					b2 + 
				"</td>" +
				"<td><b>" + s[i].e_name + "</b></td>" +
				"<td>" + s[i].e_desc + "</td>" +
				"<td>" + getDateString(date) + "</td>" +
				"<td>" + getAlertTypeString(s[i].e_alert) + "</td>" +
				"<td>" + getPriorityString(s[i].e_priority) + "</td>" +
				"<td style='"+ style +"'>" + s[i].e_value + "</td>" +
			"</tr>";
	}
}

//{ 	SHORTCUT TO STORE/LOAD
function getAlertTypeString( a )
{
	if(a == "ALE_NONE")
		return "None"
	return "Standard";
}
function getPriorityString( p )
{
	if(p == "PRI_HIGH") return "High";
	if(p == "PRI_LOW") return "Low";
	if(p == "PRI_NONE") return "None";
	return "Standard";
}
function getHistoryString( historyObj )
{
	var date = new Date(historyObj.h_date);
	return "[Date: " + getDateString(date) + " <br>" +"Log: " + historyObj.h_log + " <br>" + "Val: "+ historyObj.h_val + "]";
}
//}