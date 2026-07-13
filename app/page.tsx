'use client';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
export default function HomePage() {
  const { customers, logs } = useClientData();
  const stages = customers.map((c:any) => orchestrationFor(c, 11).stage);
  const counts = {
    approved: customers.filter((c:any) => c.cardStatus === 'APPROVED').length,
    ekyc: stages.filter((s:any) => s === 'EKYC_PENDING').length,
    vkyc: stages.filter((s:any) => s === 'VKYC_PENDING').length,
    activation: stages.filter((s:any) => s === 'ACTIVATION_PENDING').length,
    active: stages.filter((s:any) => s === 'CARD_ACTIVE').length,
    calls: logs.filter((l:any) => l.kind === 'CALL').length,
    escalations: logs.filter((l:any) => l.kind === 'ESCALATION').length,
    objections: logs.filter((l:any) => l.kind === 'OBJECTION').length,
    toolFailures: logs.filter((l:any) => l.message?.toLowerCase().includes('failed') || l.message?.toLowerCase().includes('failure')).length,
    guardrails: logs.filter((l:any) => l.message?.toLowerCase().includes('guardrail') || l.message?.toLowerCase().includes('otp') || l.message?.toLowerCase().includes('cvv')).length
  };
  return <div className="stack">
    <div className="page-header"><div><h1>Operations Dashboard</h1><p>Deterministic orchestration picks what happens next. The AI agent shapes how it is communicated.</p></div></div>
    <div className="grid grid-4">
      {[
        ['Approved customers', counts.approved], ['eKYC pending', counts.ekyc], ['VKYC pending', counts.vkyc], ['Activation pending', counts.activation],
        ['Active', counts.active], ['AI calls attempted', counts.calls], ['Human escalations', counts.escalations], ['Guardrail events', counts.guardrails]
      ].map(([label, value]) => <div key={String(label)} className="card"><div className="subtle">{label}</div><div className="metric">{value}</div></div>)}
    </div>
    <div className="grid grid-2">
      <div className="card stack"><h3>Conversion funnel</h3>
        <div className="funnel-step">Approved → {counts.approved}</div>
        <div className="funnel-step">eKYC pending → {counts.ekyc}</div>
        <div className="funnel-step">VKYC pending → {counts.vkyc}</div>
        <div className="funnel-step">Activation pending → {counts.activation}</div>
        <div className="funnel-step">Card active → {counts.active}</div>
      </div>
      <div className="card stack"><h3>AI Operations Health</h3>
        <div className="kv"><strong>Tool failures</strong><span>{counts.toolFailures} simulated failures recorded</span></div>
        <div className="kv"><strong>Human escalations</strong><span>{counts.escalations} cases currently flagged</span></div>
        <div className="kv"><strong>Guardrail failures</strong><span>{counts.guardrails} severe failures in seeded state</span></div>
        <div className="kv"><strong>Opt-outs</strong><span>{customers.filter((c:any) => c.optOut).length} active opt-outs</span></div>
      </div>
    </div>
  </div>;
}
