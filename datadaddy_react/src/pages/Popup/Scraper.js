import React from "react";
import MuiButton from '@mui/material/Button';
// import generateEmail from './GenerateEmail';

const HTMLParser = require('node-html-parser')
const JSSoup = require('jssoup').default;

// Add this in your component file
require('react-dom');
window.React2 = require('react');

// class Scraper extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       links: "loading...",
//       mail: "loading...",
//     };
//   }

//   componentDidMount() {
//     this.update();
//     this.updateID = setInterval(() => this.update(), 3_000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.updateID);
//   }

//   setDefaultState() {
//     this.setState({
//       links: "loading...",
//       mail: "loading...",
//     });
//   }

//   update() {

//     this.setState({ links: hyperlinks });
//     this.setState({ mail: emails });

//     if (flag) {
//       this.setState({
//         links: hyperlinks,
//         mail: generateEmail(emails, this.state.sender),
//       });
//     } else {
//       this.setState({
//         links: "",
//         mail: "",
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="Scraper">
//         <PopupButton text="Email Request" icon={<SendIcon />} href={this.state.emailHref} />
//       </div>
//     );
//   }
// }

let emails = new Set();
let hyperlinks = new Set();
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const hyperlinksRegex = /^(ftp|http|https):\/\/[^ "]+$/gi;
let queue = [];

export function scrapeEmails() {
  awaitScrape();
  let s = new Set(['hello', 'world']);
  console.log("basic set", s);
  console.log("arrFromSet", Array.from(s).toString());

  console.log("EMAILS:", emails);
  console.log("HEREHERE:", Array.from(emails));
  console.log("HEREHERE2:", [...emails]);
  emails.forEach(v => console.log(v));
  var ret = "";
  // emails.forEach((value) => {
  //   console.log("setforeach", value);
  // })
  // console.log("FOO:", ret);
  return emails;
}

async function awaitScrape() {
  let p = new Promise(function (resolve, reject) {
    extractDataBFS().then(() => {
      resolve();
    });
  });
  await p;
}

// function to return the url of the current tab
async function getCurrentTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url;
}

