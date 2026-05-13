import MainContent from "./MainContent";
import LeftMenu from "./LeftMenu";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { useEffect } from "react";

function Content () {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
          navigate('/error');
        }
    }, [navigate]);

    return(
        <div className="app-body">
            <aside className="app-sidebar">
                <LeftMenu/>
            </aside>
            <main className="app-main">
                <Header/>
                <MainContent/>
                <Footer/>
            </main>
        </div>
    )
}

export default Content;