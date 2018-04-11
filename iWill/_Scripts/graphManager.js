const viewGraphHeight = 700;
const viewGraphWidth = 900;


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

function drawGraph( id )
{
	var s = retriveSTORE();
	var i = getIndex( id );
	addPoint( 50, s[i].e_value);
}