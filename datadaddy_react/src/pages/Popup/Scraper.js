import React from "react";
import MuiButton from '@mui/material/Button';

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

function scrape(url) {
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

const ScrapeButton = () => {
  return <MuiButton variant="contained" onClick={scrape(url)} sx={{ width: 250, height: 50, alignContent: 'flex-start', mt: 1 }}>Scrape</MuiButton>
}

export default ScrapeButton;