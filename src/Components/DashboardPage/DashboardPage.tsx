import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import AreaChartComponent from './Dashboard';

interface MetricsHistoryItem {
  label: string;
  duration: number;
}

interface ApiMetrics {
  totalCount: number;
  totalTime: number;
  history: MetricsHistoryItem[];
}

function DashboardPage() {
  const { theme } = useContext(ThemeContext);
  const [metrics, setMetrics] = useState<ApiMetrics>({ totalCount: 0, totalTime: 0, history: [] });

  useEffect(() => {
    const saved = localStorage.getItem('apiMetrics');
    if (saved) {
      try {
        setMetrics(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse API metrics', error);
      }
    }
  }, []);

  const averageTime = metrics.totalCount ? Math.round(metrics.totalTime / metrics.totalCount) : 0;

  return (
    <div className="page-shell dashboard-page" data-bs-theme={theme}>
      <div className="page-panel">
        <div className="page-title">
          <h2>Dashboard de Utilização</h2>
          <p>Monitorize o número de pedidos à API e o tempo de resposta médio.</p>
        </div>

        <div className="dashboard-summary">
          <div className="metric-card">
            <h3>{metrics.totalCount}</h3>
            <p>Pedidos totais</p>
          </div>
          <div className="metric-card">
            <h3>{averageTime} ms</h3>
            <p>Tempo médio</p>
          </div>
          <div className="metric-card">
            <h3>{metrics.history.length}</h3>
            <p>Entradas no painel</p>
          </div>
        </div>

        {metrics.history.length > 0 ? (
          <div className="chart-panel card mt-4">
            <div className="card-body">
              <h4>Últimos tempos de resposta</h4>
              <AreaChartComponent data={metrics.history} xKey="label" yKey="duration" />
            </div>
          </div>
        ) : (
          <div className="empty-state mt-4">
            Ainda não há dados de utilização. Faça um prompt e volte a esta página.
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
