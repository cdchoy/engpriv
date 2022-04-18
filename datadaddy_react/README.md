# Data Daddy - React Version

Boilerplate for this code was taken from Michael Xieyang Liu's [Github](https://github.com/lxieyang/chrome-extension-boilerplate-react).

# <img src="../datadaddy_react/src/assets/img/DataDaddyLogo.png" width="20"/> Data Daddy v3.1

# <img src="../datadaddy_react/src/assets/img/datadaddy.png" width="200"/>

## TODO

### Hardcode Integration
- [ ] Stuff to do

### Crawler
- [X] Add RegEx to parse emails
- [X] Settle on a crawling algorithm
- [X] Set up (probably recursive) Fetch calls
- [X] Dynamically load url from current tab
- [X] Debug infinite fetch calls
- [X] Integrate crawler
- [ ] Load in URL from current tab
- [ ] Optimize: Identify why email scrape results are inconsistent
- [ ] Optimize: Filter out irrelevant emails

### Form Filling Automation
- [ ] Establish workflow and data pipeline

### Voice Assistant Integration
- [X] Research Siri API (Not doable without creating an Android App)
- [ ] Research Alexa API
- [ ] Research Google Assistant API

#### NLP
- [X] Research NLP libraries in JavaScript/TypeScript
- [ ] Settle on library choice
- [ ] Develop and train model on Privacy Policies or Privacy Pages

#### Personalized Emoji
- [ ] Snapchat version not doable
- [ ] MeMoji potentially doable, would need to create our own Privacy Assistant MeMoji using Apple's SDK

## Setup and Usage

1. Navigate to this directory within the repo `cd datadaddy_react`
2. Run `npm install` to install necessary dependencies and modules. This should generate a `node_modules/` directory on your local machine.
3. Run `npm start` to compile the code into the `build/` directory which will be generated for first-time installers.
4. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `engpriv/datadaddy_react/build` folder.
5. Done! You should see the extension in your navigation bar by clicking the puzzle piece icon.

## File Structure

``` text
.
├── README.md
├── build/ = compiled extension files to run in Chrome generated from npm start.
├── node_modules/ = installed module dependencies
├── src/ = source code
├── utils/ = node, react, and webpack configs we can ignore.
├── package.json = node package declarations
├── package-lock.json = generated from npm install. Fixes dependency versions from package.json.
├── tsconfig.json
└── webpack.config.js
```
