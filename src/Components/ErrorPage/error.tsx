import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    return (
    <div className="error-page">
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
    );

}

export default ErrorPage;
