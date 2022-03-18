// background.js


// * * Event Listeners * * //
chrome.runtime.onInstalled.addListener(() => { 
  let color = '#3aa757'; // todo rm
  chrome.storage.sync.set({ color }); // todo rm
  console.log('Extension installed!');

  fetch("../static/text/domain-map.json")
    .then(response => {
      return response.json();
    })
    .then(domainJson => {
      console.log("JSON loaded: ", domainJson);
      chrome.storage.sync.set({domainJson})
    });
});

chrome.tabs.onActivated.addListener(() => {
  // console.log('Tab Activated!');
  updateCurrentDomain()
})

chrome.tabs.onUpdated.addListener(() => {
  // console.log('Tab Updated!');
  updateCurrentDomain()
})

// * * Functions * * //
async function getCurrentUrl() {
  return await chrome.tabs.query({active: true, currentWindow: true})
    .then((tabs) => { // get current tab
      if (!tabs.length) return;
      return tabs[0]; // current tab should be first and only in list
    })
    .then(tab => { // extract url from tab
      if (!tab) return;
      return tab.url
    })
}

async function updateCurrentDomain() {
  let domain = await getCurrentUrl() 
    .then(url => { // extract domain (aka host) from url
      if (!url) return;
      let domain = (new URL(url));
      return domain.hostname.replace('www.','');
    })
  // console.log('Current domain set:', domain)
  chrome.storage.sync.set({domain})
}