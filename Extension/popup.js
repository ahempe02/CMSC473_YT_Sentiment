
function sendLanguageChangeToTabs(tabs){
	let lang = document.getElementById("lang").value
	console.log("hi3")
	for (const tab of tabs) {
		browser.tabs.sendMessage(tab.id, { language: lang })
	}
}

window.onload = function(){
	console.log("hi")
	document.getElementById("lang").addEventListener("change", (event) => {
		console.log("hi2")
		browser.tabs.query({
		  currentWindow: true,
		  active: true
		}).then(sendLanguageChangeToTabs);
	});
}