import { useContext } from "react";
import { ThemeContext } from "../../App";

function Footer () {
    const { theme } = useContext(ThemeContext);
    return(
        <div className='app-footer row border mt-auto' data-bs-theme={theme}>
            <div className="card w-100 text-center py-3">
                <p className="card-text mb-1">Desenvolvido com React e Bootstrap</p>
                <p className="card-text mb-2">© 2026 Interface AI. Todos os direitos reservados.</p>
            </div>
        </div>
    )
}

export default Footer;