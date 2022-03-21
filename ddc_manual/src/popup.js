// popup.js

let urltext = document.getElementById("urltext");
let ppButton = document.getElementById("privacypolicy");
let rtkButton = document.getElementById("requestdata");

// Update popup HTML anytime the current domain changes
chrome.storage.sync.get("domain", ({domain}) => {
    // Default values
    urltext.innerHTML = "You are on: " + domain;
    ppButton.innerHTML = "Privacy Policy Not Found";
    ppButton.removeAttribute("href");
    rtkButton.innerHTML = "Unable to Request Data";
    rtkButton.removeAttribute("href");

    chrome.storage.sync.get("domainJson", ({domainJson}) => {
        for (let item of domainJson) {
            if (item.domain.toLowerCase() == domain.toLowerCase()) {
                if (item.privacy_policy) {
                    ppButton.innerHTML = "Privacy Policy";
                    ppButton.setAttribute("href", item.privacy_policy);
                }
                if (item.rtk_form) {
                    rtkButton.innerHTML = "Request Data";
                    rtkButton.setAttribute("href", item.rtk_form)
                }
                if (item.email) {
                    // do nothing for now
                }
            }
        }
    })
});

ppButton.addEventListener("click", () => {
    let newUrl = ppButton.getAttribute("href");
    if (!newUrl) return; // do nothing
    chrome.tabs.create({url: newUrl});
});

rtkButton.addEventListener("click", () => {
    let newUrl = rtkButton.getAttribute("href");
    if (!newUrl) return; // do nothing
    chrome.tabs.create({url: newUrl});
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

