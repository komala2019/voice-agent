'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
const nav = [
  { href: '/', label: 'Overview' },
  { href: '/customers', label: 'Customer Queue' },
  { href: '/playground', label: 'Agent Playground' },
  { href: '/evaluations', label: 'Evaluations' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/presentation', label: 'Presentation' }
];
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className="shell"><aside className="sidebar"><div className="logo"><div className="logo-mark">T</div><div><div>Tiger AI Voice</div><div className="small subtle">Onboarding ops console</div></div></div><nav className="nav">{nav.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>)}</nav></aside><main className="main">{children}</main></div>;
}
