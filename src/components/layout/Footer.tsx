import { LogOut } from "lucide-react";
import { Screen } from "../../types";

type FooterProps = {
  currentScreen: Screen;
  onLogout: () => void;
};

export default function Footer({ currentScreen, onLogout }: FooterProps) {
  return (
    <div className="border-t border-gray-200 p-3 bg-gray-50">
      {currentScreen !== "main" ? (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">© 2025 SyncSignature</p>
          <button
            onClick={onLogout}
            className="flex items-center text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200"
          >
            <LogOut className="h-3 w-3 mr-1" /> Sign Out
          </button>
        </div>
      ) : (
        <p className="text-center text-xs text-gray-500">
          © 2025 SyncSignature. All rights reserved.
        </p>
      )}
    </div>
  );
}
