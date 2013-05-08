var lastTweetSeen = localStorage.getItem("last-tweet-seen");
var styleModified = false;
var childrenNodes;
window.onbeforeunload = handleOnUnload;
window.onload = handleOnUnload;
setTimeout(function() {
	handleOnUnload();
	launch();
}, 6000);

function handleOnUnload() {
	console.log("handle");
	var childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i<childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			localStorage.setItem("last-tweet-seen", childrenNodes[i].getAttribute("data-item-id"));
			lastTweetSeen = localStorage.getItem("last-tweet-seen");
			styleModified = false;
			break;
		}
	}
}

function launch() {
	if(lastTweetSeen != null && !styleModified) {
		var childrenNodes = document.getElementById("stream-items-id").childNodes;
		for(var i=0; i<childrenNodes.length; i++) {
			if(!(childrenNodes[i].nodeName == "#text")) {
				if(childrenNodes[i].getAttribute("data-item-id") == lastTweetSeen) {
					modifyStyleofLastTweetSeen(childrenNodes[i], "#CBE2EE");
					styleModified = true;
					break;
				}
			}	
		}
	}
}

function modifyStyleofLastTweetSeen(lastTweet, color) {
	lastTweet.style.backgroundColor = color;
}

if(!styleModified) {
	document.getElementById("stream-items-id").addEventListener("DOMNodeInserted", function(e) {
		launch();
	}, false);
}