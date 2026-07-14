import React from 'react';

export default function CheatSheetPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto', paddingBottom: '40px', background: '#fcfcfc' }}>
      
      {/* 1. Header Card */}
      <div className="card" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ background: '#d4ebd3', color: '#2a5b28', padding: '4px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>One-Page Study Artifact</span>
        </div>
        <h1 style={{ margin: '0 0 12px', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>AI Observability Cheat Sheet</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 24px', maxWidth: '800px', lineHeight: 1.5 }}>
          For Product Managers: understand why an AI response happened, whether it was good, and what to improve across prompts, retrieval, models, tools, cost, and business impact.
        </p>
        
        <div className="grid grid-3">
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Definition</div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Behavior visibility</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>Moves beyond uptime to quality, reasoning, compliance, and outcomes.</div>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Core Lens</div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Trace + Eval + Alert</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>Follow the request path, score outputs, then surface failures fast.</div>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>PM Goal</div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Ship with visibility</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>Know quality, reliability, brand safety, and cost before users complain.</div>
          </div>
        </div>
      </div>

      {/* 2. Why this is different */}
      <div className="card" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ background: '#d4ebd3', color: '#2a5b28', padding: '4px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Traditional vs AI</span>
        </div>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: 800 }}>Why this is different</h2>
        
        <div className="grid grid-2" style={{ gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Traditional Software</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>Input → Code → Output</li>
              <li>Deterministic</li>
              <li>Easy to debug</li>
              <li>Monitor servers</li>
            </ul>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>AI Systems</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>Prompt + Context + KB + Model + Tools → Output</li>
              <li>Probabilistic</li>
              <li>Needs traces and evaluations</li>
              <li>Monitor AI behavior</li>
            </ul>
          </div>
        </div>
        
        <div style={{ background: '#f0ede4', padding: '16px', borderRadius: '8px', border: '1px solid #e3dec9', marginTop: '20px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Mental Shortcut</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#3d382d' }}>Traditional monitoring asks: <strong>Is the system up?</strong> AI observability asks: <strong>What did it do, was it good, and why?</strong></div>
        </div>
      </div>

      {/* 3. System Architecture */}
      <div className="card" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ background: '#d4ebd3', color: '#2a5b28', padding: '4px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Architecture</span>
        </div>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: 800 }}>How the system works</h2>
        
        {/* Diagram Mockup */}
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '12px 24px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>User</div>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>+</span>
            <div style={{ padding: '12px 24px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Prompt<br/>Template</div>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>+</span>
            <div style={{ padding: '12px 24px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Context /<br/>Memory</div>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>+</span>
            <div style={{ padding: '12px 24px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Knowledge<br/>Base (RAG)</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>↓</span>
            <div style={{ padding: '12px 24px', background: 'white', border: '2px solid var(--primary)', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-2)' }}>LLM<br/>Model</div>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>↓</span>
            <div style={{ padding: '12px 24px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tools /<br/>APIs +<br/>Response</div>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '20px', marginTop: '20px' }}>
          <div style={{ background: '#fdfdfc', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Inputs to observe</div>
            <div className="stack" style={{ gap: '12px' }}>
              <div><strong style={{ display: 'block', fontSize: '0.9rem' }}>Brand voice</strong><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Friendly, professional, helpful, empathetic.</span></div>
              <div><strong style={{ display: 'block', fontSize: '0.9rem' }}>Brand tone</strong><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Situation-specific formality, confidence, positivity.</span></div>
              <div><strong style={{ display: 'block', fontSize: '0.9rem' }}>Prompt</strong><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Version, length, token usage, latency, success rate.</span></div>
              <div><strong style={{ display: 'block', fontSize: '0.9rem' }}>Knowledge base</strong><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Relevance, freshness, coverage, retrieval quality.</span></div>
            </div>
          </div>
          <div style={{ background: '#fdfdfc', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>What a trace answers</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>Where did the request fail?</li>
              <li>Which tool or API was called?</li>
              <li>Which documents were retrieved?</li>
              <li>How long did each step take?</li>
              <li>Was the issue model quality or system dependency?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Metrics & Evals */}
      <div className="card" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ background: '#d4ebd3', color: '#2a5b28', padding: '4px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Metrics</span>
        </div>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: 800 }}>What to measure</h2>

        <div className="grid grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px' }}>A. Infrastructure</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>API availability</li>
              <li>Latency</li>
              <li>Server uptime</li>
              <li>Memory / CPU / GPU</li>
              <li>Rate limits</li>
            </ul>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px' }}>B. AI Quality</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>Hallucinations</li>
              <li>Prompt quality</li>
              <li>Retrieval quality</li>
              <li>Groundedness</li>
              <li>Safety & toxicity</li>
              <li>Brand compliance</li>
            </ul>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px' }}>C. Business Impact</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>CSAT</li>
              <li>Resolution rate</li>
              <li>Escalation rate</li>
              <li>Token cost</li>
              <li>Conversion</li>
              <li>Retention</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '20px' }}>
          <div style={{ background: '#fdfdfc', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Evaluation Pipeline</div>
            <div className="stack" style={{ gap: '10px' }}>
              <div style={{ padding: '10px 14px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Question → AI response</div>
              <div style={{ padding: '10px 14px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem' }}><strong>Automatic evaluations</strong> → correctness, groundedness, semantic quality</div>
              <div style={{ padding: '10px 14px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem' }}><strong>Policy checks</strong> → brand compliance and safety</div>
              <div style={{ padding: '10px 14px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem' }}><strong>Output</strong> → overall score, dashboard, alerts</div>
            </div>
          </div>
          <div style={{ background: '#fdfdfc', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Useful Alerts</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 2, listStyleType: 'none', marginLeft: '-20px' }}>
              <li><span style={{ color: 'var(--error)', marginRight: '8px' }}>🚨</span>API latency &gt; 5 seconds</li>
              <li><span style={{ color: 'var(--error)', marginRight: '8px' }}>🚨</span>Hallucination rate &gt; 10%</li>
              <li><span style={{ color: 'var(--error)', marginRight: '8px' }}>🚨</span>Retrieval failed or stale docs returned</li>
              <li><span style={{ color: 'var(--error)', marginRight: '8px' }}>🚨</span>Brand guideline or legal violation</li>
              <li><span style={{ color: 'var(--error)', marginRight: '8px' }}>🚨</span>Cost per request increased by 30%</li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}
