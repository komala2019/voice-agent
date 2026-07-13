'use client';
import { useState } from 'react';
import { runAllGoldenTests } from '@/lib/evaluator';
import { Badge } from '@/components/Badge';
export default function EvaluationsPage() {
  const [results, setResults] = useState<any[]>([]);
  return <div className="stack"><div className="page-header"><div><h1>Golden Test Evaluation</h1><p>Deterministic test suite for stage awareness, actions, tools, compliance, and voice quality.</p></div><button className="btn btn-primary" onClick={()=>setResults(runAllGoldenTests())}>Run All Tests</button></div>
    <div className="card"><table className="table"><thead><tr><th>Test</th><th>Status</th><th>Stage</th><th>Action</th><th>Total</th><th>Failure reason</th></tr></thead><tbody>{results.length ? results.map((r:any)=><tr key={r.id}><td><strong>{r.title}</strong><div className="small subtle">Outcome: {r.result.outcome || '—'}</div></td><td><Badge value={r.pass ? 'PASS' : 'FAIL'} tone={r.pass ? 'pass' : 'fail'} /></td><td>{r.actualStage}</td><td>{r.actualAction}</td><td>{r.total}/100</td><td>{r.reason}</td></tr>) : <tr><td colSpan={6} className="subtle">No tests run yet.</td></tr>}</tbody></table></div>
  </div>;
}
