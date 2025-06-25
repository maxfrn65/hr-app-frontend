import { Employee } from "../types/Employee";

interface Props {
    employee: Employee;
    show: boolean;
    onClose: () => void;
}

export default function ViewEmployeeModal({ employee, show, onClose }: Props) {
    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Détails de l'employé</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Nom :</strong> {employee.nom}</p>
                        <p><strong>Poste :</strong> {employee.occupation}</p>
                        <p><strong>Email :</strong> {employee.email}</p>
                        <p><strong>Téléphone :</strong> {employee.telephone}</p>
                        <p><strong>Date naissance :</strong> {employee.dateNaissance}</p>
                        {/* Tu peux ajouter + d'infos ici */}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
