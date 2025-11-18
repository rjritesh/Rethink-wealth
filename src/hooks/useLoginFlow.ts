// hooks/useLoginFlow.ts
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/services/firebase";
import { updateProfile, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { sendOtp, otpVerification } from "@/services/authentication";
import { LoginForm } from "@/types/auth.types";
import { useAuth } from "@/context/AuthContext";

export const STEPS = {
  PHONE: "PHONE",
  OTP: "OTP",
  PROFILE: "PROFILE",
} as const;

export type LoginStep = keyof typeof STEPS;

const FORM_STORAGE_KEY = "login_flow_data";
const AUTH_STORAGE_KEY = "auth_token";

export const useLoginFlow = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();

  const [step, setStep] = useState<LoginStep>(STEPS.PHONE);
  const [form, setForm] = useState<LoginForm>(() => {
    // Recover form data from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        phone: "",
        otp: "",
        name: "",
        email: "",
        city: "",
      };
    }
    return {
      phone: "",
      otp: "",
      name: "",
      email: "",
      city: "",
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirect = searchParams.get('from') || '/';

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profile = docSnap.data();
          if (profile?.name && profile?.email && profile?.city) {
            // User has complete profile
            setUser({
              uid: user.uid,
              email: profile.email,
              phone: profile.phone || user.phoneNumber || '',
              city: profile.city,
              displayName: profile.name,
            });
            clearStorage();
            router.push(redirect);
          } else {
            // User needs to complete profile
            setForm(prev => ({
              ...prev,
              phone: user.phoneNumber || prev.phone,
              name: user.displayName || prev.name
            }));
            setStep(STEPS.PROFILE);
          }
        } else {
          // New user needs to complete profile
          setForm(prev => ({
            ...prev,
            phone: user.phoneNumber || prev.phone,
            name: user.displayName || prev.name
          }));
          setStep(STEPS.PROFILE);
        }
      }
    });

    return () => unsubscribe();
  }, [router, redirect, setUser]);

  // Persist form data to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
    }
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(FORM_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const sendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.phone.match(/^(\+91|91|0)?[6-9]\d{9}$/)) {
      setError('Please enter a valid Indian phone number');
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await sendOtp(form.phone);

      if (data.success) {
        setStep(STEPS.OTP);
      } else {
        setError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('OTP send error:', err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await otpVerification(form.phone, form.otp);

      if (data.token) {
        // Store token in localStorage in case of refresh
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, data.token);
        }

        const userData = await signInWithCustomToken(auth, data.token);
        const user = userData.user;

        if (!user) {
          setError("Authentication failed. Please try again.");
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profile = docSnap.data();
          if (profile?.name && profile?.email && profile?.city) {
            setUser({
              uid: user.uid,
              email: profile.email,
              phone: profile.phone,
              city: profile.city,
              displayName: profile.name,
            });
            clearStorage();
            router.push(redirect);
          } else {
            setStep(STEPS.PROFILE);
          }
        } else {
          setStep(STEPS.PROFILE);
        }
      } else {
        setError(data.error || 'OTP verification failed. Please try again.');
      }
    } catch (err) {
      setError('Server error during verification. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitProfile = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!form.name || !form.email || !form.city) {
      setError('Please fill in all fields');
      return;
    }

    if (!form.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError("");
      const user = auth.currentUser;

      if (!user) {
        // Try to recover from localStorage
        const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
        if (token) {
          await submitProfile();
          return;
        }

        setError('Session expired. Please start again.');
        setStep(STEPS.PHONE);
        clearStorage();
        return;
      }

      // Update Firebase auth profile
      if (!user.displayName && form.name) {
        await updateProfile(user, { displayName: form.name });
      }

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: form.email,
        phone: form.phone,
        name: form.name,
        city: form.city,
        role: {
          isUser: true,
          isAdmin: false
        },
        createdAt: new Date(),
      }, { merge: true });

      // Update local state
      setUser({
        uid: user.uid,
        email: form.email,
        phone: form.phone,
        city: form.city,
        displayName: form.name,
      });
      clearStorage();
      router.push(redirect);
    } catch {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    form,
    loading,
    error,
    redirect,
    handleChange,
    sendOTP,
    verifyOTP,
    submitProfile,
  };
};