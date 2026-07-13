import React from 'react';

export default function ArchitecturePage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="page-header">
        <div>
          <h1>System Architecture</h1>
          <p>High-Level Design (HLD) and Path to Production</p>
        </div>
      </div>
      
      <div style={{ background: '#1a1a24', borderRadius: '12px', padding: '40px', color: '#f8f8f2', border: '1px solid #333' }}>
        
        <h2 style={{ borderBottom: '2px solid #00dfa2', paddingBottom: '10px', marginBottom: '30px' }}>High-Level Design (Production Scale)</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
          
          {/* Top Layer: Interaction */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <div style={{ border: '2px solid #00dfa2', padding: '20px', borderRadius: '8px', background: '#0b192c', flex: 1, textAlign: 'center', maxWidth: '250px' }}>
              <strong>Customer</strong><br/><small>App / Phone Call</small>
            </div>
            <div style={{ fontSize: '1.5rem' }}>↔️</div>
            <div style={{ border: '2px dashed #00dfa2', padding: '20px', borderRadius: '8px', background: '#0a1a0a', flex: 1, textAlign: 'center', maxWidth: '250px' }}>
              <strong>VAD Layer</strong><br/><small>WebSockets / Interruptions</small>
            </div>
            <div style={{ fontSize: '1.5rem' }}>↔️</div>
            <div style={{ border: '2px solid #00dfa2', padding: '20px', borderRadius: '8px', background: '#0b192c', flex: 1, textAlign: 'center', maxWidth: '250px' }}>
              <strong>Voice Platform</strong><br/><small>STT / TTS</small>
            </div>
          </div>
          
          <div style={{ fontSize: '1.5rem' }}>⬇️ ⬆️</div>
          
          {/* Middle Layer: Core AI */}
          <div style={{ border: '2px solid #5a5', padding: '30px', borderRadius: '12px', background: '#0a1a0a', width: '100%', maxWidth: '850px' }}>
            <h3 style={{ marginTop: 0, color: '#5a5', textAlign: 'center' }}>Tiger Core AI</h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <div style={{ border: '1px solid #5a5', padding: '20px', borderRadius: '8px', background: '#112211', flex: 1, textAlign: 'center' }}>
                <strong>LLM / NLU Engine</strong><br/><small>Dynamic Intent & Hinglish Parsing</small>
              </div>
              <div style={{ fontSize: '1.5rem', alignSelf: 'center' }}>↔️</div>
              <div style={{ border: '1px solid #5a5', padding: '20px', borderRadius: '8px', background: '#112211', flex: 1, textAlign: 'center' }}>
                <strong>Orchestration Engine</strong><br/><small>Business Logic & Stage Routing</small>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '1.5rem' }}>⬇️ ⬆️</div>
          
          {/* Bottom Layer: Ecosystem */}
          <div style={{ border: '2px solid #666', padding: '30px', borderRadius: '12px', background: '#111', width: '100%', maxWidth: '850px' }}>
            <h3 style={{ marginTop: 0, color: '#aaa', textAlign: 'center' }}>Tiger Ecosystem & External Systems</h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              
              <div style={{ border: '1px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                <strong style={{ color: '#ff6b6b' }}>Identity Layer</strong><br/><small>Auth / SSO</small>
              </div>
              
              <div style={{ border: '1px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                <strong>CRM Database</strong><br/><small>Customer State</small>
              </div>
              
              <div style={{ border: '1px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                <strong>Comms Gateway</strong><br/><small>WhatsApp Triggers</small>
              </div>
              
              <div style={{ border: '1px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                <strong>Inside Dialler</strong><br/><small>Sales Escalation</small>
              </div>
              
              <div style={{ border: '1px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center', minWidth: '180px' }}>
                <strong>Analytics Engine</strong><br/><small>Post-Call QA & Transcripts</small>
              </div>
              
            </div>
          </div>

        </div>
        
        <div style={{ marginTop: '50px' }}>
          <h3>Data Flow (Production Scale):</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li><strong>Trigger:</strong> Card approval creates a profile. Dialler initiates call or App triggers audio stream.</li>
            <li><strong>Streaming:</strong> Voice Activity Detection (VAD) handles interruptions via WebSockets.</li>
            <li><strong>NLU Processing:</strong> The LLM Engine parses Hinglish complexity, detecting intents and mapping objections.</li>
            <li><strong>Context & Auth:</strong> Orchestrator securely queries CRM via Identity Layer to get the `CustomerStage`.</li>
            <li><strong>Tool Execution:</strong> Agent dynamically calls external systems (WhatsApp, Dialler, CRM).</li>
            <li><strong>Analytics:</strong> Completed calls are logged to the Analytics engine for QA and transcription analysis.</li>
          </ol>
        </div>
        
      </div>
    </div>
  );
}
