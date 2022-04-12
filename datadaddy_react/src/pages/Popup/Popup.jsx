import React from 'react';
import logo from '../../assets/img/logo.svg';
import datadaddy from '../../assets/img/DataDaddyLogo.png';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import TextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { getElementById } from 'domutils';
import Tautologistics from 'htmlparser';
import { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
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

const Popup = () => {

  

  // ...
  // I HAVE NO IDEA IF THIS CODE IS NECESSARY...
  // SEEMS TO FUNCTION WHEN I COMMENT IT OUT?...
  // CAN'T REMEMBER WHAT I WAS DOING WITH IT...
  // LOOKS UI RELATED?...
  //
  // ¯\_(ツ)_/¯
  //
  // ...
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

  return (
    <div className="App">
      <header className="App-header">
        <script defer src="./dist/bundle.js" />

        {/* Logo, DataDaddyCCPA */}
        <p className="Logo-text">
          <text className="App-text-one Gray">datadaddy.</text>
          <text className="App-text-two Blue">CC</text>
          <text className="App-text-two Red">P</text>
          <text className="App-text-two Blue">A</text>
          <SettingsIcon variant="outlined" className="Gray"/>
        </p>
        
      </header>
      <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
      <PopupButton text="Privacy Policy" disabled={false} href={"https://www.redditinc.com/policies/privacy-policy"}/>
      <PopupButton text="Online Form" disabled={true}/>
      <PopupButton text="Email Request" disabled={false} icon={<SendIcon/>}/> 
      {/* <MuiButton variant="outlined" onClick={generateEmail} endIcon={<SendIcon/>} sx={{ width: 250, height: 56, mt: 2 }}>OPEN EMAIL IN NEW TAB</MuiButton> */}

      <footer className='App-footer'>
        <MuiButton variant="contained" onClick={scrape} sx={{ width: 250, height: 50, alignContent: 'flex-start', mt: 1 }}>Scrape</MuiButton>
      </footer>
    </div>
  );
};

export default Popup;