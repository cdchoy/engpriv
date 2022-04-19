// background.js
const psl = require('psl');

// * * Event Listeners * * //
chrome.runtime.onInstalled.addListener(() => { 
    console.log('Extension installed!');
});

chrome.tabs.onActivated.addListener(updateCurrentDomain); // user changes tabs
chrome.tabs.onUpdated.addListener(updateCurrentDomain); // user changes url on tab
chrome.windows.onFocusChanged.addListener(updateCurrentDomain) // user changes windows

// * * Functions * * //
async function getCurrentDomain() {
  return await chrome.tabs.query({active: true, currentWindow: true})
    .then((tabs) => { // get current tab
      if (!tabs.length) return;
      return tabs[0]; // current tab should be first and only in list
    })
    .then(tab => { // extract url hostname from tab
      if (!tab) return;
      if (!tab.url) return;
      let url = (new URL(tab.url));
      return url.hostname;
    })
    .then(hostname => { //remove subdomains
      if (!hostname) return;
      let parsed = psl.parse(hostname);
      return (parsed.domain ? parsed.domain : hostname);
    })
}

async function updateCurrentDomain() {
  let domain = await getCurrentDomain();
  console.log('Current domain set:', domain)
  chrome.storage.sync.set({domain})
}
