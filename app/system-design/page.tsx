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
        <h2 style={{ margin: '0 0 4px' }}>Data Flow & Dependencies</h2>
        <p className="subtle" style={{ margin: '0 0 16px' }}>How systems interact during the onboarding lifecycle.</p>

        <div className="stack" style={{ gap: '10px' }}>
          {[
            { from: 'CRM', to: 'Voice Agent', label: 'read', desc: 'Approved customers, current stage, retry metadata', color: 'var(--primary)' },
            { from: 'Voice Agent', to: 'KYC System', label: 'read / write', desc: 'Current eKYC/VKYC/activation status; write stage updates after successful actions', color: '#964219' },
            { from: 'Voice Agent', to: 'Dialler', label: 'notify', desc: 'Call initiation requests with priority and stage', color: '#7c3aed' },
            { from: 'Voice Agent', to: 'WhatsApp', label: 'notify', desc: 'Send templated guidance when user asks or when stage requires it', color: '#437a22' },
            { from: 'Voice Agent', to: 'CRM', label: 'write', desc: 'Log call outcome, objections, opt-out, escalations', color: 'var(--primary)' },
            { from: 'CRM', to: 'Inside Sales', label: 'notify', desc: 'Push unresolved or high-risk escalation cases', color: '#a12c7b' },
          ].map((flow) => (
            <div key={flow.from + flow.to + flow.label} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
              background: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--border)',
              flexWrap: 'wrap'
            }}>
              <div style={{ fontWeight: 700, color: flow.color, minWidth: '100px', fontSize: '0.95rem' }}>{flow.from}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                <span style={{
                  background: flow.color, color: '#fff', padding: '2px 10px',
                  borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>{flow.label}</span>
                <span style={{ fontSize: '1.2rem', color: flow.color }}>→</span>
              </div>
              <div style={{ fontWeight: 700, color: flow.color, minWidth: '100px', fontSize: '0.95rem' }}>{flow.to}</div>
              <div style={{ flex: 1, color: 'var(--muted)', fontSize: '0.85rem', minWidth: '200px' }}>{flow.desc}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '16px', padding: '16px', background: 'var(--surface-2)',
          borderRadius: '12px', borderLeft: '4px solid var(--primary)', fontStyle: 'italic', fontWeight: 600, color: 'var(--text)'
        }}>
          "Stage truth comes from source-system status, not agent memory."
        </div>

        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--surface-2)', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--warning)' }}>Dependencies</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text)' }}>
            <li>eKYC must be completed before VKYC.</li>
            <li>VKYC must be completed before activation.</li>
            <li>VKYC calls only happen in the <strong>9 AM – 9 PM</strong> window.</li>
          </ul>
        </div>
      </div>

      <div className="card stack">
        <h2 style={{ margin: '0 0 4px', color: 'var(--error)' }}>Failure & Fallbacks</h2>
        <p className="subtle" style={{ margin: '0 0 12px' }}>Explicit paths for when operations go off the happy path.</p>

        <div className="grid grid-2">
          {[
            { title: 'State Inconsistency', desc: 'If stage data is stale or inconsistent, or if the user repeatedly contradicts system state, escalate to human inside sales.', icon: '⚠️' },
            { title: 'Tool Failures', desc: 'If tools fail (e.g., WhatsApp send, callback scheduling), agent apologizes and requests manual action. Escalate after N failures.', icon: '🔧' },
            { title: 'Opt-Outs & Deactivation', desc: 'Stop outreach completely after explicit opt-out or repeated "not interested". Flag CRM to block future automated dials.', icon: '🛑' },
            { title: 'Data Mismatch', desc: 'Log data mismatches (e.g. user claims eKYC is done but system says pending) to a separate queue for operations review.', icon: '🔀' },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '12px', borderLeft: '4px solid var(--error)'
            }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>{item.icon} {item.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
