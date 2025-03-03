import React, { useState, useCallback } from "react";
import BackButton from "../ui/BackButton";
import { UserProfile } from "../../types";

type ProfileScreenProps = {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onBack: () => void;
};

export default function ProfileScreen({
  profile,
  onSaveProfile,
  onBack,
}: ProfileScreenProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar || ""); // Ensure avatar is initialized

  const handleSave = useCallback(() => {
    onSaveProfile({ name, email, avatar });
  }, [name, email, avatar, onSaveProfile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <BackButton onClick={onBack} label="Profile" />
      <div className="space-y-4">
        {/* Avatar Display and Upload */}
        <div className="flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              <span className="text-2xl">👤</span>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          >
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Name and Email Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
