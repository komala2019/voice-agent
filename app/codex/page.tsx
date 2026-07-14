import fs from 'fs';
import path from 'path';

export default function CodexPage() {
  let content = '';
  try {
    content = fs.readFileSync(path.join(process.cwd(), 'public', 'codex.md'), 'utf8');
  } catch (e) {
    content = "Could not load CODEX.md from public folder.";
  }

  return (
    <div className="stack" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <div>
          <h1>Codex Build Spec</h1>
          <p>The original instructions and requirements provided for the prototype</p>
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
