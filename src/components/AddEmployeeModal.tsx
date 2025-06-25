import { useState } from "react";
import { Employee } from "../types/Employee";

interface Props {
    show: boolean;
    onClose: () => void;
    onAdd: (employee: Omit<Employee, "id">) => void;
}

export default function AddEmployeeModal({ show, onClose, onAdd }: Props) {
    const [form, setForm] = useState<Omit<Employee, "id">>({
        nom: "",
        occupation: "",
        salaire: 0,
        debutContrat: "",
        finContrat: "",
        numeroId: "",
        dateNaissance: "",
        adresse: "",
        email: "",
        telephone: "",
        observations: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        onAdd(form);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter un employé</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control mb-2" name="nom" placeholder="Nom" onChange={handleChange} />
                        <input className="form-control mb-2" name="occupation" placeholder="Poste" onChange={handleChange} />
                        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
                        <input className="form-control mb-2" name="telephone" placeholder="Téléphone" onChange={handleChange} />
                        <input
                            type="date"
                            className="form-control mb-2"
                            name="dateNaissance"
                            value={form.dateNaissance}
                            onChange={handleChange}
                        />
                        <input className="form-control mb-2" name="numeroId" placeholder="Numéro ID" onChange={handleChange} />
                        <input className="form-control mb-2" name="adresse" placeholder="Adresse" onChange={handleChange} />
                        <input className="form-control mb-2" name="salaire" type="number" placeholder="Salaire" onChange={handleChange} />
                        <input type="date" className="form-control mb-2" name="debutContrat" placeholder="Début contrat (YYYY-MM-DD)" onChange={handleChange} />
                        <input type="date" className="form-control mb-2" name="finContrat" placeholder="Fin contrat (optionnel)" onChange={handleChange} />
                        <input className="form-control mb-2" name="observations" placeholder="Observations" onChange={handleChange} />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button className="btn btn-success" onClick={handleSubmit}>Créer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
