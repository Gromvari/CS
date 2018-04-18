const viewGraphHeight = 700;
const viewGraphWidth = 900;

const changeEventsList = "Finish";

function initGraph()
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.moveTo( 0 , viewGraphHeight / 2);
	btx.lineTo(viewGraphWidth, viewGraphHeight / 2);
	btx.stroke();
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
}

function drawGraphLine(x, y, m, n)
{
	var b = document.getElementById("viewGraph");
	var btx = b.getContext("2d");
	btx.moveTo( x, (viewGraphHeight / 2) -y);
	btx.lineTo(m, (viewGraphHeight / 2) -n);
	btx.lineTo(m, (viewGraphHeight / 2) );
	btx.lineTo(x, (viewGraphHeight / 2) );
	btx.lineTo(x, (viewGraphHeight / 2) -y);
	
	btx.closePath();
	btx.lindWidth = 2;
	btx.fillStyle = "green";
	btx.fill();

}

function drawGraph( id )
{
	var s = retriveSTORE();
	
	var i = getIndex( id );
	addPoint( 50, s[0].e_value);
}

function drawEvent()
{
	var s = retriveSTORE();
	var y = s[0].e_value;
	var x = 50;
	addPoint(x, y); 
	
	for(i = 0; i < s[0].e_history.length; i++)
	{
		if( changeEventsList.indexOf(s[0].e_history[i].h_log != -1))
		{
			drawGraphLine(x, y, x + 50, y + s[0].e_history[i].h_val);
			x = x + 50;
			y = y + s[0].e_history[i].h_val;
			addPoint( x, y);
		}
	}
}