import fs from 'fs';
import path from 'path';

export default function AgentBlueprintPage() {
  let content = '';
  try {
    content = fs.readFileSync(path.join(process.cwd(), 'public', 'comprehensive_agent_blueprint.md'), 'utf8');
  } catch (e) {
    content = "Could not load comprehensive_agent_blueprint.md from public folder.";
  }

  return (
    <div className="stack" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <div>
          <h1>Comprehensive Agent Blueprint</h1>
          <p>The synthesised mega-prompt blueprint for building and testing the AI agent</p>
        </div>
      </div>
      <div className="card" style={{ flex: 1, overflowY: 'auto' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.9rem', fontFamily: 'monospace' }}>
          {content}
        </pre>
      </div>
    </div>
  );
}
