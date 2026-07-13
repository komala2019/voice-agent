'use client';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedCustomers, seedLogs } from '@/lib/seed-data';
import { Customer, InteractionLog } from '@/lib/types';

export type ClientDataContextType = {
  customers: Customer[];
  setCustomers: (c: Customer[] | ((prev: Customer[]) => Customer[])) => void;
  logs: InteractionLog[];
  setLogs: (l: InteractionLog[] | ((prev: InteractionLog[]) => InteractionLog[])) => void;
};

const Ctx = createContext<ClientDataContextType | null>(null);

export function ClientDataProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);
  const [logs, setLogs] = useState<InteractionLog[]>(seedLogs);

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

  const value = useMemo(() => ({ customers, setCustomers, logs, setLogs }), [customers, logs]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useClientData() { 
  const ctx = useContext(Ctx); 
  if (!ctx) throw new Error("useClientData must be used within ClientDataProvider");
  return ctx; 
}
