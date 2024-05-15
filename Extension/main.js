// this is so scuffed
function getButtonOnClick(alanguage){
	return "(" + function(button, lang){
		let text = button.parentElement.parentElement.parentElement.parentElement.querySelector("#expander>#content>#content-text>span").innerHTML;
		text = text.replace(/<.+?>/g,"") // remove emojis
		console.log(text);
		let api_url = "http://127.0.0.1:5000/sentiment?text=" + text;
		fetch(api_url).then(response => {
			if(!response.ok){
				throw new Error('No response.');
			}
			return response.json();
		}).then(data => {
			console.log(data[0].label);
			if(data[0].label == "LABEL_0"){
				button.innerHTML = "🙂"
			}else if(data[0].label == "LABEL_1"){
				button.innerHTML = "😶"
			}else{
				button.innerHTML = "🙁"
			}
		});
		// let api_url2 = "http://127.0.0.1:5000/translation_" + lang + "?text=" + text;
		let api_url2 = "http://127.0.0.1:5000/translation?text=" + text;
		fetch(api_url2).then(response => {
			if(!response.ok){
				throw new Error('No response.');
			}
			return response.json();
		}).then(data => {
			console.log(data[0]);
			button.parentElement.parentElement.parentElement.parentElement.querySelector("#expander>#content>#content-text>span").innerHTML = data[0].translation_text;
		});
	} + ")(this, \"" + alanguage + "\");";
}
function addButton(commentNode){
	let header = commentNode.querySelector("#body>#main>#action-buttons>#toolbar");
	let newElement = `
	<div id="tl_div" style="margin-right: auto; margin-left: 10px;">
		<button class="tl_button" class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-xs"> translate </button>
	</div>
	`;

	header.insertAdjacentHTML("beforeend", newElement);
	button = header.querySelector("#tl_div>.tl_button");
	button.setAttribute("onclick", getButtonOnClick("ja"));
}
function updateAllButtons(lang){
	let buttons = document.getElementsByClassName("tl_button");
	for(let button of buttons){
		button.setAttribute("onclick", getButtonOnClick(lang))
	}
}

browser.runtime.onMessage.addListener((request) => {
  console.log(request.language);
  updateAllButtons(request.language)
  return Promise.resolve({ response: "ok" });
});

// ok how do observers work

let testObserver = new MutationObserver((e => {
	for(let m of e){
		if(m.target.id == "contents"){
			for(let n of m.addedNodes){
				// console.log(n.nodeName);
				if(n.nodeName == "YTD-COMMENT-THREAD-RENDERER"){
					addButton(n.querySelector("#comment"));
				}else if(n.nodeName == "YTD-COMMENT-RENDERER"){
					addButton(n);
				}
			}
		}
	}
}));

testObserver.observe(document, {subtree: true, childList: true})

// ok these arent that bad (yet)