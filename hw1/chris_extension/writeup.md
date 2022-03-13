# HW1 Part 3 Writeup Portion

*Once for the team, a written explanation that describes what declarativeNetRequest
does. Pretend you are explaining this for a lawyer at your company, and do not use
technical jargon. (Hint: read the documentation.)*

The [chrome.declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/) flag is a permission we can attach to a browser extension that allows it to block certain requests for web pages without actually needing to load and view the contents of those web pages. Using this permission, we could statically block pages like malware.com or dynamically block any page with the word "virus" in the url. It's important we're able to block requests like these without loading them because it could be the case that just requesting and loading the contents of a malicious webpage could expose us to threats.
