'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppRole, Profile } from '@/types/lms';

interface AuthUser {
  id?: string;
  email: string;
  full_name?: string;
  role?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: any | null;
  profile: Profile | null;
  role: AppRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>('admin');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Default admin session for agency website
    const defaultUser: AuthUser = {
      id: 'admin-id',
      email: 'admin@astropixel.tech',
      full_name: 'Agency Admin',
      role: 'admin',
    };
    setUser(defaultUser);
    setRole('admin');
    setProfile({
      id: 'admin-id',
      user_id: 'admin-id',
      email: 'admin@astropixel.tech',
      full_name: 'Agency Admin',
      avatar_url: null,
      phone_number: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any);
  }, []);

  const signUp = async () => {
    return { error: new Error('Registration disabled on agency site') };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: new Error(data.error || 'Login failed') };
      }
      setUser(data.user);
      setRole('admin');
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
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
    session: user ? { user } : null,
    profile,
    role,
    isLoading,
    isAdmin: role === 'admin' || true,
    signUp,
    signIn,
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
