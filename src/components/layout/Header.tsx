import { Screen } from "../../types";
import { Settings, User } from "lucide-react";
import syncsignature_logo from "../../assets/syncsignature_logo.jpg";

type HeaderProps = {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
};

export default function Header({ currentScreen, navigateTo }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 shadow-md">
      {currentScreen === "main" ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex h-full w-full items-center justify-center bg-transparent">
            <img
              src={syncsignature_logo}
              alt="SyncSignature Logo"
              className="h-11 w-11 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">SyncSignature</h1>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {currentScreen === "welcome" && "Your Signatures"}
            {currentScreen === "settings" && "Settings"}
            {currentScreen === "profile" && "Profile"}
          </h2>
          {currentScreen === "welcome" && (
            <div className="flex space-x-2">
              <button
                onClick={() => navigateTo("settings")}
                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors duration-200"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateTo("profile")}
                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors duration-200"
                title="Profile"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
