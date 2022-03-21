// popup.js

const domainJson = fetch("../static/text/domain-map.json").then(r => r.json());

let urltext = document.getElementById("urltext");
let ppButton = document.getElementById("privacypolicy");
let rtkButton = document.getElementById("onlineform");
let emailButton = document.getElementById("emailrequest");

// Update popup HTML anytime the current domain changes
chrome.storage.sync.get("domain", ({domain}) => {
    waitForDomainJson(30_000); // 30s timeout

    // Default values
    urltext.innerHTML = "You are on: " + domain;
    ppButton.innerHTML = "Privacy Policy Not Found";
    ppButton.removeAttribute("href");
    rtkButton.innerHTML = "CCPA Online Form Not Found";
    rtkButton.removeAttribute("href");
    emailButton.innerHTML = "CCPA Contact Email Unknown";
    emailButton.removeAttribute("href");

    chrome.storage.sync.get("domainJson", ({domainJson}) => {
        for (let item of domainJson) {
            if (item.domain.toLowerCase() != domain.toLowerCase()) continue;
            // Else update all known values and links
            if (item.privacy_policy) {
                ppButton.innerHTML = "Privacy Policy";
                ppButton.setAttribute("href", item.privacy_policy);
            }
            if (item.rtk_form) {
                rtkButton.innerHTML = "Request Data via Online Form";
                rtkButton.setAttribute("href", item.rtk_form);
            }
            if (item.email) {
                emailButton.innerHTML = "Request Data via Email";
                emailButton.setAttribute("href", generateEmailUrl(item.email));
            }
        }
    });
    
});

ppButton.addEventListener("click", () => {
    let newUrl = ppButton.getAttribute("href");
    if (!newUrl) return; // do nothing
    chrome.tabs.create({url: newUrl});
});

rtkButton.addEventListener("click", () => {
    let newUrl = rtkButton.getAttribute("href");
    if (!newUrl) return; // do nothing
    chrome.tabs.create({url: newUrl});
});

emailButton.addEventListener("click", () => {
    let newUrl = emailButton.getAttribute("href");
    if (!newUrl) return; // do nothing
    chrome.tabs.create({url: newUrl});
})

/* * HELPER FUNCTIONS * */

function generateEmailUrl(recipient) {
    const urlprefix = "https://mail.google.com/mail/?view=cm&fs=1";
    const emailTo = "&to=" + recipient;
    const emailSubject = "&su=" + "Right to Access Request (Section 110 of the CCPA)";
    const emailBody = "&body=" + "todo"; // read in boilerplate text file
    const emailSignature = "todo"; // read in user's name from storage
    chrome.storage.sync.get("subject-name", ) 
    return urlprefix + emailTo + emailSubject + emailBody + emailSignature;
}

function waitForDomainJson(timeout) {
    const start = Date.now();
    return new Promise(promiseExec);

    function promiseExec(resolve, reject) {
        if (!domainJson) {
            resolve(domainJson);
        } else if (timeout && (Date.now() - start) >= timeout) {
            reject(new Error("Timeout while fetching domain json"));
        } else {
            setTimeout(promiseExec.bind(this, resolve, reject), 30) // retry in 30ms
        }
    }
}


