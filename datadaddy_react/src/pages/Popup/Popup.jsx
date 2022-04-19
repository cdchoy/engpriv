import React from 'react';
import './Popup.css';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import PopupButton from './PopupButton.js';
import generateEmail from './GenerateEmail';
import ScrapeButton from './Scraper';
import domainData from '../../assets/data/domainMap.json';
import { height } from '@mui/system';

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
    this.update();    
    this.updateID = setInterval(() => this.update(), 3_000);
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
          emailHref: generateEmail(domainInfo.email)
        });
      } else {
        this.setState({
          ppHref: "",
          onlineFormHref: "",
          emailHref: ""
        });
      }
<<<<<<< HEAD
    }
    console.log(emails);
    console.log(hyperlinks);
  }
}

scrape();

// let urltext = document.getElementById("urltext");
// let ppButton = document.getElementById("privacypolicy");
// let rtkButton = document.getElementById("onlineform");
// let emailButton = document.getElementById("emailrequest");
// let optionsIcon = document.getElementById("options-icon");

// // Update popup HTML anytime the current domain changes
// chrome.storage.sync.get("domain", ({domain}) => {
//     // Default values
//     urltext.innerHTML = "You are on: " + domain;
//     ppButton.innerHTML = "Privacy Policy Not Found";
//     ppButton.removeAttribute("href");
//     ppButton.className = "buttonRed";
//     rtkButton.innerHTML = "CCPA Online Form Not Found";
//     rtkButton.removeAttribute("href");
//     rtkButton.className = "buttonRed";
//     emailButton.innerHTML = "CCPA Contact Email Unknown";
//     emailButton.removeAttribute("emailto");
//     emailButton.className = "buttonRed";

//     if (!domain) return;

//     chrome.storage.sync.get("domainJson", ({domainJson}) => {
//         if (!domainJson) return;

//         for (let item of domainJson) {
//             if (item.domain.toLowerCase() != domain.toLowerCase()) continue;

//             // Else update all known values and links
//             if (item.privacy_policy) {
//                 ppButton.innerHTML = "Privacy Policy";
//                 ppButton.setAttribute("href", item.privacy_policy);
//                 ppButton.className = "buttonGreen";
//             }
//             if (item.rtk_form) {
//                 rtkButton.innerHTML = "Request Data via Online Form";
//                 rtkButton.setAttribute("href", item.rtk_form);
//                 rtkButton.className = "buttonGreen";
//             }
//             if (item.email) {
//                 emailButton.innerHTML = "Request Data via Email";
//                 emailButton.setAttribute("emailto", item.email);
//                 emailButton.className = "buttonGreen";
//             }
//         }
//     });
// });

// ppButton.addEventListener("click", () => {
//     let newUrl = ppButton.getAttribute("href");
//     if (!newUrl) return; // do nothing
//     chrome.tabs.create({url: newUrl});
// });

// rtkButton.addEventListener("click", () => {
//     let newUrl = rtkButton.getAttribute("href");
//     if (!newUrl) return; // do nothing
//     chrome.tabs.create({url: newUrl});
// });

// emailButton.addEventListener("click", async () => {
//     let email = emailButton.getAttribute("emailto");
//     if (!email) return; // do nothing
//     let newUrl = await generateEmailUrl(email);
//     chrome.tabs.create({url: newUrl});
// })

// optionsIcon.addEventListener("click", async () => {
//     if (chrome.runtime.openOptionsPage) {
//         chrome.runtime.openOptionsPage();
//     } else {
//         window.open(chrome.runtime.getURL('options.html'));
//     }
// })

// /* * HELPER FUNCTIONS * */

