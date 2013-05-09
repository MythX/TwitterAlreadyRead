var lastTweet = localStorage.getItem("last-tweet");
var lastTweetSeen = lastTweet;
var styleModified = false;
var childrenNodes;
var color = localStorage.getItem("color-tweet");

console.log("color : " + color);

// Lors du chargement de la page
window.onload = launch;

// Lors de la fermeture de l'onglet
window.onbeforeunload = handleUnload;

setTimeout(function() {
	handleUnload();
}, 6000);


// Sauvegarde du dernier tweet vu avant la fermeture
function handleUnload() {
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			localStorage.setItem("last-tweet", childrenNodes[i].getAttribute("data-item-id"));
			break;
		}
	}
}

// Mise a jour du dernier tweet
function updateLastTweet() {
	childrenNodes = document.getElementById("stream-items-id").childNodes;
	for(var i=0; i < childrenNodes.length; i++) {
		if(!(childrenNodes[i].nodeName == "#text")) {
			if(childrenNodes[i].getAttribute('data-item-id') != lastTweet) { // si le 1er tweet est différent
				resetColorLastTweetSeen();
				lastTweetSeen = lastTweet;
				lastTweet = childrenNodes[i].getAttribute('data-item-id');
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
				modifyStyleofLastTweetSeen(childrenNodes[i], localStorage.getItem("color-tweet"));
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
		color = localStorage.getItem("color-tweet");
		if(childrenNodes[0].nodeName != "#text") {
			if(childrenNodes[0].getAttribute('data-item-id') != lastTweet) {
				updateLastTweet();
				updateLastTweetSeen();
				styleModified = false;
			}
		} else if(childrenNodes[1].nodeName != "#text") {
			if(childrenNodes[1].getAttribute('data-item-id') != lastTweet) {
				updateLastTweet();
				updateLastTweetSeen();
				styleModified = false;
			}	
		}
	}
}, false);