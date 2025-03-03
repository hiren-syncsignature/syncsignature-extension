import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Screen } from "../../types";

type LayoutProps = {
  children: ReactNode;
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  onLogout: () => void;
};

export default function Layout({
  children,
  currentScreen,
  navigateTo,
  onLogout,
}: LayoutProps) {
  return (
    <div className="flex h-[550px] w-[350px] flex-col overflow-hidden bg-white font-sans text-gray-800 shadow-xl">
      <Header currentScreen={currentScreen} navigateTo={navigateTo} />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        {children}
      </div>

      <Footer currentScreen={currentScreen} onLogout={onLogout} />

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7f56d9 #f3f4f6;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #7f56d9;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
