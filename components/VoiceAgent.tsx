'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useClientData } from '@/components/ClientData';
import { orchestrationFor } from '@/lib/orchestration';
import { runMockAgent } from '@/lib/mock-agent';
import { runGeminiLLM } from '@/lib/llm-agent';

import { getSuggestedPrompts } from '@/lib/suggested-prompts';
import { applyOutcome } from '@/lib/state-updater';

import { Customer, InteractionLog, AgentTurnResult } from '@/lib/types';

export function VoiceAgent({ customerId }: { customerId: string }) {
  const { customers, setCustomers, setLogs } = useClientData();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent' | 'chips'; text: string }>>([]);
  const [lastResult, setLastResult] = useState<AgentTurnResult | null>(null);
  const [showChips, setShowChips] = useState(true);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const customer = useMemo(() => customers.find((c: Customer) => c.id === customerId), [customers, customerId]);

  useEffect(() => {
    if (customer) {
      const state = orchestrationFor(customer, 11);
      const nextStep = state.action === 'GUIDE_EKYC' ? 'eKYC verification' : state.action === 'START_VKYC_NOW' || state.action === 'SCHEDULE_VKYC_REMINDER' ? 'Video KYC' : state.action === 'GUIDE_ACTIVATION' ? 'card activation' : 'onboarding';
      setMessages([
        { role: 'agent', text: `Hi ${customer.name}! I'm calling from Tiger Credit Card. Your next step is ${nextStep}. How would you like to proceed?` },
        { role: 'chips', text: '' }
      ]);
      setLastResult(null);
      setShowChips(true);
    }
  }, [customerId, customer?.id]);

  const [failNextTool, setFailNextTool] = useState(false);
  const [useLLM, setUseLLM] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved) setApiKey(saved);
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem('gemini_api_key', val);
  };

  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages, isListening]);

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

  if (!customer) return null;

  const state = orchestrationFor(customer, 11);
  const suggestedPrompts = getSuggestedPrompts(state.stage);

  const [sessionLanguage, setSessionLanguage] = useState<'English' | 'Hindi' | 'Hinglish' | undefined>(undefined);

  const runUtterance = async (text: string) => {
    if (!text.trim()) return;
    setShowChips(false);

    let reply = '';
    let guardrailPassed = true;
    let finalOutcome = undefined;
    let detectedObjection = undefined;

    // Remove chips from messages
    const cleaned = messages.filter(m => m.role !== 'chips');

    if (useLLM) {
      if (!apiKey) {
        alert("Please enter a Google Gemini API Key to use Online LLM mode.");
        return;
      }
      setMessages([...cleaned, { role: 'user', text }, { role: 'agent', text: '...' }]);
      reply = await runGeminiLLM(customer, state.stage, state.action, text, apiKey);
      reply = `✨ ${reply}`;
      setMessages(m => m.slice(0, -1).concat([{ role: 'agent', text: reply }]));
    } else {
      const result = runMockAgent(customer, text, 11, { failNextTool, sessionLanguage });
      reply = result.reply;
      guardrailPassed = result.guardrailPassed;
      finalOutcome = result.outcome;
      detectedObjection = result.objection;
      if (result.detectedLanguage && !sessionLanguage) {
        setSessionLanguage(result.detectedLanguage);
      }
      setLastResult(result);
      setMessages([...cleaned, { role: 'user', text }, { role: 'agent', text: reply }]);
      const updatedCustomer = applyOutcome(customer, finalOutcome, state.stage, detectedObjection);
      setCustomers((list: Customer[]) => list.map((c: Customer) => c.id === customer.id ? updatedCustomer : c));
    }

    setLogs((curr: InteractionLog[]) => [
      ...curr,
      { id: Math.random().toString(36).slice(2), customerId, kind: 'CALL', message: `User: ${text} | Agent: ${reply}${!guardrailPassed ? ' [Guardrail failed]' : ''}`, timestamp: new Date().toISOString() }
    ]);
    if (failNextTool) setFailNextTool(false);
    setTextInput('');
  };

  return (
    <div className="voice-agent-container">
      {/* Compact top toolbar */}
      <div className="agent-toolbar">
        <select className="select agent-mode-select" value={useLLM ? 'online' : 'offline'} onChange={(e) => setUseLLM(e.target.value === 'online')}>
          <option value="offline">⚡ Offline (Regex)</option>
          <option value="online">🧠 Online (Gemini LLM)</option>
        </select>
        {useLLM && (
          <input
            type="password"
            placeholder="Gemini API Key..."
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            className="input agent-key-input"
          />
        )}
        <label className="badge" style={{ fontSize: '11px' }}>
          <input type="checkbox" checked={failNextTool} onChange={(e) => { setFailNextTool(e.target.checked); }} /> Fail tool
        </label>
      </div>

      {/* Chat transcript */}
      <div className="transcript" ref={transcriptRef}>
        {messages.map((m, i) => {
          if (m.role === 'chips' && showChips) {
            return (
              <div key={i} className="prompt-chips">
                {suggestedPrompts.map((p) => (
                  <button key={p} className="chip" onClick={() => runUtterance(p)}>{p}</button>
                ))}
              </div>
            );
          }
          if (m.role === 'chips') return null;
          return <div key={i} className={`bubble ${m.role}`}>{m.text}</div>;
        })}
        {isListening && <div className="bubble user pulse">{liveTranscript || 'Listening...'}</div>}
      </div>

      {/* Input area */}
      <div className="agent-input-area">
        <button className={`btn-mic ${isListening ? 'recording' : ''}`} onClick={startListening} disabled={isListening} aria-label="Record voice">
          🎙️
        </button>
        <input
          type="text"
          className="input agent-text-input"
          placeholder="Type your reply..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') runUtterance(textInput); }}
        />
        <button className="btn btn-primary btn-send" onClick={() => runUtterance(textInput)}>Send</button>
      </div>
    </div>
  );
}
