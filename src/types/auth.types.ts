export interface AuthContextProps {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isProfileComplete: boolean | null;
}
export interface UserProfile {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  city?: string;
  photoURL?: string | null;
  dob?: string | null;
  gender?: string | null;
  phone?: string | null;
  income?: string | null;
  demat_ac?: string | null;
  bank_ac?: string | null;
  pan_number?: string | null;
  aadhar_number?: string | null;
  role?: {
    isAdmin: boolean,
    isUser: boolean
  }
}

export interface LoginForm {
  phone: string;
  otp: string;
  name: string;
  email: string;
  city: string;
}