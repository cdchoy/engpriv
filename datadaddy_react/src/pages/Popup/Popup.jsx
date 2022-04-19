import React from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import PopupButton from './Button.js';
import generateEmail from './GenerateEmail';
import ScrapeButton from './Scraper';
import domainData from '../../assets/data/domainMap.json';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: ""
    };
  }

  componentDidMount() {
    // this.setDebugDefaults();
    this.update();    
    this.updateID = setInterval(() => this.update(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateID);
  }

  setDefaultState() {
    this.setState({
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: ""
    });
  }

  setDebugDefaults() {
    this.ppHref = "https://www.redditinc.com/policies/privacy-policy";
    this.emailHref = generateEmail(["privacy@towerdata.com"]);
  }

  update() {
    this.setDefaultState();
    chrome.storage.sync.get('domain', (results) => {
      if (!results.domain) return;
      this.setState({domain: results.domain});

      let domainInfo = this.getDomainInfo(results.domain);
      if (domainInfo) {
        this.setState({
          ppHref: domainInfo.privacy_policy,
          onlineFormHref: domainInfo.rtk_form,
          emailHref: generateEmail(domainInfo.email)
        });
      }
    });
  }

  getDomainInfo(domainString) {
    if (!domainString) return null;
    for (var i = 0; i < domainData.length; i++) {
      let item = domainData[i];
      if (domainString.toLowerCase() === item.domain.toLowerCase()) {
        return item;
      }
    }
    return null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <script defer src="./dist/bundle.js" />
          <DataDaddyLogo/>
        </header>
  
        <p>You are on {this.state.domain}</p>
        {/* <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} /> */}
        <PopupButton text="Privacy Policy" href={this.state.ppHref}/>
        <PopupButton text="Online Form" href={this.state.onlineFormHref}/>
        <PopupButton text="Email Request" icon={<SendIcon/>} href={this.state.emailHref}/> 
  
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