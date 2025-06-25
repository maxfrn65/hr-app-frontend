import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Bienvenue sur le système de gestion RH</h1>
            <p className="lead">Choisissez une section à gérer :</p>
            <div className="d-flex justify-content-center mt-4 gap-3">
                <Link to="/employees" className="btn btn-primary btn-lg">Gérer les employés</Link>
                <Link to="/candidates" className="btn btn-secondary btn-lg">Gérer les candidats</Link>
            </div>
        </div>
    );
}
