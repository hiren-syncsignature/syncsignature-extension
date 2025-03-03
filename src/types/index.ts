export type Screen = "main" | "welcome" | "settings" | "profile";

export type Signature = {
  id: string;
  name: string;
  content: string;
};

export type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};