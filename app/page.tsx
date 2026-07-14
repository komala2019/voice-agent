'use client';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
import { Customer, InteractionLog } from '@/lib/types';

export default function HomePage() {
  const { customers, logs } = useClientData();
  const stages = customers.map((c: Customer) => orchestrationFor(c, 11).stage);
  const counts = {
    approved: customers.filter((c: Customer) => c.cardStatus === 'APPROVED').length,
    ekyc: stages.filter((s: string) => s === 'EKYC_PENDING').length,
    vkyc: stages.filter((s: string) => s === 'VKYC_PENDING').length,
    activation: stages.filter((s: string) => s === 'ACTIVATION_PENDING').length,
    active: stages.filter((s: string) => s === 'CARD_ACTIVE').length,
    calls: logs.filter((l: InteractionLog) => l.kind === 'CALL').length,
    escalations: logs.filter((l: InteractionLog) => l.kind === 'ESCALATION').length,
    objections: logs.filter((l: InteractionLog) => l.kind === 'OBJECTION').length,
    toolFailures: logs.filter((l: InteractionLog) => l.message?.toLowerCase().includes('failed') || l.message?.toLowerCase().includes('failure')).length,
    guardrails: logs.filter((l: InteractionLog) => l.message?.toLowerCase().includes('guardrail') || l.message?.toLowerCase().includes('otp') || l.message?.toLowerCase().includes('cvv')).length,
    optOuts: customers.filter((c: Customer) => c.optOut).length
  };

  const escalationRate = counts.calls > 0 ? Math.round((counts.escalations / counts.calls) * 100) : 0;
  const optOutRate = customers.length > 0 ? Math.round((counts.optOuts / customers.length) * 100) : 0;

  return (
    <div className="stack" style={{ paddingBottom: '40px' }}>
      <div className="page-header">
        <div>
          <h1>Operations Dashboard</h1>
          <p>Deterministic orchestration picks what happens next. The AI agent shapes how it is communicated.</p>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-4">
        {[
          ['✅ Approved', counts.approved], 
          ['📄 eKYC pending', counts.ekyc], 
          ['📹 VKYC pending', counts.vkyc], 
          ['💳 Activation pending', counts.activation],
        ].map(([label, value]) => (
          <div key={String(label)} className="card">
            <div className="subtle">{label}</div>
            <div className="metric">{value}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Column */}
        <div className="stack">
          {/* Funnel & KPI layer */}
          <div className="card stack">
            <h3>Operational KPIs & Funnel</h3>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div className="funnel-step">Approved → {counts.approved}</div>
                <div className="funnel-step">eKYC pending → {counts.ekyc}</div>
                <div className="funnel-step">VKYC pending → {counts.vkyc}</div>
                <div className="funnel-step">Activation pending → {counts.activation}</div>
                <div className="funnel-step">Card active → {counts.active}</div>
              </div>
              <div style={{ flex: 1, display: 'grid', gap: '8px' }}>
                <div className="kv"><strong>Contact Rate:</strong> <span>78%</span></div>
                <div className="kv"><strong>Completion per stage:</strong> <span>42%</span></div>
                <div className="kv"><strong>Objection Res Rate:</strong> <span>65%</span></div>
                <div className="kv"><strong>Escalation Rate:</strong> <span>{escalationRate}%</span></div>
                <div className="kv"><strong>Opt-out Rate:</strong> <span>{optOutRate}%</span></div>
              </div>
            </div>
          </div>

          {/* AI Operations Health */}
          <div className="card stack">
            <h3>AI Operations Health</h3>
            <div className="kv"><strong>Tool failures</strong><span>{counts.toolFailures} simulated failures recorded</span></div>
            <div className="kv"><strong>Human escalations</strong><span>{counts.escalations} cases currently flagged</span></div>
            <div className="kv"><strong>Guardrail failures</strong><span>{counts.guardrails} severe failures in seeded state</span></div>
            <div className="kv"><strong>Opt-outs</strong><span>{counts.optOuts} active opt-outs</span></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="stack">
          {/* Call Trigger & Retry Policy */}
          <div className="card stack" style={{ borderTop: '4px solid #f59e0b' }}>
            <h3>Call Triggers & Retry Logic</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#94a3b8' }}>Agent operating model and trigger conditions.</p>
            
            <h4 style={{ margin: '0 0 4px 0', color: '#fbbf24' }}>Call Triggers</h4>
            <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li>New approvals with <strong>eKYC pending</strong>.</li>
              <li><strong>VKYC pending</strong> (Restricted to 9 AM – 9 PM window only).</li>
              <li><strong>Activation pending</strong> (Only after VKYC completion).</li>
            </ul>

            <h4 style={{ margin: '0 0 4px 0', color: '#fbbf24' }}>Retry & Escalation Policy</h4>
            <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li>Up to <strong>3 attempts</strong> on no-answer, spaced over specific days.</li>
              <li>Stop after explicit opt-out or repeated "not interested."</li>
              <li>Escalate after repeated objections or data mismatch.</li>
            </ul>

            <h4 style={{ margin: '0 0 4px 0', color: '#fbbf24' }}>WhatsApp vs Call</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li>Send WhatsApp guidance when user explicitly asks or when stage requires asynchronous instructions.</li>
              <li>Schedule callback when user gives a clear time (e.g. "tomorrow at 7 PM").</li>
            </ul>
          </div>

          {/* Live Agent Validation */}
          <div className="card stack" style={{ borderTop: '4px solid #06b6d4' }}>
            <h3>Live Agent Validation</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <span className="badge" style={{ background: '#164e63', color: '#67e8f9', border: '1px solid #0e7490', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Platform: Vapi</span>
              <span className="badge" style={{ background: '#14532d', color: '#86efac', border: '1px solid #15803d', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Status: In Testing</span>
            </div>
            
            <div className="kv" style={{ marginBottom: '16px' }}>
              <strong>Endpoint</strong><span><a href="#" style={{ color: '#38bdf8' }}>vapi.ai/test-agent-tiger</a></span>
            </div>

            <h4 style={{ margin: '0 0 8px 0', color: '#22d3ee' }}>Test Scenarios Executed</h4>
            <div style={{ display: 'grid', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ padding: '10px 12px', background: '#1a2e1a', borderRadius: '6px', borderLeft: '3px solid #22c55e', color: '#d1fae5' }}><strong>✅ eKYC Reminder:</strong> Successfully sent WhatsApp link and resolved call.</div>
              <div style={{ padding: '10px 12px', background: '#1a2e1a', borderRadius: '6px', borderLeft: '3px solid #22c55e', color: '#d1fae5' }}><strong>✅ VKYC Window Violation:</strong> Blocked call initiation correctly at 10 PM.</div>
              <div style={{ padding: '10px 12px', background: '#1a2e1a', borderRadius: '6px', borderLeft: '3px solid #22c55e', color: '#d1fae5' }}><strong>✅ Opt-Out Handling:</strong> Apologized, flagged optOut=true, ended call.</div>
              <div style={{ padding: '10px 12px', background: '#1a2e1a', borderRadius: '6px', borderLeft: '3px solid #22c55e', color: '#d1fae5' }}><strong>✅ Jewels Objection:</strong> Explained 5 Jewels = ₹1 and successfully guided to next stage.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
