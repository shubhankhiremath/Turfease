'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        // User is logged in, redirect to dashboard or home page
        router.push('/');
        router.refresh();
      } else {
        // Handle cases where session is not found or there's an error
        router.push('/login');
        router.refresh();
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}