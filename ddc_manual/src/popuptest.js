// popuptest.js
// remove this eventually. just a proof of concept for multiple js files attached to one html.
let foobar = document.getElementById("foobar");

chrome.storage.sync.get("color", ({ color }) => {
    foobar.style.backgroundColor = color;
});

foobar.addEventListener("click", async () => {
    console.log("HELLO! from another JS file.")
});