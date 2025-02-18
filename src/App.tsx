import { useState } from "react";
import { signatures as signatures_array } from "./assets/signatures";
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"main" | "welcome">(
    "main"
  );
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [signatures, setSignatures] = useState<string[]>([]);

  const handleButtonClick = () => {
    setSignatures(signatures_array.map((s) => Object.values(s)[0]));
    setCurrentScreen("welcome");
  };

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    const signatureName = Object.keys(signatures_array[option])[0];
    const signatureContent = Object.values(signatures_array[option])[0];

    // Save the selected signature to chrome storage
    chrome.storage.sync.set(
      { selectedSignature: { name: signatureName, content: signatureContent } },
      () => {
        console.log("Signature saved:", {
          name: signatureName,
          content: signatureContent,
        });
      }
    );
  };

  return (
    <div className="flex h-[400px] w-[300px] flex-col overflow-hidden bg-gradient-to-br from-gray-100 to-white font-sans text-gray-800 shadow-lg">
      <div className="flex-1 p-6">
        {currentScreen === "main" ? (
          <div className="flex h-full flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome</h1>
              <p className="text-sm text-gray-600">
                Sign in to continue to SyncSignature
              </p>
            </div>
            <div className="w-full space-y-3">
              <button
                onClick={handleButtonClick}
                className="w-full rounded-full bg-[#7F56D9] py-2 text-sm font-medium text-white transition-all hover:bg-[#6941C6] focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2"
              >
                Log In
              </button>
              <button
                onClick={handleButtonClick}
                className="w-full rounded-full border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
            <div className="flex w-full flex-col gap-2">
              {signatures.map((_signature, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`h-10 w-full rounded-full px-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2 ${
                    selectedOption === index
                      ? "bg-[#7F56D9] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  signature - {index + 1}
                </button>
              ))}
            </div>
            {/* <p className="text-center text-sm text-gray-600">
              You selected: {selectedOption + 1}
            </p>
            - {signatures[selectedOption]} */}
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-[#7F56D9] to-[#9B7AE6] p-4 text-center text-xs text-white">
        <p>&copy; 2025 SyncSignature. All rights reserved.</p>
      </div>
    </div>
  );
}