// async function generateEmailUrl(recipient) {
//     const urlprefix = "https://mail.google.com/mail/?view=cm&fs=1";
//     const emailTo = "&to=" + recipient;
//     const emailSubject = "&su=" + "Right to Access Request (Section 110 of the CCPA)";
//     const emailBody = "&body=" + 
//         "To%20whom%20it%20may%20concern%3A%0A%0AI%20am%20writing%20to%20request%20access%20to%20personal%20information%20pursuant%20to%20Section%201798.110%20of%20The%20California%20Consumer%20Privacy%20Act%20(CCPA).%20Please%20advise%20as%20to%20the%20following%3A%0A1.%20Please%20confirm%20to%20me%20whether%20or%20not%20my%20personal%20information%20has%20been%20collected%2C%20sold%20or%20disclosed%20over%20the%20past%2012%20months.%20If%20so%2C%20please%20disclose%3A%0A%20%201.1%20What%20categories%20of%20personal%20information%20has%20been%20collected%20or%20disclosed%20for%20business%20purposes%2C%20and%20provide%20me%20with%20a%20copy%20of%2C%20or%20access%20to%2C%20my%20personal%20information%20that%20you%20have%20or%20are%20processing%0A%20%201.2%20Please%20identify%20the%20specific%20pieces%20of%20personal%20information%20that%20you%20have%20collected%20about%20me%0A%20%201.3%20Please%20advise%20what%20sources%20were%20used%20to%20obtain%20my%20personal%20information%0A%20%201.4%20Please%20advise%20what%20categories%20of%20my%20personal%20information%20that%20you%20have%20shared%20with%20or%20disclosed%20to%20third%20parties%0A%20%201.5%20Please%20advise%20in%20which%20countries%20my%20personal%20information%20is%20stored%2C%20or%20accessible%20from.%20In%20case%20you%20make%20use%20of%20cloud%20services%20to%20store%20or%20process%20my%20data%2C%20please%20include%20the%20countries%20in%20which%20the%20servers%20are%20located%20where%20my%20data%20are%20or%20were%20(in%20the%20past%2012%20months)%20stored%0A2.%20Please%20provide%20me%20with%20a%20detailed%20accounting%20of%20the%20business%20or%20commercial%20purposes%20for%20which%20you%20are%20collecting%20or%20selling%20my%20personal%20information%0A3.%20Please%20advise%20how%20long%20you%20store%20my%20personal%20information%2C%20and%20if%20retention%20is%20based%20upon%20the%20category%20of%20personal%20information%2C%20please%20identify%20how%20long%20each%20category%20is%20retained%0A4.%20Please%20advise%20as%20to%20whether%20any%20categories%20of%20my%20personal%20information%20have%20been%20sold%20to%20a%20third%20party%2C%20and%20if%20so%2C%20what%20categories%20were%20included%20in%20such%20sale.%20If%20my%20personal%20information%20has%20been%20sold%2C%20please%20identify%3A%0A%20%204.1%20The%20categories%20of%20third%20parties%20to%20whom%20the%20information%20was%20sold%0A%20%204.1%20What%20specific%20personal%20information%20has%20been%20sold%20to%20such%20third%20party(ies)%0APlease%20note%20that%20I%20do%20not%20consent%20to%20any%20personal%20information%20which%20is%20part%20of%20this%20request%2C%20including%20my%20email%20address%20and%20name%2C%20to%20be%20used%20for%20any%20purpose%20other%20than%20fulfilling%20this%20request.%0AIf%20you%20do%20not%20normally%20deal%20with%20these%20requests%2C%20please%20forward%20this%20email%20to%20the%20relevant%20person%20in%20your%20organization.%20Please%20note%20that%20you%20have%2045%20days%20to%20comply%20with%20this%20request%20as%20required%20under%20subsection%201798.130.%0A%0AKind%20regards%2C%0A"; 
//     // todo: read in boilerplate text file

//     return chrome.storage.sync.get('settings').then(data => {
//         const emailSignature = data.settings.fullname;
//         return urlprefix + emailTo + emailSubject + emailBody + emailSignature;
//     });
// }

