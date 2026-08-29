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

    if (firebaseErr) {
      setIsLoading(false);
      toast.error('Firebase Auth Error: ' + firebaseErr.message);
      return;
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
