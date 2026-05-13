import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';

interface HistoryEntry {
  prompt: string;
  response: string;
  model: string;
  timestamp: string;
  durationMs: number;
}

function HistoryPage() {
  const { theme } = useContext(ThemeContext);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse chat history', error);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('chatHistory');
    setHistory([]);
  };

  return (
    <div className="page-shell history-page" data-bs-theme={theme}>
      <div className="page-panel">
        <div className="page-title">
          <h2>Histórico de Pesquisas</h2>
          <p>Reveja os prompts anteriores e as respostas geradas pela IA.</p>
        </div>
        <div className="history-actions mb-4">
          <button className="btn btn-outline-primary" type="button" onClick={clearHistory}>
            Limpar histórico
          </button>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            Ainda não existem pesquisas guardadas. Faça um prompt para criar o seu histórico.
          </div>
        ) : (
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={index} className="history-item card mb-3">
                <div className="card-body">
                  <div className="history-meta mb-3">
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    <span>{entry.model}</span>
                    <span>{entry.durationMs} ms</span>
                  </div>
                  <div className="history-block">
                    <strong>Prompt:</strong>
                    <pre>{entry.prompt}</pre>
                  </div>
                  <div className="history-block">
                    <strong>Resposta:</strong>
                    <pre>{entry.response}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
