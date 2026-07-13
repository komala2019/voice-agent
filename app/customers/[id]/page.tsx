'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
import { Badge } from '@/components/Badge';
export default function CustomerDetailPage() {
  const params = useParams();
  const { customers, setCustomers, logs, setLogs } = useClientData();
  const customer = customers.find((c:any) => c.id === params.id)!;
  const { stage, action } = orchestrationFor(customer, 11);
  const history = logs.filter((l:any) => l.customerId === customer.id);
  const [stagedCustomer, setStagedCustomer] = useState(customer);
  
  useEffect(() => {
    setStagedCustomer(customer);
  }, [customer]);

  const update = (field: string, value: string) => setStagedCustomer((prev:any) => ({...prev, [field]: value}));
  const handleRefresh = () => {
    setCustomers((list:any[]) => list.map((c:any) => c.id === stagedCustomer.id ? stagedCustomer : c));
    setLogs((curr:any[]) => [...curr, { id: Math.random().toString(36).slice(2), customerId: customer.id, kind: 'SYSTEM', message: `Manual Refresh: state deterministically re-evaluated`, timestamp: new Date().toISOString() }]);
  };
  return <div className="stack"><div className="page-header"><div><h1>{customer.name}</h1><p>Source status → resolved stage → next best action is visible and refreshable.</p></div></div>
    <div className="grid grid-3">
      <div className="card stack"><h3>Customer context</h3><div className="kv"><strong>Phone</strong><span>{customer.phoneMasked}</span></div><div className="kv"><strong>Language</strong><span>{customer.language}</span></div><div className="kv"><strong>Card</strong><span>{customer.cardStatus}</span></div><div className="kv"><strong>eKYC</strong><span>{customer.ekycStatus}</span></div><div className="kv"><strong>VKYC</strong><span>{customer.vkycStatus}</span></div><div className="kv"><strong>Activation</strong><span>{customer.activationStatus}</span></div></div>
      <div className="card stack"><h3>Journey timeline</h3><div className="timeline"><div className="timeline-step done">Approved</div><div className={`timeline-step ${stage==='EKYC_PENDING'?'current':customer.ekycStatus==='COMPLETED'?'done':''}`}>eKYC</div><div className={`timeline-step ${stage==='VKYC_PENDING'?'current':customer.vkycStatus==='COMPLETED'?'done':''}`}>VKYC</div><div className={`timeline-step ${stage==='ACTIVATION_PENDING'?'current':customer.activationStatus==='COMPLETED'?'done':''}`}>Activation</div><div className={`timeline-step ${stage==='CARD_ACTIVE'?'done':''}`}>Active</div></div><div><Badge value={stage} tone={`stage-${stage}`} /> <Badge value={action} tone={`action-${action}`} /></div></div>
      <div className="card stack"><h3>Demo controls</h3>
        <label>eKYC<select className="select" value={stagedCustomer.ekycStatus} onChange={(e)=>update('ekycStatus', e.target.value)}><option>PENDING</option><option>COMPLETED</option></select></label>
        <label>VKYC<select className="select" value={stagedCustomer.vkycStatus} onChange={(e)=>update('vkycStatus', e.target.value)}><option>PENDING</option><option>COMPLETED</option></select></label>
        <label>Activation<select className="select" value={stagedCustomer.activationStatus} onChange={(e)=>update('activationStatus', e.target.value)}><option>NOT_STARTED</option><option>PENDING</option><option>COMPLETED</option></select></label>
        <button className="btn btn-primary" onClick={handleRefresh}>Refresh Customer State</button>
        <div className="small subtle">Example: Priya changes from EKYC_PENDING to VKYC_PENDING after eKYC becomes COMPLETED.</div>
      </div>
    </div>
    <div className="card stack"><h3>Interaction history</h3>{history.length ? history.map((h:any)=><div key={h.id}><strong>{h.kind}</strong><div>{h.message}</div><div className="small subtle">{h.timestamp}</div></div>) : <div className="subtle">No interactions logged yet.</div>}</div>
  </div>;
}
