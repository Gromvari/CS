

const express =		require('express');
const bodyParser = 	require('body-parser');
const fs = 			require('fs');
const readLine =	require('readline');
//const jsonfile =	require('jsonfile');

const saveName = 'schedule.txt';


var s = new Array();

const app = express();
const textParser = bodyParser.text();
//const jsonParser = bodyParser.json();



app.post('/', textParser, function (req, res) {
	
	console.log("Server contacted ");
	
	
	var wrt = req.body + "\r\n";
	var r = proccessBody( wrt );
	
	// res.writeHead(200, {'Content-Type': 'text/plain'});
	// res.write(r);
	// res.end();
	
	
	
});

app.get('/', textParser, (req, res) => {
	console.log("Server contacted via GET");
	res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
	res.write(JSON.stringify(s));
	res.end();
});

const server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	if(host === "::") host = "localHost";
	
	console.log("Server listening at http://%s:%s", host, port);
	
	readSave();

});

function readSave()
{
	fs.readFile(saveName, 'utf8',(err, data) => {   
		if(err) throw err;
		s = JSON.parse(data);
		   console.log("save loaded from file");
	});
	
}

function proccessBody( r )
{
	 var i = r.indexOf('|') + 1;
	 var h = r.substring(0, i);
	   console.log("Request: " + h);
	   
	if(h == "Ping|")
		return "ping has been processed";
	
	var b = r.substring(i);
	if( h == "Created|")
	{
		s.push(JSON.parse(b));
		 
		fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
		});
		return "event processed";
	}
	 if( h == "Updated|")
	 {
		 bJSON = JSON.parse(b);
		 
		 var index = findID(bJSON.e_id);
		 s[index] = bJSON;
		 
		 fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
		});
		 return "event processed";
	 }
	if( h == "Deleted|")
	{
		bJSON = JSON.parse(b);
		
		var index = findID(bJSON.e_id);
		if(index != -1){
			s.splice(index, 1); 
			 
			fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
			});
		}
		return "event processed";
	}
	return "no match";
}
	 
	 
//{ Helper Functions
function findID(id)
{
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id)
			return i;
	}
	return -1;
}
