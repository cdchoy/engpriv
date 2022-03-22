// content-script.js

// chrome.tabs.query({active: true, currentWindow: true})
//     .then((tabs) => { // get current tab
//         if (!tabs.length) return;
//         return tabs[0]; // current tab should be first and only in list
//     })
//     .then(tab => { // extract url from tab
//         if (!tab) return;
//         return tab.url
//     })
//     .then(url => {
//         if (!url) return;
//         let domain = (new URL(url));
//         let parsed = psl.parse(domain.hostname);
//         console.log(parsed);
//     })

console.log("location:", location.href);
let fullDomain = (new URL(location.href));
let parsed = psl.parse(fullDomain.hostname);
let domain = parsed.domain;
console.log("parsed", domain);

chrome.storage.sync.set({domain})