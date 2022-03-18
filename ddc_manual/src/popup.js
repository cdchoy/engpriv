// popup.js

let urltext = document.getElementById("urltext");
let ppButton = document.getElementById("privacypolicy");
let rtkButton = document.getElementById("requestdata");

// Update popup info anytime the active tab changes
chrome.storage.sync.get("domain", ({domain}) => {
    urltext.innerHTML = "You are on: " + domain

    chrome.storage.sync.get("domainJson", ({domainJson}) => {
        for (let item of domainJson) {
            if (item.domain.toLowerCase() == domain.toLowerCase()) {
                ppButton.innerHTML = "Privacy Policy"
                rtkButton.innerHTML = "Request Data"
                break;
            } else {
                ppButton.innerHTML = "Privacy Policy Not Found"
                rtkButton.innerHTML = "Unable to Request Data"
            }
        }
    })
});




// * * Chrome Button Sample Code. todo rm * * //
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor"); 

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });

    console.log('Click!')
});
  
// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