async function extractDataBFS(sender) {
  const url = await getCurrentTabUrl();
  var depth = 0;
  queue.push(url);

  while (queue.length > 0) {
    console.log("CRAWLING...")
    var levelSize = queue.length;

    for (var lvl = 0; lvl < levelSize; lvl++) {
      var currLink = queue[0];
      if (currLink === "chrome://extensions/") { return; } // squash irritating error message
      queue.shift();
      var rootBfs = [];
      try {
        rootBfs = await fetch(`${currLink}`)
          .then(resBfs => resBfs.text())
          .then(bodyBfs => HTMLParser.parse(bodyBfs));
      } catch (error) {
        return rootBfs;
      }

      const soupBfs = new JSSoup(rootBfs);
      var linksBfs = soupBfs.findAll('a');
      for (let i in linksBfs) {
        if (linksBfs[i].attrs.href !== undefined) {
          // Email Regex
          let mailAddr = linksBfs[i].attrs.href.match(emailRegex);
          if (mailAddr != null) {
            if (emails.has(mailAddr.toString()) === false) {
              console.log(mailAddr);
              emails.add(mailAddr.toString());
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
    console.log("DEPTH", depth, hyperlinks);
    if (depth > 2 || emails.size > 10 || hyperlinks.size > 100) {
      console.log("Crawl complete!!")
      console.log("Hyperlinks", hyperlinks);
      console.log("Emails", emails);
      generateEmail(Array.from(emails));
    }
  }
}

function generateEmail(recipients) {
  console.log("fuckfuckfuckfuckfuck")
  if (!recipients) return null;
  console.log(recipients);
  const urlprefix = "https://mail.google.com/mail/?view=cm&fs=1";
  const emailTo = "&to=" + recipients.toString();
  const emailSubject = "&su=Right to Access Request (Section 110 of the CCPA)";
  const emailBody = "&body=" +
    "To%20whom%20it%20may%20concern%3A%0A%0AI%20am%20writing%20to%20request%20access%20to%20personal%20information%20pursuant%20to%20Section%201798.110%20of%20The%20California%20Consumer%20Privacy%20Act%20(CCPA).%20Please%20advise%20as%20to%20the%20following%3A%0A1.%20Please%20confirm%20to%20me%20whether%20or%20not%20my%20personal%20information%20has%20been%20collected%2C%20sold%20or%20disclosed%20over%20the%20past%2012%20months.%20If%20so%2C%20please%20disclose%3A%0A%20%201.1%20What%20categories%20of%20personal%20information%20has%20been%20collected%20or%20disclosed%20for%20business%20purposes%2C%20and%20provide%20me%20with%20a%20copy%20of%2C%20or%20access%20to%2C%20my%20personal%20information%20that%20you%20have%20or%20are%20processing%0A%20%201.2%20Please%20identify%20the%20specific%20pieces%20of%20personal%20information%20that%20you%20have%20collected%20about%20me%0A%20%201.3%20Please%20advise%20what%20sources%20were%20used%20to%20obtain%20my%20personal%20information%0A%20%201.4%20Please%20advise%20what%20categories%20of%20my%20personal%20information%20that%20you%20have%20shared%20with%20or%20disclosed%20to%20third%20parties%0A%20%201.5%20Please%20advise%20in%20which%20countries%20my%20personal%20information%20is%20stored%2C%20or%20accessible%20from.%20In%20case%20you%20make%20use%20of%20cloud%20services%20to%20store%20or%20process%20my%20data%2C%20please%20include%20the%20countries%20in%20which%20the%20servers%20are%20located%20where%20my%20data%20are%20or%20were%20(in%20the%20past%2012%20months)%20stored%0A2.%20Please%20provide%20me%20with%20a%20detailed%20accounting%20of%20the%20business%20or%20commercial%20purposes%20for%20which%20you%20are%20collecting%20or%20selling%20my%20personal%20information%0A3.%20Please%20advise%20how%20long%20you%20store%20my%20personal%20information%2C%20and%20if%20retention%20is%20based%20upon%20the%20category%20of%20personal%20information%2C%20please%20identify%20how%20long%20each%20category%20is%20retained%0A4.%20Please%20advise%20as%20to%20whether%20any%20categories%20of%20my%20personal%20information%20have%20been%20sold%20to%20a%20third%20party%2C%20and%20if%20so%2C%20what%20categories%20were%20included%20in%20such%20sale.%20If%20my%20personal%20information%20has%20been%20sold%2C%20please%20identify%3A%0A%20%204.1%20The%20categories%20of%20third%20parties%20to%20whom%20the%20information%20was%20sold%0A%20%204.1%20What%20specific%20personal%20information%20has%20been%20sold%20to%20such%20third%20party(ies)%0APlease%20note%20that%20I%20do%20not%20consent%20to%20any%20personal%20information%20which%20is%20part%20of%20this%20request%2C%20including%20my%20email%20address%20and%20name%2C%20to%20be%20used%20for%20any%20purpose%20other%20than%20fulfilling%20this%20request.%0AIf%20you%20do%20not%20normally%20deal%20with%20these%20requests%2C%20please%20forward%20this%20email%20to%20the%20relevant%20person%20in%20your%20organization.%20Please%20note%20that%20you%20have%2045%20days%20to%20comply%20with%20this%20request%20as%20required%20under%20subsection%201798.130.%0A%0AKind%20regards%2C%0A";

  let emailUrl = urlprefix + emailTo + emailSubject + emailBody + "Dave";
  window.open(emailUrl);
  return emailUrl;
}

const ScrapeButton = () => {
  return <MuiButton variant="contained" onClick={() => scrapeEmails()} sx={{ width: 250, height: 56, alignContent: 'flex-start', mt: 1 }}>Gather Emails</MuiButton>
}

export default ScrapeButton;