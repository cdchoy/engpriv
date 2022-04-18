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
  let ppHref;
  let onlineFormHref;
  let emailHref;

  ppHref = "https://www.redditinc.com/policies/privacy-policy";
  emailHref = generateEmail(["privacy@towerdata.com"]);
  
  return (
    <div className="App">
      <header className="App-header">
        <script defer src="./dist/bundle.js" />
        <DataDaddyLogo/>
      </header>

      <p>You are on {window.location.hostname}</p>
      <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
      <PopupButton text="Privacy Policy" href={ppHref}/>
      <PopupButton text="Online Form" href={onlineFormHref}/>
      <PopupButton text="Email Request" icon={<SendIcon/>} href={emailHref}/> 

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

const getDomain = () => {
	chrome.storage.sync.get('domain', (results) => {
		if (results.domain) {
			this.setState({
				domain: results.domain,
			})
		}
	})
}

export default Popup;