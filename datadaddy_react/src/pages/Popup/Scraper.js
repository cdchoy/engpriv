import React from "react";
import MuiButton from '@mui/material/Button';

const HTMLParser = require('node-html-parser')
const JSSoup = require('jssoup').default;

// Add this in your component file
require('react-dom');
window.React2 = require('react');
// console.log(window.React1 === window.React2);

let emails = new Set();
let hyperlinks = new Set();
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const hyperlinksRegex = /^(ftp|http|https):\/\/[^ "]+$/gi;
let queue = [];

// function to return the url of the current tab
async function getCurrentTabUrl() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
  }
  
async function scrape() {
  extractDataBFS();
}

async function extractDataBFS() {
  const url = await getCurrentTabUrl();
  var depth = 0;
  queue.push(url);
  while (queue.length > 0) {

    var levelSize = queue.length;

    for (var lvl = 0; lvl < levelSize; lvl++) {
      var currLink = queue[0];      
      queue.shift();
      var rootBfs = await fetch(`${currLink}`)
        .then(resBfs => resBfs.text())
        .then(bodyBfs => HTMLParser.parse(bodyBfs));
      const soupBfs = new JSSoup(rootBfs);
      var linksBfs = soupBfs.findAll('a');
      for (let i in linksBfs) {
        if (linksBfs[i].attrs.href !== undefined) {
          // Email Regex
          let mailAddr = linksBfs[i].attrs.href.match(emailRegex);
          if (mailAddr != null) {
            if (emails.has(mailAddr) === false) {
              emails.add(mailAddr);
            }
          }

          // Hyperlinks Regex
          let linkAddr = linksBfs[i].attrs.href.match(hyperlinksRegex);
          if (linkAddr != null) {
            if (hyperlinks.has(linkAddr) === false) {
              queue.push(linkAddr);
              hyperlinks.add(linkAddr);
            }
          }
        }
      }
    }
    depth++;
    console.log(hyperlinks);
    if (depth > 2 || emails.size > 10 || hyperlinks.size > 100) {
      console.log(hyperlinks);
      console.log(emails);
      return;
    }
  }
}

const ScrapeButton = () => {
  return <MuiButton variant="contained" onClick={() => scrape()} sx={{ width: 250, height: 50, alignContent: 'flex-start', mt: 1 }}>Scrape</MuiButton>
}

export default ScrapeButton;