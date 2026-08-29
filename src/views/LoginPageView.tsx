'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield, ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function LoginPageView() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('ইমেইল এবং পাসওয়ার্ড দিন');
      return;
    }
    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    setIsLoading(true);
    const { error } = isRegister ? await signUp(email, password) : await signIn(email, password);
    setIsLoading(false);

    if (error) {
      if (error.message?.includes('auth/invalid-credential')) {
        toast.error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');
      } else if (error.message?.includes('auth/email-already-in-use')) {
        toast.error('এই ইমেইলটি ইতিমধ্যেই নিবন্ধিত');
      } else {
        toast.error(error.message || 'অথেন্টিকেশন সাময়িক সমস্যা');
      }
      return;
    }

    toast.success(isRegister ? 'একাউন্ট সফলভাবে তৈরি হয়েছে!' : 'সফলভাবে লগইন হয়েছে!');
    
    const formattedEmail = email.toLowerCase().trim();
    const isAdmin = formattedEmail === 'sofiullahahammad@gmail.com' || formattedEmail === 'admin@astropixel.tech';
    
    if (isAdmin) {
      // Request admin session cookie
      try {
        await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formattedEmail })
        });
        localStorage.setItem('astropixel_admin_logged_in', 'true');
      } catch (e) { console.error(e); }
      window.location.href = '/admin';
    } else {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    setIsLoading(false);

    if (error) {
      toast.error(error.message || 'গুগল সাইন-ইন সম্পন্ন হয়নি');
      return;
    }

    toast.success('গুগল দিয়ে সফলভাবে লগইন হয়েছে!');
    
    // For Google login, force reload to home so AuthContext can evaluate admin state
    window.location.href = '/'; 
  };

  return (
    <>
      <SEO
        title={isRegister ? "Register | AstroPixel" : "Login | AstroPixel"}
        description="AstroPixel Agency Firebase Authentication portal for client login and account creation."
        canonical="https://astropixel.tech/login"
      />

      <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[110px]" />
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
            className="bg-card/80 border border-border/80 rounded-3xl p-7 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
                {isRegister ? <UserPlus className="w-7 h-7" /> : <LogIn className="w-7 h-7" />}
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                {isRegister ? 'একাউন্ট তৈরি করুন' : 'সাইন ইন করুন'}
              </h1>
              <p className="text-sm text-muted-foreground">
                AstroPixel পোর্টাল সুবিধা পেতে লগইন বা রেজিস্ট্রেশন করুন
              </p>
            </div>



            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-sm font-medium">ইমেইল ঠিকানা</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-background/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-pass" className="text-sm font-medium">পাসওয়ার্ড</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-pass"
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
                className="w-full h-12 rounded-xl text-base font-bold bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    প্রসেস হচ্ছে...
                  </>
                ) : isRegister ? (
                  'একাউন্ট রেজিস্টার করুন'
                ) : (
                  'লগইন করুন'
                )}
              </Button>
            </form>

            {/* Toggle Signin / Register */}
            <div className="text-center text-sm text-muted-foreground pt-2 border-t border-border/60">
              {isRegister ? 'ইতিমধ্যেই একাউন্ট আছে?' : 'একাউন্ট নেই?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="font-bold text-cyan-400 hover:underline ml-1"
              >
                {isRegister ? 'লগইন করুন' : 'নিবন্ধন করুন'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
