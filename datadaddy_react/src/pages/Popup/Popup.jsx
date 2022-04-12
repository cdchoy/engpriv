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

let root;
var emails = [];
var hyperlinks = [];
var emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
var hyperlinksRegex = /^(ftp|http|https):\/\/[^ "]+$/gi;
var deep = 0;
const url = 'https://docs.github.com/en/github/site-policy/github-privacy-statement';

async function scrape() {

  fetch(`${url}`)
    .then(res => res.text())
    .then(body => root = HTMLParser.parse(body))
    .then(() => extractData(root, deep))

  function extractData(root, depth) {
    if (depth === 1) { return }
    if (depth > 3) { return }
    const soup = new JSSoup(root);
    var links = soup.findAll('a');

    for (let i in links) {
      if (links[i].attrs.href !== undefined) {
        // Email Regex
        if (links[i].attrs.href.match(emailRegex) !== null) {
          emails.push(links[i].attrs.href.match(emailRegex));
        }
        // Hyperlinks Regex
        if (links[i].attrs.href.match(hyperlinksRegex) !== null) {
          hyperlinks.push(links[i].attrs.href.match(hyperlinksRegex));
        }
      }
    }

    for (let i in hyperlinks) {
      var newRoot;
      fetch(`${hyperlinks[i]}`)
        .then(newRes => newRes.text())
        .then(newBody => newRoot = HTMLParser.parse(newBody))
        .then(() => extractData(newRoot, depth + 1))

      var newSoup = new JSSoup(newRoot);
      var newLinks = newSoup.findAll('a');

      for (let i in newLinks) {
        if (newLinks[i].attrs.href !== undefined) {
          // Email Regex
          if (newLinks[i].attrs.href.match(emailRegex) !== null) {
            emails.push(links[i].attrs.href.match(emailRegex));
          }
          // Hyperlinks Regex
          if (newLinks[i].attrs.href.match(hyperlinksRegex) !== null) {
            hyperlinks.push(links[i].attrs.href.match(hyperlinksRegex));
          }
        }
      }
    }
    console.log(emails);
    console.log(hyperlinks);
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

