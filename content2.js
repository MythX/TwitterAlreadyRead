var lastTweetSeen = localStorage.getItem("last-tweet-seen");
var lastTweet = localStorage.getItem("last-tweet");
var styleModified = false;
var childrenNodes;
window.onbeforeunload = handleOnUnload; // Au dechargement de la page
window.onload = updateLastTweet; // Au chargement de la page

// Update value of LastTweet
function updateLastTweet() {
	console.log("last-tweet");
	var childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i<childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute("data-item-id") == lastTweet) {
				localStorage.setItem("last-tweet", childrenNodes[i].getAttribute("data-item-id"));
				modifyStyleofLastTweetSeen(childrenNodes[i], "#FFFFFF");
				styleModified = true;
				break;
			}
		}
	}
}

// Update value of LastTweetSeen
function updateLastTweetSeen() {
	console.log("last-tweet-seen");
	var childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i<childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute("data-item-id") == lastTweetSeen) {
				localStorage.setItem("last-tweet-seen", childrenNodes[i].getAttribute("data-item-id"));
				modifyStyleofLastTweetSeen(childrenNodes[i], "#CBE2EE");
				styleModified = true;
				break;
			}
		}
	}
}

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
				if(childrenNodes[i].getAttribute("data-item-id") == lastTweet) {
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

document.getElementById("stream-items-id").addEventListener("DOMNodeInserted", function(e) {
	lastTweetSeen = localStorage.getItem("last-tweet");
	updateLastTweetSeen();
	updateLastTweet();

}, false);