// popup.js

let urltext = document.getElementById("urltext");
let ppButton = document.getElementById("privacypolicy");
let rtkButton = document.getElementById("onlineform");
let emailButton = document.getElementById("emailrequest");
let optionsIcon = document.getElementById("options-icon");

// Update popup HTML anytime the current domain changes
chrome.storage.sync.get("domain", ({domain}) => {
    // Default values
    urltext.innerHTML = "You are on: " + domain;
    ppButton.innerHTML = "Privacy Policy Not Found";
    ppButton.removeAttribute("href");
    ppButton.className = "buttonRed";
    rtkButton.innerHTML = "CCPA Online Form Not Found";
    rtkButton.removeAttribute("href");
    rtkButton.className = "buttonRed";
    emailButton.innerHTML = "CCPA Contact Email Unknown";
    emailButton.removeAttribute("emailto");
    emailButton.className = "buttonRed";

    if (!domain) return;

    chrome.storage.sync.get("domainJson", ({domainJson}) => {
        if (!domainJson) return;

        for (let item of domainJson) {
            if (item.domain.toLowerCase() != domain.toLowerCase()) continue;

            // Else update all known values and links
            if (item.privacy_policy) {
                ppButton.innerHTML = "Privacy Policy";
                ppButton.setAttribute("href", item.privacy_policy);
                ppButton.className = "buttonGreen";
            }
            if (item.rtk_form) {
                rtkButton.innerHTML = "Request Data via Online Form";
                rtkButton.setAttribute("href", item.rtk_form);
                rtkButton.className = "buttonGreen";
            }
            if (item.email) {
                emailButton.innerHTML = "Request Data via Email";
                emailButton.setAttribute("emailto", item.email);
                emailButton.className = "buttonGreen";
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

emailButton.addEventListener("click", async () => {
    let email = emailButton.getAttribute("emailto");
    if (!email) return; // do nothing
    let newUrl = await generateEmailUrl(email);
    chrome.tabs.create({url: newUrl});
})

optionsIcon.addEventListener("click", async () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
})

/* * HELPER FUNCTIONS * */

async function generateEmailUrl(recipient) {
    const urlprefix = "https://mail.google.com/mail/?view=cm&fs=1";
    const emailTo = "&to=" + recipient;
    const emailSubject = "&su=" + "Right to Access Request (Section 110 of the CCPA)";
    const emailBody = "&body=" + "todo%0A"; // todo: read in boilerplate text file
    
    return chrome.storage.sync.get('settings').then(data => {
        const emailSignature = data.settings.fullname;
        return urlprefix + emailTo + emailSubject + emailBody + emailSignature;
    });
}