const Popup = () => {

  class ppButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pp: true,
      };
  
      this.thing = () => {
        this.setState({ pp: true });
      };
    }
  
    render() {
      if (this.state.signIn) {
        return (
          <div className="App">
          <MuiButton id="onlineform" variant="outlined" sx={{ width: 250, height: 56, mt: 2 }}>Loading...</MuiButton>
            REEEEEE
          </div>
        );
      }
  
      return (
        <div className="App">
        <MuiButton id="onlineform" variant="outlined" sx={{ width: 250, height: 56, mt: 2 }}>Loading...</MuiButton>
          AAAAAA
        </div>
      );
    }
  }

  var databroker_map = {
    "towerData": "privacy@towerdata.com",
    "db2": "db2@gmail.com",
    "db3": "db3@gmail.com",
    "db4": "db4@gmail.com"
  }

  const [dataBroker, setBroker] = React.useState('');

  const handleChange = (event) => {
    setBroker(event.target.value);
  };

  // Function to generate an Email boilerplate and open in a new tab
  // Could likely be abstracted into 2 separate parts:
  // 1. Generate Email string
  // 2. Open in new tab
  async function generateEmail() {
    var emailOne = "https://mail.google.com/mail/?view=cm&fs=1&to=";
    var emailTwo = emails;
    var emailThree = "&su=";
    var emailFour = "Right to Access Request (Section 110 of the CCPA)";
    var emailFive = "&body=";
    var emailSix = "To%20whom%20it%20may%20concern%3A%0A%0AI%20am%20writing%20to%20request%20access%20to%20personal%20information%20pursuant%20to%20Section%201798.110%20of%20The%20California%20Consumer%20Privacy%20Act%20(CCPA).%20Please%20advise%20as%20to%20the%20following%3A%0A1.%20Please%20confirm%20to%20me%20whether%20or%20not%20my%20personal%20information%20has%20been%20collected%2C%20sold%20or%20disclosed%20over%20the%20past%2012%20months.%20If%20so%2C%20please%20disclose%3A%0A%20%201.1%20What%20categories%20of%20personal%20information%20has%20been%20collected%20or%20disclosed%20for%20business%20purposes%2C%20and%20provide%20me%20with%20a%20copy%20of%2C%20or%20access%20to%2C%20my%20personal%20information%20that%20you%20have%20or%20are%20processing%0A%20%201.2%20Please%20identify%20the%20specific%20pieces%20of%20personal%20information%20that%20you%20have%20collected%20about%20me%0A%20%201.3%20Please%20advise%20what%20sources%20were%20used%20to%20obtain%20my%20personal%20information%0A%20%201.4%20Please%20advise%20what%20categories%20of%20my%20personal%20information%20that%20you%20have%20shared%20with%20or%20disclosed%20to%20third%20parties%0A%20%201.5%20Please%20advise%20in%20which%20countries%20my%20personal%20information%20is%20stored%2C%20or%20accessible%20from.%20In%20case%20you%20make%20use%20of%20cloud%20services%20to%20store%20or%20process%20my%20data%2C%20please%20include%20the%20countries%20in%20which%20the%20servers%20are%20located%20where%20my%20data%20are%20or%20were%20(in%20the%20past%2012%20months)%20stored%0A2.%20Please%20provide%20me%20with%20a%20detailed%20accounting%20of%20the%20business%20or%20commercial%20purposes%20for%20which%20you%20are%20collecting%20or%20selling%20my%20personal%20information%0A3.%20Please%20advise%20how%20long%20you%20store%20my%20personal%20information%2C%20and%20if%20retention%20is%20based%20upon%20the%20category%20of%20personal%20information%2C%20please%20identify%20how%20long%20each%20category%20is%20retained%0A4.%20Please%20advise%20as%20to%20whether%20any%20categories%20of%20my%20personal%20information%20have%20been%20sold%20to%20a%20third%20party%2C%20and%20if%20so%2C%20what%20categories%20were%20included%20in%20such%20sale.%20If%20my%20personal%20information%20has%20been%20sold%2C%20please%20identify%3A%0A%20%204.1%20The%20categories%20of%20third%20parties%20to%20whom%20the%20information%20was%20sold%0A%20%204.1%20What%20specific%20personal%20information%20has%20been%20sold%20to%20such%20third%20party(ies)%0APlease%20note%20that%20I%20do%20not%20consent%20to%20any%20personal%20information%20which%20is%20part%20of%20this%20request%2C%20including%20my%20email%20address%20and%20name%2C%20to%20be%20used%20for%20any%20purpose%20other%20than%20fulfilling%20this%20request.%0AIf%20you%20do%20not%20normally%20deal%20with%20these%20requests%2C%20please%20forward%20this%20email%20to%20the%20relevant%20person%20in%20your%20organization.%20Please%20note%20that%20you%20have%2045%20days%20to%20comply%20with%20this%20request%20as%20required%20under%20subsection%201798.130.%0A%0AKind%20regards%2C%0A";
    var emailSeven = document.getElementById('userName').value;
    var newURL = emailOne + emailTwo + emailThree + emailFour + emailFive + emailSix + emailSeven;
    chrome.tabs.create({ url: newURL });
  }

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
          <SettingsIcon variant="outlined" className="Gray" />
        </p>

      </header>

      <p>
      </p>

      <div>
        <div>
          {/* <FormControl sx={{ minWidth: 250, height: 50, mt: 2 }}>
              <InputLabel id="dataBrokers">Select Broker</InputLabel>
              <Select
                labelId="dataBrokers"
                id="dataBrokers"
                value={dataBroker}
                label="Select Broker"
                onChange={handleChange}
              >
                <MenuItem value={databroker_map["towerData"]}>Tower Data</MenuItem>
                <MenuItem value={databroker_map["db2"]}>db2</MenuItem>
                <MenuItem value={databroker_map["db3"]}>db3</MenuItem>
                <MenuItem value={databroker_map["db4"]}>db4</MenuItem>
              </Select>
            </FormControl> */}
        </div>
      </div>
      <h3 id="urltext">Loading...</h3>
      <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
      <MuiButton id="privacypolicy" variant="outlined" sx={{ width: 250, height: 56, mt: 2 }}>Loading...</MuiButton>
      <ppButton></ppButton>
      <MuiButton id="onlineform" variant="outlined" sx={{ width: 250, height: 56, mt: 2 }}>Loading...</MuiButton>
      <MuiButton id="emailrequest" variant="outlined" sx={{ width: 250, height: 56, mt: 2 }}>Loading...</MuiButton>
      <MuiButton variant="outlined" onClick={generateEmail} endIcon={<SendIcon />} sx={{ width: 250, height: 56, mt: 2 }}>OPEN EMAIL IN NEW TAB</MuiButton>

      <footer className='App-footer'>
        <MuiButton variant="contained" onClick={scrape} sx={{ width: 250, height: 50, alignContent: 'flex-start', mt: 1 }}>Scrape</MuiButton>
      </footer>
    </div>
  );
=======
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
  
        <p className="Gray">You are on: <span className="Red">{this.state.domain}</span></p>
        <TextField id="userName" label="Your Name" variant="outlined" sx={{ width: 250, height: 56, mt: 1 }} />
        <PopupButton text="Privacy Policy" href={this.state.ppHref}/>
        <PopupButton text="Online Form" href={this.state.onlineFormHref}/>
        <PopupButton text="Email Request" icon={<SendIcon/>} href={this.state.emailHref}/> 
  
        <footer className='App-footer'>
          <ScrapeButton/>
        </footer>
      </div>
    );
  }
>>>>>>> 5bbc72ef236145b3ab3f63764a9ae91e5ac13777
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