'use client';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedCustomers, seedLogs } from '@/lib/seed-data';
import { Customer, InteractionLog } from '@/lib/types';
const Ctx = createContext<any>(null);
export function ClientDataProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);
  const [logs, setLogs] = useState<InteractionLog[]>(seedLogs);
  const [failNextTool, setFailNextTool] = useState(false);
  useEffect(() => {
    const raw = localStorage.getItem('tiger-demo-state');
    if (raw) {
      const parsed = JSON.parse(raw);
      setCustomers(parsed.customers || seedCustomers);
      setLogs(parsed.logs || seedLogs);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tiger-demo-state', JSON.stringify({ customers, logs }));
  }, [customers, logs]);
  const value = useMemo(() => ({ customers, setCustomers, logs, setLogs, failNextTool, setFailNextTool }), [customers, logs, failNextTool]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useClientData() { return useContext(Ctx); }
