import React from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
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