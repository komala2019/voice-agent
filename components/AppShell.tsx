'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';

const nav = [
  { href: '/', label: 'Overview' },
  { href: '/help', label: 'How to Use' },
  { href: '/customers', label: 'Customer Queue' },
  { href: '/playground', label: 'Agent Playground' },
  { href: '/evaluations', label: 'Evaluations' },
  { href: '/system-design', label: 'System Design' },
  { href: '/prompt-iterations', label: 'Prompt Iterations' },
  { href: '/prompt-blueprint', label: 'Prompt Blueprint' },
  { href: '/agent-blueprint', label: 'Agent Mega-Prompt' },
  { href: '/codex', label: 'Codex Spec' },
  { href: '/next-steps', label: 'Path to Production' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/presentation', label: 'Presentation' }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="shell">
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <div className="logo" style={{ marginBottom: 0 }}>
          <div className="logo-mark">T</div>
          <div>
            <div style={{ fontWeight: 700 }}>Tiger AI Voice</div>
            <div className="small subtle">Onboarding ops console</div>
          </div>
        </div>
        <button 
          className="btn btn-secondary mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="logo desktop-only">
          <div className="logo-mark">T</div>
          <div>
            <div>Tiger AI Voice</div>
            <div className="small subtle">Onboarding ops console</div>
          </div>
        </div>
        <nav className="nav">
          {nav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
