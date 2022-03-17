// background.js

// * * Event Listeners * * //
chrome.runtime.onInstalled.addListener(() => { // todo rm
  let color = '#3aa757';
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onActivated.addListener(() => {
  // console.log('Tab Activated!');
  updateCurrentUrl()
})

chrome.tabs.onUpdated.addListener(() => {
  // console.log('Tab Updated!');
  updateCurrentUrl()
})

// * * Functions * * //
async function updateCurrentUrl() {
  let url = await chrome.tabs.query({active: true, currentWindow: true})
    .then((tabs) => { // get current tab
      if (!tabs.length) return;
      return tabs[0]; // current tab should be first and only in list
    })
    .then(tab => { // extract url from tab
      if (!tab) return;
      return tab.url
    })
  console.log('Current page url set:', url)
  chrome.storage.sync.set({url})
}

