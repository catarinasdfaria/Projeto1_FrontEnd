import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../Config/firebase';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import '../../Styles/Theme.css';

function Login() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful!');
            setAlert('Login successful!');
            navigate('/content');
        } catch (error) {
            console.log(error);
            setAlert('Login failed!');
        }
    };
return (
    <div className="login-container" data-bs-theme={theme}>
        <h1>LOGIN</h1>
        <p className="login-subtitle">Welcome back to Interface AI. Enter your details to continue.</p>

        <form onSubmit={handleLogin}>
        <div className="input-group">
            <label htmlFor="email">EMAIL</label>
            <input 
            type="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input 
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button type="submit">SIGN IN</button>
            <button type="button" className="theme-toggle-button" onClick={() => {
                const nextTheme = theme === "purple" ? "dark" : theme === "dark" ? "light" : "purple";
                setTheme(nextTheme);
            }}>
                Change Theme
            </button>
        </form>

        <div className="footer">
            Don't have an account? <a onClick={() => navigate('/register')}>Sign up</a>
        </div>
        {alert && (<div className={alert.includes("successful") ? "alert alert-success" : "alert alert-danger"}>{alert}
        </div>
        )}
    </div>
    );

}

export default Login;