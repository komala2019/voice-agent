'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
import { Badge } from '@/components/Badge';
import { VoiceAgent } from '@/components/VoiceAgent';

import { Customer, InteractionLog } from '@/lib/types';

export default function CustomerDetailClient() {
  const params = useParams();
  const { customers, setCustomers, logs, setLogs } = useClientData();
  const customer = customers.find((c: Customer) => c.id === params.id)!;
  const { stage, action } = orchestrationFor(customer, 11);
  const history = logs.filter((l: InteractionLog) => l.customerId === customer.id);
  const [stagedCustomer, setStagedCustomer] = useState(customer);

  useEffect(() => {
    setStagedCustomer(customer);
  }, [customer]);

  const update = (field: string, value: string) => setStagedCustomer((prev: Customer) => ({...prev, [field]: value}));
  const handleRefresh = () => {
    setCustomers((list: Customer[]) => list.map((c: Customer) => c.id === stagedCustomer.id ? stagedCustomer : c));
    setLogs((curr: InteractionLog[]) => [...curr, { id: Math.random().toString(36).slice(2), customerId: customer.id, kind: 'SYSTEM', message: `Manual Refresh: state deterministically re-evaluated`, timestamp: new Date().toISOString() }]);
  };
  const [isCallOpen, setIsCallOpen] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('call=true')) {
      setIsCallOpen(true);
    }
  }, []);

  // ─── IMMERSIVE CALL VIEW ───
  if (isCallOpen) {
    return (
      <div className="call-view">
        <div className="call-banner">
          <div className="call-banner-left">
            <div className="call-avatar">{customer.name.charAt(0)}</div>
            <div>
              <strong style={{ fontSize: '1.1rem' }}>{customer.name}</strong>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <Badge value={stage} tone={`stage-${stage}`} />
                <Badge value={action} tone={`action-${action}`} />
              </div>
            </div>
          </div>
          <div className="call-banner-right">
            <div className="call-info-pills">
              <span className="call-pill">📞 {customer.phoneMasked}</span>
              <span className="call-pill">🌐 {customer.language}</span>
              <span className="call-pill">🔄 Retries: {customer.retryCount}</span>
            </div>
            <button className="btn btn-end-call" onClick={() => setIsCallOpen(false)}>
              ✕ End Call
            </button>
          </div>
        </div>

        <VoiceAgent customerId={customer.id} />

        {/* Compact interaction history at bottom */}
        {history.length > 0 && (
          <div className="call-history">
            <details>
              <summary className="subtle small" style={{ cursor: 'pointer' }}>📋 Interaction history ({history.length} entries)</summary>
              <div className="stack" style={{ marginTop: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                {history.map((h: InteractionLog) => (
                  <div key={h.id} style={{ fontSize: '12px', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <strong>{h.kind}</strong> — {h.message}
                    <div className="subtle" style={{ fontSize: '11px' }}>{h.timestamp}</div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    );
  }

  // ─── NORMAL DETAIL VIEW ───
  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <h1>{customer.name}</h1>
          <p>Source status → resolved stage → next best action is visible and refreshable.</p>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="card stack">
          <h3>Customer context</h3>
          <div className="kv"><strong>Phone</strong><span>{customer.phoneMasked}</span></div>
          <div className="kv"><strong>Language</strong><span>{customer.language}</span></div>
          <div className="kv"><strong>Card</strong><span>{customer.cardStatus}</span></div>
          <div className="kv"><strong>eKYC</strong><span>{customer.ekycStatus}</span></div>
          <div className="kv"><strong>VKYC</strong><span>{customer.vkycStatus}</span></div>
          <div className="kv"><strong>Activation</strong><span>{customer.activationStatus}</span></div>
          <div className="kv"><strong>Retries</strong><span>{customer.retryCount} total</span></div>
        </div>

        <div className="card stack">
          <h3>Journey timeline</h3>
          <div className="timeline">
            <div className="timeline-step done">Approved</div>
            <div className={`timeline-step ${stage==='EKYC_PENDING'?'current':customer.ekycStatus==='COMPLETED'?'done':''}`}>eKYC</div>
            <div className={`timeline-step ${stage==='VKYC_PENDING'?'current':customer.vkycStatus==='COMPLETED'?'done':''}`}>VKYC</div>
            <div className={`timeline-step ${stage==='ACTIVATION_PENDING'?'current':customer.activationStatus==='COMPLETED'?'done':''}`}>Activation</div>
            <div className={`timeline-step ${stage==='CARD_ACTIVE'?'done':''}`}>Active</div>
          </div>
          <div>
            <Badge value={stage} tone={`stage-${stage}`} /> <Badge value={action} tone={`action-${action}`} />
          </div>
        </div>

        <div className="card stack">
          <h3>Demo controls</h3>
          <label>eKYC<select className="select" value={stagedCustomer.ekycStatus} onChange={(e)=>update('ekycStatus', e.target.value)}><option>PENDING</option><option>COMPLETED</option></select></label>
          <label>VKYC<select className="select" value={stagedCustomer.vkycStatus} onChange={(e)=>update('vkycStatus', e.target.value)}><option>PENDING</option><option>COMPLETED</option></select></label>
          <label>Activation<select className="select" value={stagedCustomer.activationStatus} onChange={(e)=>update('activationStatus', e.target.value)}><option>NOT_STARTED</option><option>PENDING</option><option>COMPLETED</option></select></label>
          <button className="btn btn-primary" onClick={handleRefresh}>Refresh Customer State</button>
          <button className="btn btn-primary" style={{ background: '#01696f' }} onClick={() => setIsCallOpen(true)}>
            📞 Start Call
          </button>
        </div>
      </div>

      <div className="card stack" style={{ marginTop: '8px' }}>
        <h3>Interaction history</h3>
        {history.length ? history.map((h: InteractionLog) => (
          <div key={h.id}>
            <strong>{h.kind}</strong>
            <div>{h.message}</div>
            <div className="small subtle">{h.timestamp}</div>
          </div>
        )) : <div className="subtle">No interactions logged yet.</div>}
      </div>
    </div>
  );
}
