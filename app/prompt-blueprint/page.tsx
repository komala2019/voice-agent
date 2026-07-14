import { systemPromptBlueprint } from '@/lib/prompt-blueprint';

export default function PromptBlueprintPage() {
  // Split into sections for structured display
  const sections = systemPromptBlueprint.split('\n\n').filter(Boolean);

  return (
    <div className="stack" style={{ height: '100%', overflowY: 'auto', paddingBottom: '40px' }}>
      <div className="page-header">
        <div>
          <h1>Prompt Blueprint</h1>
          <p>The foundational system instruction set used by the LLM agent to enforce compliance, handle objections, and orchestrate logic.</p>
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
          This prompt is injected as the <strong>system message</strong> when running in Online (LLM) mode.
          It governs stage awareness, objection handling, compliance, repetition guardrails, and conversation progression.
        </p>
      </div>

      <div className="grid grid-2">
        {sections.map((section, i) => {
          const lines = section.split('\n');
          const title = lines[0].replace(/:$/, '');
          const isRule = title.toLowerCase().includes('rule') || title.toLowerCase().includes('guardrail') || title.toLowerCase().includes('anti-loop');
          const isCompliance = title.toLowerCase().includes('compliance') || title.toLowerCase().includes('never');
          const borderColor = isRule ? 'var(--error)' : isCompliance ? 'var(--warning)' : 'var(--primary)';

          return (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${borderColor}` }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '0.95rem' }}>{title}</h3>
              <pre style={{ 
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', 
                fontSize: '0.82rem', lineHeight: 1.6, margin: 0,
                color: 'var(--muted)', fontFamily: 'inherit'
              }}>
                {lines.slice(1).join('\n').trim()}
              </pre>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 style={{ margin: '0 0 8px' }}>Raw System Prompt</h3>
        <details>
          <summary style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            Click to expand full raw prompt text
          </summary>
          <pre style={{ 
            whiteSpace: 'pre-wrap', wordBreak: 'break-word', 
            fontSize: '0.82rem', padding: '16px', marginTop: '12px',
            background: 'var(--surface-2)', borderRadius: '8px',
            border: '1px solid var(--border)', lineHeight: 1.6
          }}>
            {systemPromptBlueprint}
          </pre>
        </details>
      </div>
    </div>
  );
}
