const button = document.getElementById('toggleButton');
let isEnabled = false;

button.addEventListener('click', () => {
    isEnabled = !isEnabled; // Toggle the status
    chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
        button.innerText = response.status ? "Disable" : "Enable";
    });
});
