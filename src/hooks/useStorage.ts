import { useState, useEffect, useCallback } from 'react';
import { Signature, UserProfile } from '../types';

export function useStorage() {
  const [token, setToken] = useState<string | null>(null);
  const [selectedSignatureId, setSelectedSignatureId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: undefined
  });

  // Load data from storage on mount
  useEffect(() => {
    // Get token from content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getLocalStorage", key: "TOKEN" },
          (response) => {
            if (response && response.token) {
              setToken(response.token);
            }
          }
        );
      }
    });

    // Get selected signature and user profile from storage
    chrome.storage.sync.get(["selectedSignature", "userProfile"], (data) => {
      if (data.selectedSignature && data.selectedSignature.id) {
        setSelectedSignatureId(data.selectedSignature.id);
      }

      if (data.userProfile) {
        setUserProfile(data.userProfile);
      }
    });
  }, []);

  // Save token
  const saveToken = useCallback((newToken: string) => {
    setToken(newToken);
    chrome.storage.local.set({ TOKEN: newToken });
  }, []);

  // Save selected signature
  const saveSelectedSignature = useCallback((signature: Signature) => {
    setSelectedSignatureId(signature.id);
    chrome.storage.sync.set({ selectedSignature: signature });
  }, []);

  // Save user profile
  const saveUserProfile = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    chrome.storage.sync.set({ userProfile: profile });
  }, []);

  // Clear token (logout)
  const clearToken = useCallback(() => {
    setToken("");
    chrome.storage.local.remove("TOKEN");
  }, []);

  return {
    token,
    selectedSignatureId,
    userProfile,
    saveToken,
    saveSelectedSignature,
    saveUserProfile,
    clearToken
  };
}