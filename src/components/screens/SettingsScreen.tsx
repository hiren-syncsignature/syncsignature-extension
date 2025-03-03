import BackButton from "../ui/BackButton";

type SettingsScreenProps = {
  onBack: () => void;
};

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <div>
      <BackButton onClick={onBack} label="Settings" />
      <p className="text-gray-600">Settings page content coming soon...</p>
      {/* Example settings */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm">Enable desktop notifications</span>
        </label>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Appearance</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm">Dark mode</span>
        </label>
      </div>
    </div>
  );
}
