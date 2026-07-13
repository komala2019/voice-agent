'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/Badge';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
import { Customer } from '@/lib/types';
export default function CustomersPage() {
  const { customers } = useClientData();
  const [stageFilter, setStageFilter] = useState('ALL');
  const [objectionFilter, setObjectionFilter] = useState('ALL');
  const [needsEsc, setNeedsEsc] = useState(false);
  const rows = useMemo(() => customers.map((c: Customer) => ({ ...c, ...orchestrationFor(c, 11) })).filter((c: Customer & ReturnType<typeof orchestrationFor>) =>
    (stageFilter === 'ALL' || c.stage === stageFilter) &&
    (objectionFilter === 'ALL' || c.previousObjection === objectionFilter) &&
    (!needsEsc || c.stage === 'UNKNOWN_STATE' || c.previousObjection === 'ADVERTISEMENT_DISPUTE')
  ), [customers, stageFilter, objectionFilter, needsEsc]);
  return <div className="stack"><div className="page-header"><div><h1>Customer Queue</h1><p>Review stage, next best action, objection history, and open a customer for deterministic refresh.</p></div></div>
    <div className="card">
      <div className="toolbar">
        <select className="select" value={stageFilter} onChange={(e)=>setStageFilter(e.target.value)}><option>ALL</option><option>EKYC_PENDING</option><option>VKYC_PENDING</option><option>ACTIVATION_PENDING</option><option>CARD_ACTIVE</option><option>UNKNOWN_STATE</option></select>
        <select className="select" value={objectionFilter} onChange={(e)=>setObjectionFilter(e.target.value)}><option>ALL</option><option>JOINING_FEE</option><option>JEWELS_VALUE</option><option>LOW_CREDIT_LIMIT</option><option>KYC_COMPLEXITY</option></select>
        <label className="badge"><input type="checkbox" checked={needsEsc} onChange={(e)=>setNeedsEsc(e.target.checked)} /> Needs escalation</label>
      </div>
      <div className="table-container">
        <table className="table"><thead><tr><th>Customer</th><th>Stage</th><th>Next best action</th><th>Previous objection</th><th>Retry</th><th>Last interaction</th><th>Action</th></tr></thead>
        <tbody>{rows.map((c: Customer & ReturnType<typeof orchestrationFor>)=><tr key={c.id}><td><strong>{c.name}</strong><div className="small subtle">{c.phoneMasked}</div></td><td><Badge value={c.stage} tone={`stage-${c.stage}`} /></td><td><Badge value={c.action} tone={`action-${c.action}`} /></td><td>{c.previousObjection ? <Badge value={c.previousObjection} /> : <span className="subtle">—</span>}</td><td>{c.retryCount}</td><td>{c.lastInteraction || '—'}</td><td><Link className="btn btn-secondary" href={`/customers/${c.id}?call=true`}>Start Call</Link></td></tr>)}</tbody></table>
      </div>
    </div></div>;
}
