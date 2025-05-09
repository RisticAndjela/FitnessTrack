import { AuthProvider } from '@/context/authContext';
import RootLayoutNav from './nav.config';

export default function App() {
  return (
    <AuthProvider>
      <RootLayoutNav/>
    </AuthProvider>
  );
}
