import { useState, useEffect } from 'react';
import { signatures as defaultSignatures } from '../assets/signatures';
import { Signature } from '../types';

export function useSignatures() {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  useEffect(() => {
    const formattedSignatures = defaultSignatures.map((sig, index) => {
      const name = Object.keys(sig)[0];
      const content = Object.values(sig)[0];
      return {
        id: `sig-${index + 1}`,
        name: name || `Signature ${index + 1}`,
        content
      };
    });

    chrome.storage.sync.get("signatures", (data) => {
      if (data.signatures && Array.isArray(data.signatures)) {
        setSignatures(data.signatures);
      } else {
        setSignatures(formattedSignatures);
      }
    });
  }, []);

  return {
    signatures,
  };
}