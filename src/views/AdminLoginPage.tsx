'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield, ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, Fingerprint } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('সঠিক ইমেইল দিন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
});

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { user, role, isLoading: authLoading, signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && role === 'admin') {
      router.push('/admin');
    }
  }, [user, role, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const formattedEmail = email.trim().toLowerCase();
    if (formattedEmail !== 'sofiullahahammad@gmail.com' && formattedEmail !== 'admin@astropixel.tech') {
      toast.error('শুধুমাত্র অনুমোদিত অ্যাডমিন একাউন্ট প্রবেশ করতে পারবে');
      return;
    }

    setIsLoading(true);

    // 1. Authenticate / Auto-Register with Firebase Auth
    let { error: firebaseErr } = await signIn(formattedEmail, password);
    if (firebaseErr && (firebaseErr.message?.includes('user-not-found') || firebaseErr.message?.includes('invalid-credential'))) {
      const { error: signUpErr } = await signUp(formattedEmail, password);
      if (!signUpErr) {
        firebaseErr = null;
      }
    }

    // 2. Issue Server Session Cookie via Admin API
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formattedEmail, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        toast.error(data.error || 'ইমেইল বা পাসওয়ার্ড ভুল');
        return;
      }

      localStorage.setItem('astropixel_admin_logged_in', 'true');
      toast.success('Firebase ভেরিফাইড অ্যাডমিন সেসন সফলভাবে চালু হয়েছে!');
      window.location.href = '/admin';
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message || 'অ্যাডমিন লগইন সমস্যা');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    setIsLoading(false);

    if (error) {
      toast.error(error.message || 'গুগল ভেরিফিকেশন ব্যর্থ হয়েছে');
      return;
    }

    localStorage.setItem('astropixel_admin_logged_in', 'true');
    toast.success('গুগল দিয়ে সফলভাবে ভেরিফাইড অ্যাডমিন লগইন হয়েছে!');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          হোমে ফিরুন
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4"
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Admin Security Portal</h1>
            <p className="text-sm text-muted-foreground">Firebase Secured — শুধুমাত্র অনুমোদিত অ্যাডমিনদের জন্য</p>
          </div>

          {/* Card Form */}
          <div className="bg-card/80 border border-border/80 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-5">
            {/* Google Admin Login */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 border-border hover:bg-muted"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Admin Login</span>
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider relative z-10">অথবা</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">অ্যাডমিন ইমেইল</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="sofiullahahammad@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-background/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">পাসওয়ার্ড</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 rounded-xl bg-background/60"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-base font-bold bg-cyan-500 hover:bg-cyan-600 text-white gap-2 shadow-lg shadow-cyan-500/20" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Firebase ভেরিফাই হচ্ছে...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    Admin Login
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Security badge */}
          <div className="mt-5 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-cyan-300 font-semibold tracking-wide">Firebase & Server Encrypted Protection</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
