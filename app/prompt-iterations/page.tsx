import React from 'react';

export default function PromptIterationsPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="page-header">
        <div>
          <h1>Prompt Iterations</h1>
          <p>Evolution of the agent prompt from initial draft to final production readiness.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* First Prompt */}
        <div className="card stack">
          <h2>First Prompt</h2>
          <div style={{ padding: '16px', background: '#1e293b', borderRadius: '8px', fontSize: '0.9rem', fontStyle: 'italic', color: '#cbd5e1' }}>
            "You are a helpful customer service AI for Tiger Credit Card. Speak in English and Hindi. Guide the user through their pending KYC steps (eKYC, VKYC, or Activation). Answer their questions about the card benefits and joining fee. If they want a WhatsApp link, send it."
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ color: '#f87171' }}>Observed Issues in Testing</h3>
            <ul style={{ paddingLeft: '20px', color: '#fca5a5', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Too verbose:</strong> Responses were paragraph-length, causing severe latency and unnatural voice interactions.</li>
              <li><strong>Weak Guardrails:</strong> Eagerly accepted PII (like OTPs/CVVs) instead of rejecting them.</li>
              <li><strong>VKYC Window Ignored:</strong> Pushed VKYC even outside the strict 9 AM - 9 PM operating hours.</li>
              <li><strong>Hallucinations:</strong> Guessed policies for fee waivers and credit limit increases that do not exist.</li>
              <li><strong>Language Confusion:</strong> Did not explicitly handle Hinglish mixed-code utterances correctly.</li>
            </ul>
          </div>
        </div>

        {/* Final Prompt */}
        <div className="card stack">
          <h2 style={{ color: '#10b981' }}>Final Prompt</h2>
          <div style={{ padding: '16px', background: '#064e3b', borderRadius: '8px', fontSize: '0.9rem', fontStyle: 'italic', color: '#a7f3d0' }}>
            (See Prompt Blueprint tab for full system instruction set. Heavily constrained, role-bound, and deterministic.)
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ color: '#34d399' }}>Final Prompt Improvements</h3>
            <ul style={{ paddingLeft: '20px', color: '#6ee7b7', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Shortened responses:</strong> Forced concise, voice-friendly conversational turns.</li>
              <li><strong>Explicit PII block:</strong> Added explicit no-OTP/no-sensitive-data rule.</li>
              <li><strong>Policy constraints:</strong> Explicit instruction never to guarantee fee waivers, limit increases, or KYC approvals.</li>
              <li><strong>Strict tool usage:</strong> WhatsApp only sent with explicit consent. Callbacks require a parsable time.</li>
              <li><strong>Opt-out & Escalation:</strong> Clear triggers for human escalation (e.g. ad disputes, state mismatch) and absolute handling of opt-out requests.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
