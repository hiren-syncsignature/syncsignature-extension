import { useCallback } from "react";
import Layout from "./components/layout/Layout";
import MainScreen from "./components/screens/MainScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import TokenDisplay from "./components/ui/TokenDisplay";
import { useNavigation } from "./hooks/useNavigation";
import { useStorage } from "./hooks/useStorage";
import { useSignatures } from "./hooks/useSignatures";
import { UserProfile } from "./types";
function App() {
  const { currentScreen, navigateTo, goBack } = useNavigation("main");
  const {
    token,
    selectedSignatureId,
    userProfile,
    saveSelectedSignature,
    saveUserProfile,
    clearToken,
  } = useStorage();
  const { signatures } = useSignatures();

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs[0]?.id) {
  //       chrome.tabs.sendMessage(
  //         tabs[0].id,
  //         { action: "getLocalStorage", key: "TOKEN" },
  //         (response) => {
  //           if (response && response.token) {
  //             saveToken(response.token);
  //           } else {
  //             if (chrome.runtime.lastError) {
  //               console.error(
  //                 "(NOT BRAND WEBSITE) Error sending message:",
  //                 chrome.runtime.lastError
  //               );
  //             } else {
  //               console.error("No response or no token received.");
  //             }
  //           }
  //         }
  //       );
  //     }
  //   });
  // }, [saveToken]);

  const handleLogin = useCallback(() => {
    navigateTo("welcome");
  }, [navigateTo]);

  const handleSignup = useCallback(() => {
    navigateTo("welcome");
  }, [navigateTo]);

  const handleLogout = useCallback(() => {
    clearToken();
    navigateTo("main");
  }, [clearToken, navigateTo]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "main":
        return <MainScreen onLogin={handleLogin} onSignup={handleSignup} />;
      case "welcome":
        return (
          <>
            <WelcomeScreen
              signatures={signatures}
              selectedSignatureId={selectedSignatureId}
              onSelectSignature={(sigId) => {
                const sig = signatures.find((s) => s.id === sigId);
                if (sig) saveSelectedSignature(sig);
              }}
            />
            {token && <TokenDisplay token={token} />}
          </>
        );
      case "settings":
        return <SettingsScreen onBack={goBack} />;
      case "profile":
        return (
          <ProfileScreen
            profile={userProfile}
            onSaveProfile={(profile: UserProfile) => {
              saveUserProfile(profile);
              navigateTo("welcome");
            }}
            onBack={goBack}
          />
        );
      default:
        return <MainScreen onLogin={handleLogin} onSignup={handleSignup} />;
    }
  };

  return (
    <Layout
      currentScreen={currentScreen}
      navigateTo={navigateTo}
      onLogout={handleLogout}
    >
      {renderCurrentScreen()}
    </Layout>
  );
}

export default App;
