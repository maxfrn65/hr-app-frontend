import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div className="d-flex">
            <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
                <h4>Système de gestion RH</h4>
                <p className="text-muted">par Ynov</p>
                <nav className="nav flex-column">
                    <Link className="nav-link text-white" to="/">Accueil</Link>
                    <Link className="nav-link text-white" to="/employees">Employés</Link>
                    <Link className="nav-link text-white" to="/candidates">Candidats</Link>
                </nav>
            </div>
            <div className="p-4 flex-grow-1" style={{ width: "100%" }}>
                <Outlet />
            </div>
        </div>
    );
}
