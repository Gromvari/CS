const viewGraphHeight = 700;
const viewGraphWidth = 900;


function initGraph()
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.beginPath();
	btx.clearRect(0,0,viewGraphWidth,viewGraphHeight);
	btx.moveTo( 0 , viewGraphHeight / 2);
	btx.lineTo(viewGraphWidth, viewGraphHeight / 2);
	btx.stroke();
	btx.closePath();
}

function addPoint(x, y)
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	
	btx.beginPath();
	btx.arc(x, (viewGraphHeight / 2) - y, 3, 0, 2 * Math.PI);
	if( y >= 0) btx.fillStyle = "#3cb371";
	else btx.fillStyle = "#ff0000";
	btx.fill();
	
	drawGraphLine(10, 50, 40, 350);
}

function drawGraphLine(x, y, m, n)
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.beginPath()
	// btx.moveTo( x, (viewGraphHeight / 2) -y);
	// btx.lineTo(m, (viewGraphHeight / 2) -n);
	// btx.lineTo(m, (viewGraphHeight / 2) );
	// btx.lineTo(x, (viewGraphHeight / 2) );
	// btx.lineTo(x, (viewGraphHeight / 2) -y);
	btx.moveTo( x, (viewGraphHeight / 2) -y);
	btx.lineTo(m, (viewGraphHeight / 2) -n);
	btx.lineTo(m, (viewGraphHeight / 2) );
	btx.lineTo(x, (viewGraphHeight / 2) );
	btx.lineTo(x, (viewGraphHeight / 2) -y);
	
	
	btx.lineWidth = 2;
	if(y < n)
		btx.fillStyle = "green";
	else
		btx.fillStyle = "red";
	btx.fill();
	btx.closePath();
}

function drawGraph( id )
{
	var s = retriveSTORE();
	
	var i = getIndex( id );
	//addPoint( 50, s[0].e_value);
}

function drawFirstEvent()
{
	var s = retriveSTORE();
	drawLife( s[0].e_id );
}
function drawEvent( id )
{	  console.log("drawEvent()");
	var s = retriveSTORE();
	
	clearGraph(); 
	
	
	var index  = getIndex( id );
	
	var y = 0;
	var x = 50;
	//addPoint(x, y); 
	initGraph();
	
	  console.log("loop: drawGraphLine()");
	for(i = 0; i < s[index].e_history.length; i++)
	{
		if( s[index].e_history[i].h_log === "Early Finish" || s[index].e_history[i].h_log === "Alert Missed" )
		{
			drawGraphLine(x, y, x + 50, y + s[index].e_history[i].h_val);
			x = x + 50;
			y = y + s[index].e_history[i].h_val;
			//addPoint( x, y);
			addInfo(index);
		}
	}
}

function clearGraph()
{	  console.log("clearGraph()");

	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.beginPath();
	btx.clearRect(0,0,viewGraphWidth,viewGraphHeight);
	btx.closePath();
}

function addInfo(index)
{
		var b = document.getElementById("viewGraph");
		var btx = b.getContext("2d");
		btx.beginPath();
		btx.fillText(" AHHH Yea ", 30, 56);
		btx.closePath();
}

function drawLife( id )
{	  console.log("drawLife("+ id +")");
	var s = retriveSTORE();
	var index = getIndex( id ); 
	
	var x = 20;		//starting from beggining 
	var y = 0; 
	var widthUnit = ((viewGraphWidth - 40)/ getNumOfChanges(s[i]));	// get number of events needed to map => 
	
	for(i = 0; i < s[index].e_history.length; i++)	// iterate through history 
	{
		if( s[index].e_history[i].h_log === "Early Finish" || s[index].e_history[i].h_log === "Alert Missed" )	// if notewhorty 
		{
			drawGraphLine(x, y, x + widthUnit,  (viewGraphHeight /2) * (s[index].e_history[i].h_val) /100);
			x = x + widthUnit;
			y = ((viewGraphHeight / 2) * (s[index].e_history[i].h_val) / 100 );


		}
	}
	
}

function getNumOfChanges( eventObj )
{	  
	var ret = 0;
	for(i=0; i< eventObj.e_history.length; i ++)
	{
		if(eventObj.e_history[i].h_log === "Early Finish" || eventObj.e_history[i].h_log === "Alert Missed")
			ret = ret + 1;
	}
	  console.log('numToDraw: ' + ret);
	return ret;
	  
}
function drawEventPointTitle( x, y, date)
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.save();
	btx.font = "12px Arial";
	btx.fillStyle = 'black';
	
	btx.fillText("hellll", x,  (viewGraphHeight / 2) - y);
	btx.rotate( -Math.PI/2);
	btx.closePath();
	//btx.rotate( Math.PI/2);
	
}
