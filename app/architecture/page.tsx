import React from 'react';

export default function ArchitecturePage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="page-header">
        <div>
          <h1>System Architecture</h1>
          <p>High-Level Design (HLD), Low-Level Design (LLD), and Path to Production</p>
        </div>
      </div>

      {/* ═══════ HLD ═══════ */}
      <div style={{ background: '#1a1a24', borderRadius: '16px', padding: '36px', color: '#f8f8f2', border: '1px solid #333' }}>
        <h2 style={{ borderBottom: '2px solid #00dfa2', paddingBottom: '10px', marginBottom: '30px' }}>High-Level Design (Production Scale)</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {/* Top Layer */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ border: '2px solid #00dfa2', padding: '18px', borderRadius: '10px', background: '#0b192c', flex: 1, textAlign: 'center', maxWidth: '220px', minWidth: '160px' }}>
              <strong>Customer</strong><br/><small>App / Phone Call</small>
            </div>
            <div style={{ fontSize: '1.3rem' }}>↔️</div>
            <div style={{ border: '2px dashed #00dfa2', padding: '18px', borderRadius: '10px', background: '#0a1a0a', flex: 1, textAlign: 'center', maxWidth: '220px', minWidth: '160px' }}>
              <strong>VAD Layer</strong><br/><small>WebSockets / Interruptions</small>
            </div>
            <div style={{ fontSize: '1.3rem' }}>↔️</div>
            <div style={{ border: '2px solid #00dfa2', padding: '18px', borderRadius: '10px', background: '#0b192c', flex: 1, textAlign: 'center', maxWidth: '220px', minWidth: '160px' }}>
              <strong>Voice Platform</strong><br/><small>STT / TTS</small>
            </div>
          </div>

          <div style={{ fontSize: '1.3rem' }}>⬇️ ⬆️</div>

          {/* Middle Layer */}
          <div style={{ border: '2px solid #5a5', padding: '28px', borderRadius: '12px', background: '#0a1a0a', width: '100%', maxWidth: '850px' }}>
            <h3 style={{ marginTop: 0, color: '#5a5', textAlign: 'center' }}>Tiger Core AI</h3>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ border: '1px solid #5a5', padding: '18px', borderRadius: '10px', background: '#112211', flex: 1, textAlign: 'center', minWidth: '200px' }}>
                <strong>LLM / NLU Engine</strong><br/><small>Dynamic Intent & Hinglish Parsing</small>
              </div>
              <div style={{ fontSize: '1.3rem', alignSelf: 'center' }}>↔️</div>
              <div style={{ border: '1px solid #5a5', padding: '18px', borderRadius: '10px', background: '#112211', flex: 1, textAlign: 'center', minWidth: '200px' }}>
                <strong>Orchestration Engine</strong><br/><small>Business Logic & Stage Routing</small>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.3rem' }}>⬇️ ⬆️</div>

          {/* Bottom Layer */}
          <div style={{ border: '2px solid #666', padding: '28px', borderRadius: '12px', background: '#111', width: '100%', maxWidth: '850px' }}>
            <h3 style={{ marginTop: 0, color: '#aaa', textAlign: 'center' }}>Tiger Ecosystem & External Systems</h3>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Identity Layer', sub: 'Auth / SSO', color: '#ff6b6b' },
                { label: 'CRM Database', sub: 'Customer State', color: '#ccc' },
                { label: 'Comms Gateway', sub: 'WhatsApp Triggers', color: '#ccc' },
                { label: 'Inside Dialler', sub: 'Sales Escalation', color: '#ccc' },
                { label: 'Analytics Engine', sub: 'Post-Call QA', color: '#ccc' },
              ].map((item) => (
                <div key={item.label} style={{ border: '1px dashed #666', padding: '14px', borderRadius: '10px', flex: 1, textAlign: 'center', minWidth: '150px' }}>
                  <strong style={{ color: item.color }}>{item.label}</strong><br/><small>{item.sub}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ LLD ═══════ */}
      <div style={{ background: '#1a1a24', borderRadius: '16px', padding: '36px', color: '#f8f8f2', border: '1px solid #333', marginTop: '24px' }}>
        <h2 style={{ borderBottom: '2px solid #7c3aed', paddingBottom: '10px', marginBottom: '30px' }}>Low-Level Design (Prototype Implementation)</h2>
        <p style={{ color: '#aaa', marginBottom: '24px' }}>Internal module architecture showing how each component interacts within the Next.js prototype.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

          {/* User Input Layer */}
          <div style={{ border: '2px solid #7c3aed', padding: '20px', borderRadius: '12px', background: '#1e103a', width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#a78bfa' }}>User Input Layer</h3>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ border: '1px solid #7c3aed', padding: '14px', borderRadius: '10px', background: '#2d1b69', minWidth: '140px' }}>
                <strong>Text Input</strong><br/><small>Keyboard / paste</small>
              </div>
              <div style={{ border: '1px solid #7c3aed', padding: '14px', borderRadius: '10px', background: '#2d1b69', minWidth: '140px' }}>
                <strong>Web Speech API</strong><br/><small>Voice → text (STT)</small>
              </div>
              <div style={{ border: '1px solid #7c3aed', padding: '14px', borderRadius: '10px', background: '#2d1b69', minWidth: '140px' }}>
                <strong>Prompt Chips</strong><br/><small>Golden Set clicks</small>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.3rem' }}>⬇️</div>

          {/* Processing Layer */}
          <div style={{ border: '2px solid #0ea5e9', padding: '20px', borderRadius: '12px', background: '#0c1929', width: '100%', maxWidth: '850px' }}>
            <h3 style={{ margin: '0 0 14px', color: '#38bdf8', textAlign: 'center' }}>Agent Processing Pipeline</h3>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { name: 'VoiceAgent.tsx', desc: 'UI + state management' },
                { name: 'mock-agent.ts', desc: 'Intent → Objection → Reply' },
                { name: 'orchestration.ts', desc: 'Stage + NextBestAction' },
                { name: 'suggested-prompts.ts', desc: 'Golden Set per stage' },
              ].map((mod) => (
                <div key={mod.name} style={{ border: '1px solid #0ea5e9', padding: '12px', borderRadius: '10px', background: '#0f2a3d', flex: 1, textAlign: 'center', minWidth: '160px' }}>
                  <strong style={{ fontSize: '13px' }}>{mod.name}</strong><br/><small style={{ color: '#7dd3fc' }}>{mod.desc}</small>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', margin: '14px 0 8px', fontSize: '1.1rem' }}>⬇️</div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { name: 'detectIntent()', desc: 'Greeting / Agreement / Hold / OOS' },
                { name: 'detectObjection()', desc: 'Fee / Jewels / Limit / Complexity' },
                { name: 'detectLanguage()', desc: 'English / Hindi / Hinglish' },
              ].map((fn) => (
                <div key={fn.name} style={{ border: '1px dashed #0ea5e9', padding: '10px', borderRadius: '8px', background: '#0a1e2e', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                  <strong style={{ fontSize: '12px', color: '#38bdf8' }}>{fn.name}</strong><br/><small>{fn.desc}</small>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '1.3rem' }}>⬇️</div>

          {/* Side Effects Layer */}
          <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '850px', flexWrap: 'wrap' }}>
            <div style={{ border: '2px solid #f59e0b', padding: '20px', borderRadius: '12px', background: '#1a1508', flex: 1, minWidth: '300px' }}>
              <h3 style={{ margin: '0 0 12px', color: '#fbbf24' }}>Tool Calls (tools.ts)</h3>
              <div style={{ display: 'grid', gap: '6px' }}>
                {['sendWhatsApp()', 'scheduleCallback()', 'createHumanEscalation()', 'getCustomerStage()', 'logCallOutcome()', 'logObjection()'].map((t) => (
                  <div key={t} style={{ padding: '6px 10px', background: '#2a1f0a', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace' }}>{t}</div>
                ))}
              </div>
            </div>

            <div style={{ border: '2px solid #10b981', padding: '20px', borderRadius: '12px', background: '#0a1a12', flex: 1, minWidth: '300px' }}>
              <h3 style={{ margin: '0 0 12px', color: '#34d399' }}>State Mutation (state-updater.ts)</h3>
              <div style={{ display: 'grid', gap: '6px' }}>
                {[
                  'AGREED → ekycStatus = COMPLETED',
                  'AGREED → vkycStatus = COMPLETED',
                  'OBJECTION → previousObjection = X',
                  'OPT_OUT → optOut = true',
                  'WHATSAPP → retryCount += 1',
                ].map((r) => (
                  <div key={r} style={{ padding: '6px 10px', background: '#0a2a1a', borderRadius: '6px', fontSize: '12px' }}>{r}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.3rem' }}>⬇️</div>

          {/* UI Output */}
          <div style={{ border: '2px solid #06b6d4', padding: '18px', borderRadius: '12px', background: '#0c1929', width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#22d3ee' }}>Live UI Updates</h3>
            <p style={{ margin: '8px 0 0', color: '#aaa', fontSize: '14px' }}>Customer Context Card • Journey Timeline • Queue Table • Chat Transcript • Interaction History — all update reactively via shared ClientData context.</p>
          </div>
        </div>
      </div>

      {/* ═══════ Data Flow ═══════ */}
      <div style={{ background: '#1a1a24', borderRadius: '16px', padding: '36px', color: '#f8f8f2', border: '1px solid #333', marginTop: '24px' }}>
        <h2 style={{ borderBottom: '2px solid #00dfa2', paddingBottom: '10px', marginBottom: '20px' }}>Data Flow</h2>
        <ol style={{ lineHeight: '2', fontSize: '15px' }}>
          <li><strong>Trigger:</strong> Agent clicks "Start Call" in Customer Queue → immersive call view opens.</li>
          <li><strong>Greeting:</strong> VoiceAgent auto-generates a context-aware greeting based on the customer's current stage and next best action.</li>
          <li><strong>Input:</strong> User responds via text input, voice recording (Web Speech API), or clicking a Golden Set prompt chip.</li>
          <li><strong>NLU:</strong> <code>mock-agent.ts</code> runs detectLanguage → detectObjection → detectIntent pipeline.</li>
          <li><strong>Orchestration:</strong> <code>orchestration.ts</code> determines the customer's stage and next best action from CRM data.</li>
          <li><strong>Tool Execution:</strong> Agent calls simulated external APIs (WhatsApp, Callback, Escalation, CRM Refresh).</li>
          <li><strong>State Mutation:</strong> <code>state-updater.ts</code> applies the conversation outcome to the customer record in real-time.</li>
          <li><strong>UI Refresh:</strong> All UI components (badges, timeline, queue, history) reactively update via shared context.</li>
        </ol>
      </div>
    </div>
  );
}
