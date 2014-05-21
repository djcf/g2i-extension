enabled = true;
/** GOOGLE **/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
		if (enabled) {
			uri = URI(details.url);
			if(uri.domain().substr(0,6)=="google") {
				query = uri.search(true);
				search_terms = query.q;
				ixquick_url = "https://ixquick.com/do/search?query=" + search_terms + "&cat=web";
				chrome.browserAction.setBadgeText({text: "OK"});
				return {
					redirectUrl: ixquick_url
				};
			}
		}
	}, {
		urls: [
			"http://*/search?*",
			"https://*/search?*",
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
		chrome.browserAction.setIcon({path:"icons/g2i-disabled.png"});
		chrome.browserAction.setTitle({ "title": "Enable Google2Ixquick"});
	} else {
		enabled = true;
		chrome.browserAction.setIcon({path:"icons/g2i-19.png"});
		chrome.browserAction.setTitle({ "title": "Disable Google2Ixquick"});
	}
});