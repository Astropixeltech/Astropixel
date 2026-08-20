'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/admin');
    }
  }, [user, role, isLoading, router]);

  return null;
}
