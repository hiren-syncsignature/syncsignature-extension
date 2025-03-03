// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "getLocalStorage") {
    const token = localStorage.getItem(message.key); // Get the item
    sendResponse({ token: token }); // Send the value back
    return true; // Important: Keep the message channel open for the async response
  }
});