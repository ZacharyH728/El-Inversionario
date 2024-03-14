import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'

export default function Footer() {
    return (
        <footer>
            <nav>
                <div className="logo">
                    <svg viewBox="0 0 1 1">
                        <image href={logo} width="1" height="1"></image>
                    </svg>
                    <Link to={"/"}>El Inversionario</Link>
                </div>
                <div className="links">
                    <Link to={"/page/inversiones"}>Inversiones</Link>
                    <Link to={"/page/finanzas"}>Finanzas</Link>
                    <Link to={"/page/negocios"}>Negocios</Link>
                    <Link to={"/page/ecomomia"}>Ecomomia</Link>
                    <Link to={"/page/bancario"}>Bancario</Link>
                    <Link to={"/page/aboutus"}>About Us</Link>
                </div>
            </nav>
        </footer>
    )
}