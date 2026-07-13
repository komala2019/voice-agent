import { systemPromptBlueprint } from '@/lib/prompt-blueprint';

export default function PromptBlueprintPage() {
  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <h1>Prompt Blueprint</h1>
          <p>The foundational system instruction set used by the LLM agent to enforce compliance, handle objections, and orchestrate logic.</p>
        </div>
      </div>
      <div className="card stack">
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.9rem', padding: '20px', background: '#0b192c', color: '#00dfa2', borderRadius: '8px', border: '1px solid #333' }}>
          {systemPromptBlueprint}
        </pre>
      </div>
    </div>
  );
}
