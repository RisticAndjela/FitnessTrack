import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { Slot, useRouter } from 'expo-router';

export default function RootLayoutNav() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push('/profile');
    }
  }, [isLoggedIn, router]);

  return <Slot />; 
}
