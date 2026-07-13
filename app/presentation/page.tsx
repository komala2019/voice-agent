'use client';
import { useState } from 'react';

const slides = [
  {
    title: "Tiger Credit Card: AI Voice Onboarding Agent",
    content: (
      <div style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        <p><em>An intelligent, deterministic conversational agent built to rescue mid-funnel drop-offs.</em></p>
        <br/>
        <h3>Core Objective:</h3>
        <p>Guide approved customers through eKYC, VKYC, and Card Activation natively using voice.</p>
        <br/>
        <h3>Key Capabilities:</h3>
        <ul>
          <li>Think in Systems & Data Flows</li>
          <li>Handle Objections Logically</li>
          <li>Multi-lingual Support (English & Hindi)</li>
          <li>Strict Compliance Guardrails</li>
        </ul>
      </div>
    )
  },
  {
    title: "High-Level System Architecture",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p>How the agent integrates with the Tiger Technology Ecosystem:</p>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ border: '2px solid #00dfa2', padding: '20px', borderRadius: '8px', background: '#0b192c', color: 'white' }}>Customer (Voice)</div>
          <div>↔️</div>
          <div style={{ border: '2px solid #00dfa2', padding: '20px', borderRadius: '8px', background: '#0b192c', color: 'white' }}>Voice AI Platform (STT)</div>
          <div>↔️</div>
          <div style={{ border: '2px solid #00dfa2', padding: '20px', borderRadius: '8px', background: '#0b192c', color: 'white' }}>Orchestrator</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>⬇️</div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ border: '2px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
            <strong>CRM Database</strong><br/>Read/Write State
          </div>
          <div style={{ border: '2px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
            <strong>Comms Gateway</strong><br/>WhatsApp Triggers
          </div>
          <div style={{ border: '2px dashed #666', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
            <strong>Dialler System</strong><br/>Schedule / Escalate
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Multi-Lingual & Intent Handling",
    content: (
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <p>The agent understands contextual intents in <strong>English and Hinglish</strong>.</p>
        <br/>
        <h3>1. Intent Detection</h3>
        <ul>
          <li><strong>Greetings:</strong> Catches <em>"Hello, Kem chho"</em> and replies contextually without forcing flow.</li>
          <li><strong>Hold Statements:</strong> Recognizes <em>"Ek minute ruko"</em> and pauses the flow gracefully.</li>
          <li><strong>Out of Scope:</strong> Enforces boundaries. <em>"Main sirf eKYC aur VKYC mein madad kar sakta hoon."</em></li>
        </ul>
        <br/>
        <h3>2. Objection Mapping (Hinglish Support)</h3>
        <ul>
          <li><em>"Ye 499 ka charge kyu hai?"</em> ➔ Maps to <strong>JOINING_FEE</strong></li>
          <li><em>"Asli cashback nahi hai"</em> ➔ Maps to <strong>JEWELS_VALUE</strong></li>
          <li><em>"Mere paas pehle se credit card hai"</em> ➔ Maps to <strong>EXISTING_CARD</strong></li>
        </ul>
      </div>
    )
  },
  {
    title: "Guardrails & Tool Orchestration",
    content: (
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <div style={{ background: '#300', padding: '15px', borderRadius: '8px', borderLeft: '5px solid red', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#ff6b6b' }}>⚠️ PII Protection (OTP/CVV)</h3>
          <p style={{ margin: '10px 0 0 0' }}>If a user attempts to say <em>"My OTP is 482913"</em>, the agent immediately drops the flow, refuses the data, and triggers a Human Escalation tool.</p>
        </div>
        
        <h3>External API Tooling Integrations:</h3>
        <ul style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
          <li><strong>sendWhatsApp:</strong> Dispatches context-aware guides.</li>
          <li><strong>getCustomerStage:</strong> Polls the CRM live if the user claims they already finished a step.</li>
          <li><strong>scheduleCallback:</strong> Integrates with the dialler if a user requests a call later.</li>
          <li><strong>createHumanEscalation:</strong> Flags calls for the Inside Sales team.</li>
        </ul>
      </div>
    )
  },
  {
    title: "Evaluation Pipeline & Dashboard",
    content: (
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <h3>The Golden Set</h3>
        <p>A robust suite of <strong>31 deterministic test cases</strong> (English + Hinglish).</p>
        <ul>
          <li>Evaluates correct stage progression.</li>
          <li>Verifies accurate objection mapping.</li>
          <li>Validates guardrail adherence (Zero PII leaks).</li>
          <li>Tests tool execution success and failure handling.</li>
        </ul>
        <br/>
        <h3>Live Operations Dashboard</h3>
        <p>The prototype features a live Operations Console (`/`) monitoring:</p>
        <ul>
          <li>Funnel conversion & stage progression.</li>
          <li>Tool failures & network mock errors.</li>
          <li>Active guardrail breaches (Out of scope).</li>
          <li>Real-time utterance logs.</li>
        </ul>
      </div>
    )
  },
  {
    title: "Path to Production Architecture",
    content: (
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <p>To transition this deterministic prototype into a live, scalable enterprise product, the following core layers must be integrated:</p>
        <br/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '2px solid #5a5', padding: '15px', borderRadius: '8px', background: '#0a1a0a' }}>
            <h3 style={{ color: '#5a5', margin: '0 0 10px 0' }}>1. LLM / NLU Engine</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Replace regex intents with dynamic, generative AI (e.g. GPT-4o / Gemini) capable of true conversational multi-turn reasoning.</p>
          </div>
          <div style={{ border: '2px solid #5a5', padding: '15px', borderRadius: '8px', background: '#0a1a0a' }}>
            <h3 style={{ color: '#5a5', margin: '0 0 10px 0' }}>2. VAD & Streaming Audio</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Implement Voice Activity Detection (VAD) via WebSockets to enable millisecond latency and seamless user barge-in handling.</p>
          </div>
          <div style={{ border: '2px solid #5a5', padding: '15px', borderRadius: '8px', background: '#0a1a0a' }}>
            <h3 style={{ color: '#5a5', margin: '0 0 10px 0' }}>3. Post-Call Analytics</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Store call recordings and generate QA metrics using sentiment analysis on the completed transcripts.</p>
          </div>
          <div style={{ border: '2px solid #5a5', padding: '15px', borderRadius: '8px', background: '#0a1a0a' }}>
            <h3 style={{ color: '#5a5', margin: '0 0 10px 0' }}>4. Identity & Auth Layer</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Verify customer identity securely via SSO/OAuth before reading CRM data or modifying onboarding states.</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
  const handlePrev = () => setCurrentSlide(prev => Math.max(0, prev - 1));

  const slide = slides[currentSlide];

  return (
    <div className="stack" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <div>
          <h1>Presentation</h1>
          <p>Slide {currentSlide + 1} of {slides.length}</p>
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        background: '#1a1a24', 
        borderRadius: '12px', 
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        border: '1px solid #333',
        color: '#f8f8f2'
      }}>
        <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #00dfa2', paddingBottom: '10px', marginBottom: '30px' }}>
          {slide.title}
        </h2>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {slide.content}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #333' }}>
          <button 
            className="btn" 
            onClick={handlePrev} 
            disabled={currentSlide === 0}
            style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {slides.map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: i === currentSlide ? '#00dfa2' : '#444' 
                }} 
              />
            ))}
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={handleNext} 
            disabled={currentSlide === slides.length - 1}
            style={{ opacity: currentSlide === slides.length - 1 ? 0.5 : 1 }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
