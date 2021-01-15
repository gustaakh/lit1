var text = "";
var heading = "";
var author = "";
var isSeries = false;
var arr=[];
var btn = document.querySelector(".btn");
btn.addEventListener('click', function() {
    var url = document.querySelector(".urlInput").value;
    console.log(url);
    getText(url);
});

async function getText(url) {
/*
https://cors-anywhere.herokuapp.com/
http://alloworigin.com/get?url=
https://api.allorigins.win/get?
*/	
await fetch(url).then(function (response) {
	// The API call was successful!	
	return response.text();
}).then(function (html) {
    // This is the HTML from our response as a text string	
	console.log(html);
    var output = document.querySelector('.output');
    output.innerHTML=html;
    text += "\n" + document.querySelector('.b-story-body-x').innerText;	
	var count = 0;
	if(count == 0) {
		heading = document.querySelector('.b-story-header h1').innerText;
		author = document.querySelector('.b-story-user-y').innerHTML;
		count++;
	}
    if(document.querySelector('.b-pager-next')) {
        var next = document.querySelector('.b-pager-next').href;
		text+="\n____";
        getText(next);
    }        
    else {		
		if(document.querySelector('#b-series .b-s-story-list .frame')) {
			isSeries = true;
			document.querySelectorAll('#b-series .b-s-story-list .frame').forEach(f=>{f.querySelectorAll('ul li a').forEach(l=>arr.push(l.href))});
			console.log('Found '+arr.length+' more parts.');
			arr.forEach(l=>{
				console.log('Fetching '+l);
				document.querySelector('.status').innerText='Fetching '+l;
				text+="\n\n*_*_*";
				getText(l);
				});
		}
		else {
			var tags = document.querySelector('.b-s-story-tag-list').innerHTML;
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