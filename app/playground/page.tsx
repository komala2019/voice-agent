'use client';
import { useMemo, useState, useEffect } from 'react';
import { useClientData } from '@/components/ClientData';
import { Badge } from '@/components/Badge';
import { orchestrationFor } from '@/lib/orchestration';
import { VoiceAgent } from '@/components/VoiceAgent';
import { Customer } from '@/lib/types';

export default function PlaygroundPage() {
  const { customers } = useClientData();
  const [customerId, setCustomerId] = useState(customers[0].id);
  const customer = useMemo(() => customers.find((c: Customer) => c.id === customerId), [customers, customerId]);
  
  if (!customer) return null;
  const state = orchestrationFor(customer, 11);

  return <div className="stack">
    <div className="page-header"><div><h1>Agent Playground</h1><p>Source state → resolved stage → next best action → agent conversation.</p></div></div>
    <div className="toolbar">
      <select className="select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
        {customers.map((c: Customer) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>
    
    <div className="card stack">
      <h3>Customer context</h3>
      <div className="grid grid-4">
        <div className="kv"><strong>Name</strong><span>{customer.name}</span></div>
        <div className="kv"><strong>Language</strong><span>{customer.language}</span></div>
        <div className="kv"><strong>Resolved stage</strong><span><Badge value={state.stage} tone={`stage-${state.stage}`} /></span></div>
        <div className="kv"><strong>Next action</strong><span><Badge value={state.action} tone={`action-${state.action}`} /></span></div>
      </div>
    </div>
    
    <VoiceAgent customerId={customerId} />
  </div>;
}
