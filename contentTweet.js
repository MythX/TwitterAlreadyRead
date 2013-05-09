var lastTweet = localStorage.getItem("last-tweet");
var lastTweetSeen = localStorage.getItem("last-tweet");
var styleModified = false;
var childrenNodes;

// Lors du chargement de la page
window.onload = launch;

// Lors de la fermeture de l'onglet
window.onbeforeUnload = handleUnload;

setTimeout(function() {
	handleUnload();
}, 6000);


function handleUnload() {
	console.log("Entre handleUnload");
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			console.log("Update lastTweet");
			localStorage.setItem("last-tweet", childrenNodes[i].getAttribute("data-item-id"));
			console.log(localStorage.getItem("last-tweet"));
			break;
		}
	}
	console.log("Fin handleUnload");
}

// Mise a jour du dernier tweet
function updateLastTweet() {
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute('data-item-id') != lastTweet) { // si le 1er tweet est différent
				console.log("updateLastTweet");
				console.log("lastTweet before " + lastTweet);
				resetColorLastTweetSeen();
				lastTweetSeen = lastTweet;
				lastTweet = childrenNodes[i].getAttribute('data-item-id');
				console.log("lastTweet " + lastTweet);
				console.log("lastTweetSeen " + lastTweetSeen);
				modifyStyleofLastTweetSeen(childrenNodes[i], '#FFFFFF');
				styleModified = true;
				break;
			}
			else 
			{
				styleModified = false;
			}
		}
	}
}

// Mise a jour du dernier tweet vu
function updateLastTweetSeen() {
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute('data-item-id') == lastTweetSeen) {
				modifyStyleofLastTweetSeen(childrenNodes[i], '#CBE2EE');
				break;
			}
		}
		else 
		{
			styleModified = false;
		}
	}
}

function resetColorLastTweetSeen() {
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute('data-item-id') == lastTweetSeen) {
				modifyStyleofLastTweetSeen(childrenNodes[i], '#FFFFFF');
				break;
			}
		}
	}
}

// Fonction executer au chargement
function launch() {
	updateLastTweetSeen();
}

// Modification du background du Tweet
function modifyStyleofLastTweetSeen(lastTweet, color) {
	lastTweet.style.backgroundColor = color;
}

// Ecoute du listener DOMNodeInserted
document.getElementById("stream-items-id").addEventListener("DOMNodeInserted", function(e) {

	if(!styleModified) {
		console.log(styleModified);
		if(childrenNodes[0].nodeName != "#text") {
			if(childrenNodes[0].getAttribute('data-item-id') != lastTweet) {
				console.log("lastTweet changed");
				updateLastTweet();
				updateLastTweetSeen();
				styleModified = false;
			}
		} else if(childrenNodes[1].nodeName != "#text") {
			if(childrenNodes[1].getAttribute('data-item-id') != lastTweet) {
				console.log("lastTweet changed");	
				updateLastTweet();
				updateLastTweetSeen();
				styleModified = false;
			}	
		}
	}
}, false);