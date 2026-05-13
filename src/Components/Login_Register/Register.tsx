import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../App';
import '../../Styles/Theme.css';

function Register() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Passwords do not match!");
            return;
        }

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Registration successful!", user);
                    setAlert("Registration successful!");
                    navigate("/content");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error Code:", errorCode);
                    console.log("Error Message:", errorMessage);
                    setAlert(`Registration failed: ${errorMessage}`);
                });
        } catch (error) {
            console.error(error);
            setAlert("An unexpected error occurred!");
        }
    };

return (
    <div className="login-container" data-bs-theme={theme}>
        <h1>REGISTER</h1>
        <p className="login-subtitle">Create your account and start using Interface AI right away.</p>

        <form onSubmit={handleRegister}>
        <div className="input-group">
            <label>EMAIL</label>
            <input 
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="input-group">
            <label>PASSWORD</label>
            <input 
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="input-group">
            <label>CONFIRM PASSWORD</label>
            <input 
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>

        <button type="submit">SIGN UP</button>
            <button type="button" className="theme-toggle-button" onClick={() => {
                const nextTheme = theme === "purple" ? "dark" : theme === "dark" ? "light" : "purple";
                setTheme(nextTheme);
            }}>
                Change Theme
            </button>
        </form>

        <div className="footer">
            Already have an account? <a onClick={() => navigate('/login')}>Sign in</a>
        </div>
        {alert && (<div className={alert.includes("successful") ? "alert alert-success" : "alert alert-danger"}>{alert}
        </div>
        )}
    </div>
    );

}

export default Register;
