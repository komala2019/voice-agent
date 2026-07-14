import React from 'react';

export default function SystemDesignPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="page-header">
        <div>
          <h1>System Design</h1>
          <p>Deterministic orchestration decides <strong>what</strong> should happen next; the voice agent decides <strong>how</strong> to communicate it safely and effectively.</p>
        </div>
      </div>

      <div className="card stack">
        <h2>Data Flow & Dependencies</h2>
        <div style={{ padding: '24px', background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#38bdf8' }}>CRM</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[read] approved customers, stage, retry metadata</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>→</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#a855f7' }}>Voice Agent</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#a855f7' }}>Voice Agent</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[read/write] current status (eKYC/VKYC)</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>↔</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#f59e0b' }}>KYC System</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#a855f7' }}>Voice Agent</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[notify] place call requests</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>→</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#ec4899' }}>Dialler</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#a855f7' }}>Voice Agent</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[notify] send guidance template</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>→</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#22c55e' }}>WhatsApp</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#a855f7' }}>Voice Agent</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[write] log outcome, objection, opt-out, escalation</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>→</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#38bdf8' }}>CRM</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#38bdf8' }}>CRM</div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>[notify] push unresolved or high-risk cases</div>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>→</div>
              </div>
              <div style={{ flex: 1, fontWeight: 'bold', color: '#ef4444' }}>Inside Sales</div>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#cbd5e1', marginTop: '24px', fontStyle: 'italic', fontSize: '1.1rem' }}>
            "Stage truth comes from source-system status, not agent memory."
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <div style={{ padding: '16px', background: '#1e293b', borderRadius: '8px', flex: 1 }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fcd34d' }}>Dependencies</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1' }}>
              <li>eKYC must be completed before VKYC.</li>
              <li>VKYC must be completed before activation.</li>
              <li>VKYC calls only happen in the 9 AM–9 PM window.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card stack">
        <h2 style={{ color: '#ef4444' }}>Failure & Fallbacks</h2>
        <p>Explicit paths for when operations go off the happy path:</p>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '16px', background: '#3f1a1a', border: '1px solid #7f1d1d', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fca5a5' }}>State Inconsistency</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>If stage data is stale or inconsistent, or if the user repeatedly contradicts system state, escalate to human inside sales.</p>
          </div>
          <div style={{ padding: '16px', background: '#3f1a1a', border: '1px solid #7f1d1d', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fca5a5' }}>Tool Failures</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>If tools fail (e.g., WhatsApp send, callback scheduling), agent apologizes and requests manual action. Escalate after N failures.</p>
          </div>
          <div style={{ padding: '16px', background: '#3f1a1a', border: '1px solid #7f1d1d', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fca5a5' }}>Opt-Outs & Deactivation</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Stop outreach completely after explicit opt-out or repeated "not interested". Flag CRM to block future automated dials.</p>
          </div>
          <div style={{ padding: '16px', background: '#3f1a1a', border: '1px solid #7f1d1d', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fca5a5' }}>Data Mismatch</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Log data mismatches (e.g. user claims eKYC is done but system says pending) to a separate queue for operations review.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
