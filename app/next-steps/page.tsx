import React from 'react';

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Knowledge Layer & RAG Pipeline',
    color: '#7c3aed',
    items: [
      { label: 'Vector Database', desc: 'Add Pinecone / pgvector / Weaviate to store chunked product docs, T&Cs, and FAQs. Replace hardcoded prompt facts with semantic retrieval.' },
      { label: 'Document Chunking', desc: 'Chunk policy documents (card benefits, fee structures, compliance rules) into ~512-token segments with overlap for accurate retrieval.' },
      { label: 'Embedding Pipeline', desc: 'Use OpenAI ada-002 or Gemini embeddings to index product knowledge. Re-index on every policy update via CI/CD hook.' },
      { label: 'Cited Responses', desc: 'Agent responses cite the exact policy chunk they used, enabling auditability and compliance review.' },
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Real Voice & Telephony',
    color: 'var(--primary)',
    items: [
      { label: 'Voice Platform Integration', desc: 'Replace Web Speech API with Vapi / Retell / Bland.ai for production-grade STT/TTS with <500ms latency.' },
      { label: 'VAD (Voice Activity Detection)', desc: 'Add real-time interruption handling via WebSockets so the agent stops speaking when the customer talks.' },
      { label: 'SIP/PSTN Dialler', desc: 'Connect to a telephony provider (Twilio, Exotel) for real outbound calls instead of browser-based simulation.' },
      { label: 'Call Recording & Transcription', desc: 'Record all calls, auto-transcribe, and store for post-call QA and compliance audits.' },
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Production LLM & Guardrails',
    color: 'var(--success)',
    items: [
      { label: 'LLM Gateway', desc: 'Route through a gateway (LiteLLM / custom proxy) with rate limiting, fallback models, and cost tracking per call.' },
      { label: 'Guardrail Service', desc: 'Deploy a dedicated guardrail layer (NeMo Guardrails / custom) that validates every agent response before TTS.' },
      { label: 'PII Redaction', desc: 'Real-time PII detection and redaction in transcripts and logs. Mask Aadhaar, PAN, OTP, CVV before storage.' },
      { label: 'Prompt Versioning', desc: 'Version-control system prompts with A/B testing capability. Track which prompt version produces better outcomes.' },
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Enterprise Backend & Auth',
    color: 'var(--warning)',
    items: [
      { label: 'Real CRM Integration', desc: 'Replace localStorage with API calls to the actual CRM (Salesforce / internal) for customer data and stage management.' },
      { label: 'Identity & Auth', desc: 'Add SSO/OAuth for ops console access. Role-based access control for agents, supervisors, and admins.' },
      { label: 'WhatsApp Business API', desc: 'Replace mock sendWhatsApp() with actual WhatsApp Business API integration for templated messages.' },
      { label: 'Event-Driven Architecture', desc: 'Move from synchronous tool calls to Kafka/SQS event streams for scalable, decoupled processing.' },
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Analytics & Continuous Improvement',
    color: 'var(--error)',
    items: [
      { label: 'Post-Call Analytics', desc: 'Build dashboards tracking CSAT, AHT, first-call resolution, objection patterns, and conversion by cohort.' },
      { label: 'Automated Eval Pipeline', desc: 'Run golden tests on every prompt change in CI. Block deployments that regress on critical guardrails.' },
      { label: 'Human-in-the-Loop QA', desc: 'Sample 5% of calls for human review. Flag low-confidence agent turns for supervisor override.' },
      { label: 'Model Fine-Tuning', desc: 'Use successful call transcripts to fine-tune a domain-specific model that outperforms generic LLMs on Tiger-specific conversations.' },
    ]
  },
];

export default function NextStepsPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto', paddingBottom: '40px' }}>
      <div className="page-header">
        <div>
          <h1>Path to Production</h1>
          <p>What this prototype needs to become an enterprise-grade voice AI onboarding system.</p>
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7' }}>
          This prototype proves the <strong>core design thesis</strong>: deterministic orchestration decides <em>what</em> happens, 
          the AI agent decides <em>how</em> to communicate it. The sections below outline the concrete engineering work 
          required to move from demo to production, organised by deployment phase.
        </p>
      </div>

      {roadmapPhases.map((phase) => (
        <div key={phase.phase} className="card stack" style={{ borderLeft: `4px solid ${phase.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ 
              background: phase.color, color: '#fff', padding: '4px 12px', 
              borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
            }}>
              {phase.phase}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{phase.title}</h2>
          </div>

          <div className="grid grid-2">
            {phase.items.map((item) => (
              <div key={item.label} style={{ 
                padding: '14px', background: 'var(--surface-2)', borderRadius: '12px',
                borderLeft: `3px solid ${phase.color}`
              }}>
                <strong style={{ fontSize: '0.9rem' }}>{item.label}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h3 style={{ margin: '0 0 12px', color: 'var(--warning)' }}>Current Prototype vs Production</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Prototype (Now)</th>
                <th>Production (Target)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Knowledge Base', 'Hardcoded in prompt (~15 facts)', 'Vector DB + RAG with chunked docs'],
                ['Voice Engine', 'Browser Web Speech API', 'Vapi / Retell with <500ms latency'],
                ['LLM', 'Gemini 1.5 Flash (direct)', 'LLM Gateway with fallback + cost tracking'],
                ['CRM', 'localStorage mock', 'Real CRM API (Salesforce / internal)'],
                ['WhatsApp', 'Mock tool function', 'WhatsApp Business API'],
                ['Guardrails', 'Regex + rule-based checks', 'NeMo Guardrails + PII redaction service'],
                ['Auth', 'None (demo)', 'SSO / OAuth + RBAC'],
                ['Analytics', 'Seeded counters', 'Real-time dashboards + call QA pipeline'],
              ].map(([cap, now, target]) => (
                <tr key={cap}>
                  <td style={{ fontWeight: 600 }}>{cap}</td>
                  <td style={{ color: 'var(--warning)' }}>{now}</td>
                  <td style={{ color: 'var(--success)' }}>{target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
