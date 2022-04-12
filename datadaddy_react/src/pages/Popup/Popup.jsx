import React from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
// // // // // //
import PopupButton from './Button.js'

const HTMLParser = require('node-html-parser')

const JSSoup = require('jssoup').default;

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

// function to return the url of the current tab
async function getCurrentTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url;
}

var root;
var emails = new Set();
var hyperlinks = new Set();
var emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
var hyperlinksRegex = /^(ftp|http|https):\/\/[^ "]+$/gi;
var deep = 0;
var tabUrl;
var queue = [];

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

scrape();
// // // // //
import PopupButton from './Button.js';
import generateEmail from './GenerateEmail';
import ScrapeButton from './Scraper';
import { domainData } from '../../assets/data/domainMap';

const Popup = () => {
  let emailRecipients = ["privacy@towerdata.com"];
  let emailHref = generateEmail(emailRecipients);

  return (
    <div className="App">
      <header className="App-header">
        <script defer src="./dist/bundle.js" />
        <DataDaddyLogo/>
      </header>

      <body>
        <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
        <PopupButton text="Privacy Policy" disabled={false} href={"https://www.redditinc.com/policies/privacy-policy"}/>
        <PopupButton text="Online Form" disabled={true}/>
        <PopupButton text="Email Request" disabled={false} icon={<SendIcon/>} href={emailHref}/> 
      </body>

      <footer className='App-footer'>
        <ScrapeButton/>
      </footer>
    </div>
  );
};

function DataDaddyLogo() {
  return (
    <p className="Logo-text">
      <text className="App-text-one Gray">datadaddy.</text>
      <text className="App-text-two Blue">CC</text>
      <text className="App-text-two Red">P</text>
      <text className="App-text-two Blue">A</text>
      <SettingsIcon variant="outlined" className="Gray"/>
    </p>
  )
}

function getDomainInfo() {
  for (let item in domainData) {
    console.log(item);
  }
}

export default Popup;