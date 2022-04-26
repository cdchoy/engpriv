import React from "react";
import MuiButton from '@mui/material/Button';
import generateEmail from './GenerateEmail';

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
// let flag = false;

// function to return the url of the current tab
async function getCurrentTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url;
}

export async function scrapeEmails() {
  return extractDataBFS();
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
    console.log(depth, hyperlinks);
    if (depth > 2 || emails.size > 10 || hyperlinks.size > 100) {
      console.log("Crawl complete")
      console.log(hyperlinks);
      console.log(emails);
      return emails;
    }
  }
}

const ScrapeButton = () => {
  return <MuiButton variant="contained" onClick={() => scrapeEmails()} sx={{ width: 250, height: 56, alignContent: 'flex-start', mt: 1 }}>Gather Emails</MuiButton>
}

export default ScrapeButton;