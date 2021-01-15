var text = "";
var heading = "";
var author = "";
var isSeries = false;
var arr=[];
var count = 0;
var counter = 0;
var tags = "";
var btn = document.querySelector(".btn");
btn.addEventListener('click', function() {
    var url = document.querySelector(".urlInput").value;
    console.log(url);
    getText(url);
});
var btn = document.querySelector(".btnCpy");
btn.addEventListener('click', function() {
    var alltext = document.querySelector(".outputWrapper").innerText;    
    copy(alltext);
});

function copy(t) {
	var myTemporaryInputElement = document.createElement("textarea");
myTemporaryInputElement.value = t;
document.body.appendChild(myTemporaryInputElement);
myTemporaryInputElement.select();
document.execCommand("Copy");
document.body.removeChild(myTemporaryInputElement);
alert("Copied!");
}

var output = document.querySelector('.output');
async function getText(url) {
/*
https://cors-anywhere.herokuapp.com/
http://alloworigin.com/get?url=
https://api.allorigins.win/get?
*/	
await fetch('https://secure-ocean-95470.herokuapp.com/'+url).then(function (response) {
	// The API call was successful!	
	return response.text();
}).then(function (html) {
    // This is the HTML from our response as a text string		    
    output.innerHTML=html;
    text += "\n" + document.querySelector('.b-story-body-x').innerText;		
	if(count == 0) {
		heading = document.querySelector('.b-story-header h1').innerText;
		author = "by "+document.querySelector('.b-story-user-y').innerHTML;
		count++;
	}
    if(document.querySelector('.b-pager-next')) {
        var next = document.querySelector('.b-pager-next').href;
		text+="\n____";
        getText(next);
    }        
    else {			
		if((isSeries == false) && (document.querySelector('#b-series .b-s-story-list .frame'))) {			
			isSeries = true;
			document.querySelectorAll('#b-series .b-s-story-list .frame').forEach(f=>{f.querySelectorAll('ul li a').forEach(l=>arr.push(l.href))});
			console.log('Found '+arr.length+' more parts.');			
			for(let i=0;i<arr.length;i++) {			
				console.log('Fetching '+arr[i]);
				document.querySelector('.status').innerText='Fetching '+arr[i];				
				getSingle(arr[i]);
			}
		}		
		else {
			tags = output.querySelector('.b-s-story-tag-list').innerHTML;
			document.querySelector('.status').innerText='';
			arr=[];
			output.innerHTML= '';			
			output.innerText = text;
			document.querySelector('.heading').innerText = heading;
			document.querySelector('.author').innerHTML = author;
			document.querySelector('.tags').innerHTML = tags;
}
    }        
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});  
}

async function getSingle(url) {
	let c=0;
	await fetch('https://secure-ocean-95470.herokuapp.com/'+url).then(function (response) {	
		return response.text();
	}).then(function (html) {    
		var output = document.querySelector('.output');
		output.innerHTML=html;    
		if(c == 0) {			
			text += "\n\n*_*_*\n\n"+document.querySelector('.b-story-header h1').innerText+"\n";				
			c++;
		}
		text += "\n" + document.querySelector('.b-story-body-x').innerText;		
		if(document.querySelector('.b-pager-next')) {
			var next = document.querySelector('.b-pager-next').href;
			text+="\n____";
			getSingle(next);
		}
		else {
			tags += output.querySelector('.b-s-story-tag-list').innerHTML + "<br>";
			document.querySelector('.status').innerText='';
			arr=[];
			output.innerHTML= '';			
			output.innerText = text;
			document.querySelector('.heading').innerText = heading;
			document.querySelector('.author').innerHTML = author;
			document.querySelector('.tags').innerHTML = tags;
}
	});
}
