import React from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import PopupButton from './Button.js';
import generateEmail from './GenerateEmail';
import ScrapeButton from './Scraper';
import { domainData } from '../../assets/data/domainMap';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "loading...",
    };
  }

  componentDidMount() {
    this.setDebugDefaults();
    this.timerID = setInterval(
      () => this.tick(),
      500
    )
  }

  setDebugDefaults() {
    this.ppHref = "https://www.redditinc.com/policies/privacy-policy";
    this.emailHref = generateEmail(["privacy@towerdata.com"])
  }

  tick() {
    chrome.storage.sync.get('domain', (results) => {
      if (results.domain) {
        this.setState({
          domain: results.domain,
        })
      }
    })
  }

  getDomainInfo() {
    for (let item in domainData) {
      console.log(item);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <script defer src="./dist/bundle.js" />
          <DataDaddyLogo/>
        </header>
  
        <p>You are on {this.state.domain}</p>
        <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
        <PopupButton text="Privacy Policy" href={this.ppHref}/>
        <PopupButton text="Online Form" href={this.onlineFormHref}/>
        <PopupButton text="Email Request" icon={<SendIcon/>} href={this.emailHref}/> 
  
        <footer className='App-footer'>
          <ScrapeButton/>
        </footer>
      </div>
    );
  }
};

const DataDaddyLogo = () => {
  return (
    <p className="Logo-text">
      <span className="App-text-one Gray">datadaddy.</span>
      <span className="App-text-two Blue">CC</span>
      <span className="App-text-two Red">P</span>
      <span className="App-text-two Blue">A</span>
      <SettingsIcon variant="outlined" className="Gray"/>
    </p>
  )
}