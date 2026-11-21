import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(r => r.json())
      .then(data => { setHealth(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '720px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>💰 ExpenseTrack</h1>
      <p style={{ color: '#666' }}>Personal Expense Management System</p>
      <hr style={{ margin: '1.5rem 0' }} />
      <h2>System Health Check</h2>
      {loading && <p>⏳ Connecting to backend...</p>}
      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px' }}>
          <strong>❌ Cannot reach backend</strong>
          <p style={{ margin: '0.5rem 0 0' }}>{error}</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9em' }}>
            Is the server running? Run <code>npm start</code> in the <code>server/</code> folder.
          </p>
        </div>
      )}
      {health && (
        <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ margin: 0 }}>✅ <strong>{health.message}</strong></p>
          <p style={{ margin: '0.5rem 0 0' }}>🗄️ Database: {health.database}</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85em', color: '#666' }}>🕐 {health.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
