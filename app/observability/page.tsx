import React from 'react';

export default function ObservabilityDashboardPage() {
  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto', paddingBottom: '40px' }}>
      <div className="page-header">
        <div>
          <h1>AI Observability & PM Dashboard</h1>
          <p>Monitor quality, reasoning, brand compliance, and business impact of the AI Voice Agent.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge pass" style={{ fontSize: '13px', padding: '6px 12px' }}>● System Healthy</span>
          <span className="badge fail" style={{ fontSize: '13px', padding: '6px 12px' }}>1 Active Alert</span>
        </div>
      </div>

      {/* Business & System Metrics */}
      <div className="grid grid-4" style={{ marginBottom: '8px' }}>
        <div className="card">
          <div className="subtle small">Avg Resolution Rate</div>
          <div className="metric">78%</div>
          <div className="small" style={{ color: 'var(--success)', marginTop: '4px' }}>↑ 4% vs last week</div>
        </div>
        <div className="card">
          <div className="subtle small">CSAT Score</div>
          <div className="metric">4.6/5</div>
          <div className="small" style={{ color: 'var(--success)', marginTop: '4px' }}>↑ 0.2 vs last week</div>
        </div>
        <div className="card" style={{ borderLeft: '3px solid var(--error)' }}>
          <div className="subtle small">Avg API Latency</div>
          <div className="metric" style={{ color: 'var(--error)' }}>3.4s</div>
          <div className="small" style={{ color: 'var(--error)', marginTop: '4px' }}>⚠️ P99 Spikes detected</div>
        </div>
        <div className="card">
          <div className="subtle small">Cost per 1k Calls</div>
          <div className="metric">$14.50</div>
          <div className="small subtle" style={{ marginTop: '4px' }}>Est. monthly savings: $42k</div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Evaluations Pipeline */}
        <div className="card stack">
          <h2 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>Live Evaluations (Last 24h)</h2>
          <p className="subtle" style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>Automated scoring across all onboarding interactions.</p>
          
          <div className="stack" style={{ gap: '12px' }}>
            {[
              { metric: 'Correctness', score: '98%', target: '>95%', status: 'pass' },
              { metric: 'Groundedness', score: '99%', target: '>98%', status: 'pass' },
              { metric: 'Brand Compliance', score: '100%', target: '100%', status: 'pass' },
              { metric: 'Helpfulness', score: '92%', target: '>90%', status: 'pass' },
              { metric: 'Hallucination Rate', score: '1.2%', target: '<2%', status: 'pass' },
            ].map(evalMetric => (
              <div key={evalMetric.metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{evalMetric.metric}</div>
                  <div className="small subtle">Target: {evalMetric.target}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{evalMetric.score}</div>
                  <span className={`badge ${evalMetric.status === 'pass' ? 'pass' : 'fail'}`}>
                    {evalMetric.status === 'pass' ? '✓' : '⚠️'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Traces & Alerts */}
        <div className="card stack">
          <h2 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: 'var(--error)' }}>Active Alerts & Failed Traces</h2>
          <p className="subtle" style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>Investigate requests where the AI system failed.</p>
          
          <div className="stack" style={{ gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: '8px', borderLeft: '4px solid var(--error)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge fail">🚨 CRM API Timeout</span>
                <span className="small subtle">10 mins ago</span>
              </div>
              <div className="small">
                <strong>Trace:</strong> Prompt V12 → Retrieved Policy → LLM → CRM API Call → <em>Timeout (5.2s)</em> → Fallback Response
              </div>
              <div className="small subtle" style={{ marginTop: '8px' }}>Impacted customer: ID-99824</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge stage-ACTIVATION_PENDING">⚠️ Repetitive Loop Detected</span>
                <span className="small subtle">2 hrs ago</span>
              </div>
              <div className="small">
                <strong>Trace:</strong> Prompt V12 → LLM → <em>Similarity > 80% to previous</em> → Escalated to Human
              </div>
              <div className="small subtle" style={{ marginTop: '8px' }}>Recovered successfully via fallback.</div>
            </div>
            
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>View Full Trace Logs →</button>
          </div>
        </div>
      </div>

      {/* Model Performance Table */}
      <div className="card">
        <h2 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>Model Performance & Cost Tracking</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Model Version</th>
                <th>Avg Latency</th>
                <th>Accuracy</th>
                <th>Cost per 1k</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Gemini 1.5 Flash (Current)</td>
                <td>1.8s</td>
                <td>98%</td>
                <td>$0.50</td>
                <td><span className="badge pass">Active</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>GPT-4o (Fallback)</td>
                <td>3.1s</td>
                <td>99%</td>
                <td>$5.00</td>
                <td><span className="badge action-GUIDE_EKYC">Standby</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--muted)' }}>GPT-3.5 (Deprecated)</td>
                <td style={{ color: 'var(--muted)' }}>2.2s</td>
                <td style={{ color: 'var(--muted)' }}>91%</td>
                <td style={{ color: 'var(--muted)' }}>$0.20</td>
                <td><span className="badge subtle">Retired</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PM Cheat Sheet Reference */}
      <div className="card">
        <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>PM Reference: AI Observability (The 5 W's)</h3>
        <details>
          <summary style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            Click to expand Product Manager Cheat Sheet
          </summary>
          <div style={{ marginTop: '16px', fontSize: '0.9rem', lineHeight: 1.6, padding: '16px', background: 'var(--surface-2)', borderRadius: '8px' }}>
            <p><strong>Definition:</strong> AI Observability helps you understand why an AI system produced a particular response, whether it was good, and how to improve it.</p>
            <div className="grid grid-2" style={{ marginTop: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px' }}>The 5 W's of AI Observability</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><strong>What happened?</strong> → Look at the Trace</li>
                  <li><strong>Why did it happen?</strong> → Prompt + Knowledge + Model</li>
                  <li><strong>Was it correct?</strong> → Evaluations (Correctness, Groundedness)</li>
                  <li><strong>Was it reliable?</strong> → Monitoring & Alerts (Latency, Downtime)</li>
                  <li><strong>Was it efficient?</strong> → Cost & Performance Metrics</li>
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px' }}>Key Components</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><strong>Inputs:</strong> Brand Voice, Tone, Prompt, RAG KB</li>
                  <li><strong>Traces:</strong> The journey from user prompt to final output</li>
                  <li><strong>Outputs:</strong> Prompt/Model Performance, Brand Compliance, Semantic Quality</li>
                  <li><strong>Evals:</strong> Automated scoring pipelines (e.g. hallucination checks)</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', borderLeft: '3px solid var(--primary)', background: 'var(--surface)' }}>
              <em>"A successful AI PM doesn't just ship an AI feature—they build visibility into how it behaves, why it behaves that way, and how to continuously improve it."</em>
            </div>
          </div>
        </details>
      </div>

    </div>
  );
}
