'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContextProps, UserProfile } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authService = {
  async getUserProfile(uid: string) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {};
  },

  async setServerSession(token: string) {
    await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  },

  async clearServerSession() {
    await fetch('/api/session', {
      method: 'DELETE',
    });
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          const profileData = await authService.getUserProfile(firebaseUser.uid);
          const idToken = await firebaseUser.getIdToken();

          const mergedUser: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            ...profileData,
          };

          setUser(mergedUser);
          await authService.setServerSession(idToken);

          const isComplete = !!(profileData?.name && profileData?.email && profileData?.city);
          setIsProfileComplete(isComplete);

          if (!isComplete) {
            router.push('/login');
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
          });
          setIsProfileComplete(false);
          router.push('/login');
        }
      } else {
        setUser(null);
        setIsProfileComplete(null);
        await authService.clearServerSession();
        localStorage.removeItem('firebaseToken');
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    try {
      await signOut(auth);
      await authService.clearServerSession();
      localStorage.removeItem('firebaseToken');
      setUser(null);
      setIsProfileComplete(null);
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      auth.currentUser?.getIdToken().then(token => {
        localStorage.setItem('firebaseToken', token);
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, logout, loading, setUser, isProfileComplete }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
