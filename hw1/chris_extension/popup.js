// Display a popup when this page is loaded.
chrome.browserAction.onLoaded.addListener(
    function(tab) {
        chrome.browserAction.setPopup({

            popup: "popup-window.html"
            
        });
    }
)