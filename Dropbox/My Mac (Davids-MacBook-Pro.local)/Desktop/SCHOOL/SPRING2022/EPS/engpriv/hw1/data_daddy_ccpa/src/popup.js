document.addEventListener('DOMContentLoaded', function() {
  // Create reference to "Generate Email" button
  var generateEmail = document.getElementById('generateEmail');
  // Add event listener to the generateEmail variable, specifying 'click'
  generateEmail.addEventListener('click', function() {
    var emailOne = "https://mail.google.com/mail/?view=cm&fs=1&to=";
    // This 1's for u Bolor
    // Data Broker Email Address
    // Right here vvv
    var emailTwo = "privacy@towerdata.com";
    var emailThree = "&su=";
    var emailFour = "Right to Access Request (Section 110 of the CCPA)";
    var emailFive = "&body=";
    var emailSix = "To%20whom%20it%20may%20concern%3A%0A%0AI%20am%20writing%20to%20request%20access%20to%20personal%20information%20pursuant%20to%20Section%201798.110%20of%20The%20California%20Consumer%20Privacy%20Act%20(CCPA).%20Please%20advise%20as%20to%20the%20following%3A%0A1.%20Please%20confirm%20to%20me%20whether%20or%20not%20my%20personal%20information%20has%20been%20collected%2C%20sold%20or%20disclosed%20over%20the%20past%2012%20months.%20If%20so%2C%20please%20disclose%3A%0A%20%201.1%20What%20categories%20of%20personal%20information%20has%20been%20collected%20or%20disclosed%20for%20business%20purposes%2C%20and%20provide%20me%20with%20a%20copy%20of%2C%20or%20access%20to%2C%20my%20personal%20information%20that%20you%20have%20or%20are%20processing%0A%20%201.2%20Please%20identify%20the%20specific%20pieces%20of%20personal%20information%20that%20you%20have%20collected%20about%20me%0A%20%201.3%20Please%20advise%20what%20sources%20were%20used%20to%20obtain%20my%20personal%20information%0A%20%201.4%20Please%20advise%20what%20categories%20of%20my%20personal%20information%20that%20you%20have%20shared%20with%20or%20disclosed%20to%20third%20parties%0A%20%201.5%20Please%20advise%20in%20which%20countries%20my%20personal%20information%20is%20stored%2C%20or%20accessible%20from.%20In%20case%20you%20make%20use%20of%20cloud%20services%20to%20store%20or%20process%20my%20data%2C%20please%20include%20the%20countries%20in%20which%20the%20servers%20are%20located%20where%20my%20data%20are%20or%20were%20(in%20the%20past%2012%20months)%20stored%0A2.%20Please%20provide%20me%20with%20a%20detailed%20accounting%20of%20the%20business%20or%20commercial%20purposes%20for%20which%20you%20are%20collecting%20or%20selling%20my%20personal%20information%0A3.%20Please%20advise%20how%20long%20you%20store%20my%20personal%20information%2C%20and%20if%20retention%20is%20based%20upon%20the%20category%20of%20personal%20information%2C%20please%20identify%20how%20long%20each%20category%20is%20retained%0A4.%20Please%20advise%20as%20to%20whether%20any%20categories%20of%20my%20personal%20information%20have%20been%20sold%20to%20a%20third%20party%2C%20and%20if%20so%2C%20what%20categories%20were%20included%20in%20such%20sale.%20If%20my%20personal%20information%20has%20been%20sold%2C%20please%20identify%3A%0A%20%204.1%20The%20categories%20of%20third%20parties%20to%20whom%20the%20information%20was%20sold%0A%20%204.1%20What%20specific%20personal%20information%20has%20been%20sold%20to%20such%20third%20party(ies)%0APlease%20note%20that%20I%20do%20not%20consent%20to%20any%20personal%20information%20which%20is%20part%20of%20this%20request%2C%20including%20my%20email%20address%20and%20name%2C%20to%20be%20used%20for%20any%20purpose%20other%20than%20fulfilling%20this%20request.%0AIf%20you%20do%20not%20normally%20deal%20with%20these%20requests%2C%20please%20forward%20this%20email%20to%20the%20relevant%20person%20in%20your%20organization.%20Please%20note%20that%20you%20have%2045%20days%20to%20comply%20with%20this%20request%20as%20required%20under%20subsection%201798.130.%0A%0AKind%20regards%2C%0A";
    var emailSeven = document.getElementById('userName').value;
    // Concatenate the variables into newURL
    var newURL = emailOne + emailTwo + emailThree + emailFour + emailFive + emailSix + emailSeven;
    // Pass newURL through tabs.create to open a new tab
    chrome.tabs.create({ url: newURL });
  });
});

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "http://www.arstechnica.com";
var SEARCH_WORD = "stemming";
var MAX_PAGES_TO_VISIT = 10;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);
crawl();

function crawl() {
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    crawl();
  } else {
    // New page we haven't visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Parse the document body
     var $ = cheerio.load(body);
     var isWordFound = searchForWord($, SEARCH_WORD);
     if(isWordFound) {
       console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
     } else {
       collectInternalLinks($);
       // In this short program, our callback is just calling crawl()
       callback();
     }
  });
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}