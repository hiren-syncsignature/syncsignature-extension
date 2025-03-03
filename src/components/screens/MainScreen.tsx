import { useState } from "react";
import { ChevronRight } from "lucide-react";

type MainScreenProps = {
  onLogin: () => void;
  onSignup: () => void;
};

export default function MainScreen({ onLogin, onSignup }: MainScreenProps) {
  const [, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <p className="text-center text-gray-600">
        Sync your email signatures across all devices. Log in to continue.
      </p>
      <div className="w-full space-y-4">
        <button
          onMouseEnter={() => setHoveredOption("login")}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={onLogin}
          className="w-full rounded-md bg-purple-600 py-3 px-4 text-sm font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all duration-200"
        >
          <span className="flex items-center justify-center">
            Log In <ChevronRight className="ml-2 h-4 w-4" />
          </span>
        </button>

        <button
          onMouseEnter={() => setHoveredOption("signup")}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={onSignup}
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow"
        >
          <span className="flex items-center justify-center">
            Sign Up <ChevronRight className="ml-2 h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
