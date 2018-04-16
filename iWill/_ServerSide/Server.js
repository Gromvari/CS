

const express =		require('express');
const bodyParser = 	require('body-parser');
const fs = 			require('fs');

const saveName = 'schedule.txt';
var s = new Array();

const app = express();
const textParser = bodyParser.text();
//const jsonParser = bodyParser.json();

app.post('/', textParser, function (req, res) {
	
	console.log("Server contacted ");
	
	
	var wrt = req.body + "\r\n";
	proccessBody( wrt );

	
	
	
})

const server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	if(host === "::") host = "localHost";
	
	console.log("Server listening at http://%s:%s", host, port);
	
	
});

function proccessBody( r )
{
	 var i = r.indexOf('|') + 1;
	 var h = r.substring(0, i);
	   console.log("Request: " + h);
	 var b = r.substring(i);
	 
	 if( h == "Created|")
	 {
		 s.push(JSON.parse(b));
		 
		 fs.appendFile(saveName, b, function (err) {
			if(err) throw err;
			console.log(saveName + ' updated');
		 });
	 }
	 if( h == "Updated|")
	 {
		 bJSON = JSON.parse(b);
		 var index = findID(bJSON.e_id);
		 
		 
	 }
	 if( h == "Deleted|")
	 {
		 bJSON = JSON.parse(b);
		 var index = findID(bJSON.e_id);
		 if(index != -1)
		 {
			 s.splice(index, 1); //??
		 }
	 }
	 
	 
}

function findID( id)
{
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id)
			return i;
	}
	return -1;
}
