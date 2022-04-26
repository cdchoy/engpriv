import React, { useRef } from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import PopupButton from './PopupButton.js';
import generateEmail from './GenerateEmail';
import ScrapeButton, { scrapeEmails } from './Scraper';
import domainData from '../../assets/data/domainMap.json';
import EmailButton from './EmailButton';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: "",
      emailLoading: true
    };
  }

  componentDidMount() {
    this.update();    
    this.updateID = setInterval(() => this.update(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.updateID);
  }

  setDefaultState() {
    this.setState({
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: "",
      emailLoading: true
    });
  }

  update() {
    chrome.storage.sync.get('domain', (results) => {
      if (!results.domain) {
        this.setDefaultState();
        return;
      }
      this.setState({domain: results.domain});

      let domainInfo = this.getDomainInfo(results.domain);
      if (domainInfo) {
        this.setState({
          ppHref: domainInfo.privacy_policy,
          onlineFormHref: domainInfo.rtk_form,
          emailHref: generateEmail(domainInfo.email),
          emailLoading: false
        });
      } else {
        this.setState({
          ppHref: "",
          onlineFormHref: "",
          emailHref: ""
        });
      }
    });

    if (this.state.emailLoading) {
      let recipients = scrapeEmails();
      this.setState({emailHref: generateEmail(recipients)})
    }
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

  handleChange(e) {
    let senderName = e.target.value;
    console.log("NAME:", senderName);
    chrome.storage.sync.set({senderName});
    // this.setState({sender: value});  //todo: this doesn't work
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <script defer src="./dist/bundle.js" />
          <DataDaddyLogo/>
        </header>
  
        {/* {this.state.domain} */}
        <p className="Gray"><span className="Red">{this.state.domain}</span></p>
        <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} onChange={this.handleChange}/>
        <PopupButton text="Privacy Policy" href={this.state.ppHref}/>
        <PopupButton text="Online Form" href={this.state.onlineFormHref}/>
        <PopupButton text="Email Request" icon={<SendIcon/>} href={this.state.emailHref} loading={this.state.emailLoading}/> 
  
        <footer className='App-footer'>
          <ScrapeButton/>
        </footer>
      </div>
    );
  }
};

const DataDaddyLogo = () => {
  function gotoOptions() {
    console.log("poop");
    window.open(chrome.runtime.getURL('options.html'));
  }
  return (
    <p className="Logo-text" onClick={() => gotoOptions()}>
      <span className="App-text-one Gray">datadaddy.</span>
      <span className="App-text-two Blue">CC</span>
      <span className="App-text-two Red">P</span>
      <span className="App-text-two Blue">A</span>
      <SettingsIcon variant="outlined" className="Gray"/>
    </p>
  )
}