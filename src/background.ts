import { useStorage } from "./hooks/useStorage";

chrome.runtime.onInstalled.addListener(() => {
  const { saveToken } = useStorage();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getLocalStorage", key: "TOKEN" }, (response) => {
        if (response && response.token) {
          console.log("Token from localStorage:", response.token);
          saveToken(response.token)
          // chrome.storage.local.set({ myToken: response.token });
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