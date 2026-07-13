import React from 'react';

export default function HelpPage() {
  return (
    <div className="stack" style={{ maxWidth: '800px' }}>
      <div className="page-header">
        <div>
          <h1>How to Use This App</h1>
          <p>A quick guide to testing the Tiger Voice Agent Prototype.</p>
        </div>
      </div>

      <div className="card stack">
        <h2>1. The Goal of the Prototype</h2>
        <p>
          This app demonstrates how a dynamic, voice-enabled AI agent can route users through a Credit Card Onboarding journey (eKYC, VKYC, Activation). 
          It evaluates a customer's current state and determines the <strong>Next Best Action</strong> before speaking to the customer.
        </p>
      </div>

      <div className="card stack">
        <h2>2. Modifying Customer State</h2>
        <p>
          Navigate to the <strong>Customer Queue</strong> and select a customer. 
          Under <strong>Demo controls</strong>, you can manually override their current eKYC, VKYC, or Activation status. 
          Click <strong>Refresh Customer State</strong> to see how the system recalculates their timeline, their current resolved stage, and the next best action the AI should take.
        </p>
      </div>

      <div className="card stack">
        <h2>3. Testing the Agent (Immersive Call View)</h2>
        <p>
          On any Customer Detail page, click the <strong>📞 Start Call</strong> button. The interface will transform into an immersive, full-screen Voice Agent console.
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>Embedded Prompts:</strong> Notice how the suggested conversational prompts (from the Golden Set) appear as <strong>clickable chips</strong> directly inside the chat right after the agent greets you. Click one to instantly simulate a user's response!
          </li>
          <li>
            <strong>Offline (Regex) Mode:</strong> By default, the app uses a strict, rules-based engine. Speak or type phrases to see how the system deterministically responds and applies guardrails (like rejecting PII such as OTPs).
          </li>
          <li>
            <strong>Online (Generative LLM) Mode:</strong> Toggle this on (top toolbar) to connect to a real AI. You must provide a <em>Google Gemini API Key</em>. Once entered, your transcripts are sent to Gemini to generate dynamic, conversational Hinglish/English responses.
          </li>
          <li>
            <strong>Live CRM Updates:</strong> Notice how if you agree to complete a step during the chat, the agent automatically updates the CRM state in the background. Close the call to see the changes reflected on the timeline!
          </li>
        </ul>
      </div>

      <div className="card stack">
        <h2>4. Presentations & Architecture</h2>
        <p>
          If you are presenting this to stakeholders or interviewers, check out the <strong>Architecture</strong> tab for high-level (HLD) and low-level (LLD) system diagrams, and the <strong>Presentation</strong> tab for an interactive, built-in slideshow that explains the core problems, guardrails, and solutions.
        </p>
      </div>
    </div>
  );
}
