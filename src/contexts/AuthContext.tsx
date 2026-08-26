'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { AppRole, Profile } from '@/types/lms';

interface AuthUser {
  id?: string;
  email: string;
  full_name?: string;
  role?: string;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  session: any | null;
  profile: Profile | null;
  role: AppRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>('admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const isAdminUser = 
          fbUser.email?.toLowerCase() === 'sofiullahahammad@gmail.com' ||
          fbUser.email?.toLowerCase() === 'admin@astropixel.tech' ||
          (typeof window !== 'undefined' && localStorage.getItem('astropixel_admin_logged_in') === 'true');

        const authUser: AuthUser = {
          id: fbUser.uid,
          email: fbUser.email || '',
          full_name: fbUser.displayName || 'Sofiullah Ahammad (Founder & CEO)',
          role: isAdminUser ? 'admin' : 'user',
          photoURL: fbUser.photoURL,
        };
        setUser(authUser);
        setRole(isAdminUser ? 'admin' : 'user');
        setProfile({
          id: fbUser.uid,
          user_id: fbUser.uid,
          email: fbUser.email || '',
          full_name: fbUser.displayName || 'Sofiullah Ahammad (Founder & CEO)',
          avatar_url: fbUser.photoURL || null,
          phone_number: fbUser.phoneNumber || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any);
      } else {
        const hasAdminSession = typeof window !== 'undefined' && localStorage.getItem('astropixel_admin_logged_in') === 'true';
        if (hasAdminSession) {
          const adminUser: AuthUser = {
            id: 'sofiullah-admin-id',
            email: 'sofiullahahammad@gmail.com',
            full_name: 'Sofiullah Ahammad (Founder & CEO)',
            role: 'admin',
          };
          setUser(adminUser);
          setRole('admin');
          setProfile({
            id: 'sofiullah-admin-id',
            user_id: 'sofiullah-admin-id',
            email: 'sofiullahahammad@gmail.com',
            full_name: 'Sofiullah Ahammad (Founder & CEO)',
            avatar_url: null,
            phone_number: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as any);
        } else {
          setUser(null);
          setProfile(null);
          setRole(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('astropixel_admin_logged_in');
    }
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      await firebaseSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  const refreshProfile = async () => {};

  const value: AuthContextType = {
    user,
    firebaseUser,
    session: user ? { user } : null,
    profile,
    role,
    isLoading,
    isAdmin: role === 'admin',
    signUp,
    signIn,
    signInWithGoogle: signInWithGoogleHandler,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
