enabled = true;

/** GOOGLE **/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
		if (enabled) {
			query = URI(details.url).search(true);
			search_terms = query.q;
			url = "https://ixquick.com/do/search?query=" + search_terms + "&cat=web";
			chrome.browserAction.setBadgeText({text: "OK"});
			return {
				redirectUrl: url
			};
		}
	}, {
		urls: [
			"*://www.google.com/search?*",
			"*://google.com/search?*",
			"*://encrypted.google.com/search?*",
		],
		types: ["main_frame"]
	}, 
	["blocking"]
);

/** Remove the browseraction badge text if the tab changes **/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.browserAction.setBadgeText({text: ""});
});

/** Allow the extension to be toggled at will **/
chrome.browserAction.onClicked.addListener(function() {
	if (enabled) {
		enabled = false;
		alert("g2i disabled");
	} else {
		enabled = true;
		alert("g2i enabled");
	}
});