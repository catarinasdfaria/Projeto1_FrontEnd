import { useContext } from "react";
import { ThemeContext } from "../../App";

function Header() {
    const { theme } = useContext(ThemeContext);

    return(
        <div className='app-header row border' data-bs-theme={theme}>
            <div className="card w-100">
                <h5 className="card-header">Interface AI</h5>
                <div className="card-body">
                    <h5 className="card-title">Ask anything!</h5>
                    <p className="card-text">And I'll do my best to help you!</p>
                </div>
            </div>
        </div>
    )
}
export default Header;
