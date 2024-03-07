import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <Link to={"/"} className="logo">El Inversionario</Link>
                <div className="links">
                    <Link to={"/page/inversiones"}>Inversiones</Link>
                    <Link to={"/finanzas"}>Finanzas</Link>
                    <Link to={"/negocios"}>Negocios</Link>
                    <Link to={"/ecomomia"}>Ecomomia</Link>
                    <Link to={"/bancario"}>Bancario</Link>
                </div>
            </nav>
        </header>
    )
}