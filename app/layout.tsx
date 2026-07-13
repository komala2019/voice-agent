import './globals.css';
import { AppShell } from '@/components/AppShell';
import { ClientDataProvider } from '@/components/ClientData';
export const metadata = { title: 'Tiger AI Voice Prototype', description: 'AI voice onboarding operations console' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><ClientDataProvider><AppShell>{children}</AppShell></ClientDataProvider></body></html>;
}
