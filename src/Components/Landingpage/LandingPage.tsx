import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

function LandingPage() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div className="landing-page" data-bs-theme={theme}>
      <div className="landing-hero">
        <div className="landing-copy">
          <span className="eyebrow">Interface AI</span>
          <h1>Explore a sua nova assistente de IA.</h1>
          <p>Login, registo e interação com um motor de IA dinâmico. Histórico, métricas e temas aplicados a toda a interface.</p>
          <div className="landing-cta">
            <button className="btn btn-primary me-3" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-outline-primary" onClick={() => navigate('/register')}>
              Registar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
