import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../App';
import LogoutButton from './Logout';

function LeftMenu() {
    const context = useContext(ThemeContext);
    if (!context) return null;
    const { theme, setTheme } = context;

    return (
        <div className="sidebar-panel d-flex flex-column h-100">
            <div className="sidebar-brand p-3 mb-3" data-bs-theme={theme}>
                <h4 className="mb-2">Interface AI</h4>
                <div className="dropdown">
                    <button
                        className="btn btn-outline-primary w-100 dropdown-toggle"
                        type="button"
                        id="themeDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Theme
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="themeDropdown">
                        <li><button className="dropdown-item" type="button" onClick={() => setTheme("light")}>Light</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => setTheme("dark")}>Dark</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => setTheme("purple")}>Purple</button></li>
                    </ul>
                </div>
            </div>

            <nav className="sidebar-nav mb-4" data-bs-theme={theme}>
                <NavLink to="/content" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    Main Chat
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    History
                </NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    API Dashboard
                </NavLink>
            </nav>

            <div className="sidebar-actions mt-auto" data-bs-theme={theme}>
                <LogoutButton />
            </div>
        </div>
    );
}

export default LeftMenu;