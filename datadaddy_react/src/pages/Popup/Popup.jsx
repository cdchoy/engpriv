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

async function getCurrentTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url;
}

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: "",
      emailLoading: true,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({emailLoading: true});
    this.update();
    this.updateID = setInterval(() => this.update(), 500);
    this.scrapeID = setTimeout(() => this.setState({emailLoading: false}), 20_000);
  }

  componentWillUnmount() {
    clearInterval(this.updateID);
    clearInterval(this.scrapeID);
  }

  setDefaultState() {
    this.setState({
      domain: "loading...",
      ppHref: "",
      onlineFormHref: "",
      emailHref: "",
      loading: false
    });
  }

  update() {
    chrome.storage.sync.get('domain', (results) => {
      if (!results.domain) {
        this.setDefaultState();
        return;
      }
      this.setState({ domain: results.domain });

      let domainInfo = this.getDomainInfo(results.domain);
      if (domainInfo) { // Domain has been hard-coded
        this.setState({
          ppHref: domainInfo.privacy_policy,
          onlineFormHref: domainInfo.rtk_form,
          emailHref: generateEmail(domainInfo.email),
          emailLoading: false
        });
      } else if (!loading) {
        this.setState({
          ppHref: "",
          onlineFormHref: "",
          emailHref: ""
        })
      } else {
        this.setState({
          emailLoading: true,
          ppHref: "",
          onlineFormHref: "",
        });
      }
    });

    if (this.state.emailLoading) {
      let recipients = scrapeEmails();
      console.log("obtained recipients:", recipients);
      this.setState({
        emailHref: generateEmail(recipients), 
        // emailLoading: false
      })
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
  }

  scraperMail(button) {
    button.setState( loading );
    console.log("in scrapermail");
    // e.setState( {loading} );
    // console.log("logging email button" + e);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <script defer src="./dist/bundle.js" />
          <DataDaddyLogo />
        </header>

        {/* {this.state.domain} */}
        {/* <p className="Gray"><span className="Red">{this.state.domain}</span></p> */}
        <TextField size="large" id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} onChange={this.handleChange}/>
        <PopupButton text="Privacy Policy" href={this.state.ppHref}/>
        <PopupButton text="Online Form" href={this.state.onlineFormHref}/>
        <PopupButton variant="contained" text="Email Request" href={this.state.emailHref} icon={<SendIcon/>} loading={this.state.emailLoading} onClick={this.scraperMail, this.state.loading = {loading: true}}/>
  
        <footer className='App-footer'>
        </footer>
      </div>
    );
  }
};

const DataDaddyLogo = () => {
  function gotoOptions() {
    window.open(chrome.runtime.getURL('options.html'));
  }
  return (
    <p className="Logo-text" onClick={() => gotoOptions()}>
      <span className="App-text-one Gray">datadaddy.</span>
      <span className="App-text-two Blue">CC</span>
      <span className="App-text-two Red">P</span>
      <span className="App-text-two Blue">A</span>
      <SettingsIcon variant="outlined" className="Gray" />
    </p>
  )
}