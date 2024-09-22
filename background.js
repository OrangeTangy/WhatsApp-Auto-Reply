let isEnabled = false; // Track whether auto-reply is enabled

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
        isEnabled = !isEnabled; // Toggle the status
        console.log(`Extension is now ${isEnabled ? 'enabled' : 'disabled'}.`); // Log status
        sendResponse({ status: isEnabled });
    }
});

setInterval(() => {
    if (isEnabled) {
        console.log("Checking for WhatsApp tab..."); // Log check
        chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (tabs) => {
            if (tabs.length === 0) {
                console.warn("No WhatsApp tab found."); // Log if no tab
                return;
            }
            tabs.forEach(tab => {
                console.log("Executing script on WhatsApp tab."); // Log execution
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: typeInWhatsApp
                });
            });
        });
    }
}, 2000);

function typeInWhatsApp() {
    const message = "Test message"; // Message to type
    const inputBox = document.querySelector("div[contenteditable='true']");

    if (inputBox) {
        inputBox.focus(); // Ensure the input box is focused
        inputBox.innerText = message;
        const inputEvent = new Event('input', { bubbles: true });
        inputBox.dispatchEvent(inputEvent);
        console.log("Typed message:", message); // Log typed message
    } else {
        console.error("Input box not found."); // Log error if input box is not found
    }
}
