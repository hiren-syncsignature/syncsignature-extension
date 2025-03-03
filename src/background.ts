// Example:  Get the token when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // You might need to inject the content script programmatically if you don't
  // use "matches" in manifest.json, or if you need to inject it dynamically.
  // See the "Programmatic Injection" section below for details.

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getLocalStorage", key: "TOKEN" }, (response) => {
        if (response && response.token) {
          console.log("Token from localStorage:", response.token);
          // Store the token in extension storage, if needed
          chrome.storage.local.set({ myToken: response.token });
        } else {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.error("No response or no token received.");
          }
        }
      });
    }

  });
});

// You could also have a function here that gets called from your popup
// to request the localStorage data on demand.