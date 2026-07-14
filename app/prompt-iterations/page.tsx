import React from 'react';

export default function PromptIterationsPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto', paddingBottom: '40px' }}>
      <div className="page-header">
        <div>
          <h1>Prompt Iterations</h1>
          <p>Evolution of the agent prompt from initial draft to final production readiness.</p>
        </div>
      </div>

      <div className="grid grid-2">
        {/* First Prompt */}
        <div className="card stack">
          <h2 style={{ margin: 0 }}>V1 — First Prompt</h2>
          <div style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: '12px', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--muted)', borderLeft: '4px solid var(--border)' }}>
            "You are a helpful customer service AI for Tiger Credit Card. Speak in English and Hindi. Guide the user through their pending KYC steps. Answer their questions about the card benefits and joining fee. If they want a WhatsApp link, send it."
          </div>

          <div>
            <h3 style={{ color: 'var(--error)', margin: '0 0 8px' }}>⚠️ Observed Issues in Testing</h3>
            <div className="stack" style={{ gap: '8px' }}>
              {[
                { label: 'Too verbose', desc: 'Responses were paragraph-length, causing severe latency and unnatural voice interactions.' },
                { label: 'Weak Guardrails', desc: 'Eagerly accepted PII (like OTPs/CVVs) instead of rejecting them.' },
                { label: 'VKYC Window Ignored', desc: 'Pushed VKYC even outside the strict 9 AM – 9 PM operating hours.' },
                { label: 'Hallucinations', desc: 'Guessed policies for fee waivers and credit limit increases that do not exist.' },
                { label: 'Language Confusion', desc: 'Did not explicitly handle Hinglish mixed-code utterances correctly.' },
                { label: 'Repetitive Looping', desc: 'Repeated the same explanation verbatim when the user asked unrecognized questions. Got stuck in loops.' },
              ].map((item) => (
                <div key={item.label} style={{ padding: '10px 12px', background: 'var(--surface-2)', borderRadius: '8px', borderLeft: '3px solid var(--error)', fontSize: '0.85rem' }}>
                  <strong>{item.label}:</strong> <span style={{ color: 'var(--muted)' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Prompt */}
        <div className="card stack">
          <h2 style={{ margin: 0, color: 'var(--success)' }}>V3 — Final Prompt</h2>
          <div style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: '12px', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--muted)', borderLeft: '4px solid var(--success)' }}>
            Heavily constrained, role-bound, and deterministic. See the Prompt Blueprint tab for the complete system instruction set.
          </div>

          <div>
            <h3 style={{ color: 'var(--success)', margin: '0 0 8px' }}>✅ Final Prompt Improvements</h3>
            <div className="stack" style={{ gap: '8px' }}>
              {[
                { label: 'Shortened responses', desc: 'Forced concise, voice-friendly conversational turns under 2 sentences.' },
                { label: 'Explicit PII block', desc: 'Added explicit no-OTP/no-sensitive-data rule. Agent rejects and does not repeat.' },
                { label: 'Policy constraints', desc: 'Explicit instruction never to guarantee fee waivers, limit increases, or KYC approvals.' },
                { label: 'Strict tool usage', desc: 'WhatsApp only sent with explicit consent. Callbacks require a parsable time.' },
                { label: 'Opt-out & Escalation', desc: 'Clear triggers for human escalation (ad disputes, state mismatch) and absolute handling of opt-out.' },
                { label: 'Hindi/Hinglish rules', desc: 'Explicit handling for Hinglish mixed-code utterances with keyword matching.' },
                { label: 'Anti-loop guardrail', desc: 'Tracks last 2 responses. Rephrases on first repeat, escalates to human on second. Never loops more than twice.' },
                { label: 'Conversation progression', desc: 'Each response must do exactly one of 6 valid actions. If none apply, politely end the call.' },
              ].map((item) => (
                <div key={item.label} style={{ padding: '10px 12px', background: 'var(--surface-2)', borderRadius: '8px', borderLeft: '3px solid var(--success)', fontSize: '0.85rem' }}>
                  <strong>{item.label}:</strong> <span style={{ color: 'var(--muted)' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Iteration Timeline */}
      <div className="card">
        <h3 style={{ margin: '0 0 12px' }}>Iteration Timeline</h3>
        <div className="timeline">
          <div className="timeline-step done">
            <div style={{ fontWeight: 700 }}>V1</div>
            <div style={{ fontSize: '0.75rem' }}>Broad, helpful,<br/>stage-aware</div>
          </div>
          <div className="timeline-step done">
            <div style={{ fontWeight: 700 }}>V2</div>
            <div style={{ fontSize: '0.75rem' }}>+ PII guardrails,<br/>+ policy constraints</div>
          </div>
          <div className="timeline-step current">
            <div style={{ fontWeight: 700 }}>V3</div>
            <div style={{ fontSize: '0.75rem' }}>+ Anti-loop,<br/>+ progression rule</div>
          </div>
        </div>
      </div>
    </div>
  );
}
