var lastTweet = localStorage.getItem("last-tweet");
var lastTweetSeen = lastTweet;
var styleModified = false;
var childrenNodes;
var colorTweet;

chrome.storage.sync.get('color-tweet', function(result) {
    // Notify that we saved.
    colorTweet = result['color-tweet'];
    console.log('Settings saved ' + colorTweet);
 });

// Lors du chargement de la page
window.onload = launch;

// Lors de la fermeture de l'onglet
window.onbeforeunload = handleUnload;

setTimeout(function() {
	handleUnload();
}, 2000);


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
				localStorage.setItem("last-tweet", lastTweet);
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
				modifyStyleofLastTweetSeen(childrenNodes[i], colorTweet);
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
	console.log("color " + color);
	lastTweet.style.backgroundColor = color;
}

// Ecoute du listener DOMNodeInserted
document.getElementById("stream-items-id").addEventListener("DOMNodeInserted", function(e) {

	if(!styleModified) {
		childrenNodes = childrenNodes = document.getElementById("stream-items-id").childNodes;
		for(var i=0; i < childrenNodes.length; i++) {
			if(childrenNodes[i].nodeName != "#text") {
				if(childrenNodes[i].getAttribute('data-item-id') == lastTweet) {
					break;
				} else if(childrenNodes[i].getAttribute('data-item-id') == lastTweetSeen) {
					updateLastTweetSeen();
					break;
				} else {
					console.log("lastTweet changed");	
					updateLastTweet();
					updateLastTweetSeen();
					styleModified = false;
					break;
				}
			}
		}
	}
}, false);