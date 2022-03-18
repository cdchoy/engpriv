# ddc_manual

Version of Data_Daddy_CCPA that does NOT scrape the privacy policy for the online form link or contact email.
Instead, it uses a maintained file that maps web domains to their:

- Privacy policy URL
- RTK online request form URL
- Contact Email for exercising CCPA rights

Chris is re-building the extension mostly from scratch here to both (1) eliminate unused scraper code,
and (2) learn how to build an extension himself.

## File Structure

```text
ddc_manual/
|- README.md
|- manifest.json
|- static/
|   |- images/
|   |- text/
|- src/
|   |- *.html
|   |- *.css
|   |- *.js
```

## Resources

- [Chrome Extension Developers: Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [ManifestV3 Field Summary](https://developer.chrome.com/docs/extensions/mv3/manifest/)
- [Chrome API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [Get domain from url](https://w3collective.com/get-domain-name-url-javascript/)
- [App Icon Maker](https://appiconmaker.co/)