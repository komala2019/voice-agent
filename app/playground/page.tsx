'use client';
import { useMemo, useState } from 'react';
import { useClientData } from '@/components/ClientData';
import { Badge } from '@/components/Badge';
import { orchestrationFor } from '@/lib/orchestration';
import { runMockAgent } from '@/lib/mock-agent';
import { setFailNextTool as setLibFailNextTool } from '@/lib/tools';

const utterances = [
  'Okay, tell me what to do.',
  'Ye KYC bahut complicated hai.',
  'Why is there a ₹499 fee?',
  'Jewels are not real cashback.',
  'My credit limit is too low.',
  'I already completed this.',
  'Send me the link on WhatsApp.',
  'Call me tomorrow at 7 PM.',
  'Stop calling me.',
  'I want to speak to a person.',
  "I'll tell you my OTP."
];

export default function PlaygroundPage() {
  const { customers, setLogs } = useClientData();
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; text: string }>>([]);
  const [lastResult, setLastResult] = useState<any>(null);
  const [failNextTool, setFailNextTool] = useState(false);
  const [useLLM, setUseLLM] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    let finalString = '';
    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalString += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      setLiveTranscript(finalString + interim);
    };
    recognition.onerror = (e: any) => {
      console.error(e.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (finalString.trim()) {
        runUtterance(finalString.trim());
      }
      setLiveTranscript('');
    };
    recognition.start();
  };

  const customer = useMemo(() => customers.find((c: any) => c.id === customerId), [customers, customerId]);
  const state = orchestrationFor(customer, 11);

  const runUtterance = (text: string) => {
    if (failNextTool) {
      setLibFailNextTool(true);
    } else {
      setLibFailNextTool(false);
    }
    const result = runMockAgent(customer, text, 11);
    
    // Simulate LLM online dynamic generation 
    if (useLLM) {
      result.reply = `✨(Online LLM) ${result.reply}`;
    }

    setLastResult(result);
    setMessages((m) => [...m, { role: 'user', text }, { role: 'agent', text: result.reply }]);
    setLogs((curr: any[]) => [
      ...curr,
      { id: Math.random().toString(36).slice(2), customerId, kind: 'CALL', message: `User: ${text} | Agent: ${result.reply}${!result.guardrailPassed ? ' [Guardrail failed]' : ''}`, timestamp: new Date().toISOString() }
    ]);
    if (failNextTool) setFailNextTool(false);
  };

  return <div className="stack">
    <div className="page-header"><div><h1>Agent Playground</h1><p>Source state → resolved stage → next best action → agent conversation.</p></div></div>
    <div className="toolbar">
      <select className="select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
        {customers.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select className="select" value={useLLM ? 'online' : 'offline'} onChange={(e) => setUseLLM(e.target.value === 'online')} style={{ background: useLLM ? '#00dfa2' : '#333', color: useLLM ? '#000' : '#fff' }}>
        <option value="offline">Mode: Offline (Regex/Deterministic)</option>
        <option value="online">Mode: Online (Generative LLM AI)</option>
      </select>
      <label className="badge">
        <input type="checkbox" checked={failNextTool} onChange={(e) => { setFailNextTool(e.target.checked); if (e.target.checked) setFailNextTool(true); }} /> Simulate next tool failure
      </label>
    </div>
    <div className="grid grid-3">
      <div className="card stack">
        <h3>Customer context</h3>
        <div className="kv"><strong>Name</strong><span>{customer.name}</span></div>
        <div className="kv"><strong>Language</strong><span>{customer.language}</span></div>
        <div className="kv"><strong>Resolved stage</strong><span><Badge value={state.stage} tone={`stage-${state.stage}`} /></span></div>
        <div className="kv"><strong>Next action</strong><span><Badge value={state.action} tone={`action-${state.action}`} /></span></div>
      </div>
      <div className="card stack">
        <h3>Voice transcript simulator</h3>
        <div className="transcript stack">
          {messages.length ? messages.map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>) : <div className="subtle">Click "Start Recording" or select an utterance.</div>}
          {isListening && <div className="bubble user pulse">{liveTranscript || 'Listening...'}</div>}
        </div>
        <div>
          <button className={`btn btn-primary ${isListening ? 'pulse' : ''}`} style={{width: '100%', marginBottom: '10px'}} onClick={startListening} disabled={isListening}>
            {isListening ? '🎙️ Recording...' : '🎙️ Start Recording Voice'}
          </button>
        </div>
        <div className="grid">
          {utterances.map((u) => <button key={u} className="btn btn-secondary" onClick={() => runUtterance(u)}>{u}</button>)}
        </div>
      </div>
      <div className="card stack">
        <h3>Decision panel</h3>
        {lastResult ? <>
          <div className="kv"><strong>Detected language</strong><span>{lastResult.detectedLanguage}</span></div>
          <div className="kv"><strong>Detected objection</strong><span>{lastResult.objection || '—'}</span></div>
          <div className="kv"><strong>Final outcome</strong><span>{lastResult.outcome || '—'}</span></div>
          <div className="kv"><strong>Guardrail status</strong><span>{lastResult.guardrailPassed ? 'Passed' : 'Failed'}</span></div>
          <div><strong>Tool calls</strong><div className="stack">{lastResult.toolCalls.length ? lastResult.toolCalls.map((t: any, i: number) => <div key={i} className="codebox">{JSON.stringify(t, null, 2)}</div>) : <div className="subtle">No tools called.</div>}</div></div>
        </> : <div className="subtle">No call simulated yet.</div>}
      </div>
    </div>
  </div>;
}
