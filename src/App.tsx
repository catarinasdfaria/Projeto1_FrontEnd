import React, { useState } from "react";
import './Styles/Theme.css'
import MainLayout from './Components/MainPage/MainLayout';
import MainContent from './Components/MainPage/MainContent';
import Login from "./Components/Login_Register/Login";
import Register from "./Components/Login_Register/Register";
import LandingPage from "./Components/Landingpage/LandingPage";
import HistoryPage from "./Components/HistoryPage/HistoryPage";
import DashboardPage from "./Components/DashboardPage/DashboardPage";
import ErrorPage from "./Components/ErrorPage/error";
import { Route, Routes, BrowserRouter } from "react-router-dom";

export const ThemeContext = React.createContext<any>(null);

function App() {
    const [theme, setTheme] = useState("purple");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className='app-shell' data-bs-theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route element={<MainLayout />}>
                            <Route path='/content' element={<MainContent />} />
                            <Route path='/history' element={<HistoryPage />} />
                            <Route path='/dashboard' element={<DashboardPage />} />
                        </Route>
                        <Route path='/error' element={<ErrorPage />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;