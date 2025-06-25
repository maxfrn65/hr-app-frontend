import { useState, useEffect } from "react";
import { Employee } from "../types/Employee";

interface Props {
    show: boolean;
    employee: Employee | null;
    onClose: () => void;
    onSave: (updated: Employee) => void;
}

export default function EditEmployeeModal({ show, employee, onClose, onSave }: Props) {
    const [form, setForm] = useState<Employee>({} as Employee);

    useEffect(() => {
        if (employee) setForm(employee);
    }, [employee]);

    if (!show || !employee) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "salaire" ? parseFloat(value) : value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modifier l'employé</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body row">
                        <div className="col-md-6">
                            <label className="form-label">Nom</label>
                            <input className="form-control mb-2" name="nom" value={form.nom} onChange={handleChange} />
                            <label className="form-label">Poste</label>
                            <input className="form-control mb-2" name="occupation" value={form.occupation} onChange={handleChange} />
                            <label className="form-label">Salaire</label>
                            <input className="form-control mb-2" type="number" name="salaire" value={form.salaire} onChange={handleChange} />
                            <label className="form-label">Email</label>
                            <input className="form-control mb-2" name="email" value={form.email} onChange={handleChange} />
                            <label className="form-label">Téléphone</label>
                            <input className="form-control mb-2" name="telephone" value={form.telephone} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Adresse</label>
                            <input className="form-control mb-2" name="adresse" value={form.adresse} onChange={handleChange} />
                            <label className="form-label">Date de naissance</label>
                            <input type="date" className="form-control mb-2" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} />
                            <label className="form-label">Numéro ID</label>
                            <input className="form-control mb-2" name="numeroId" value={form.numeroId} onChange={handleChange} />
                            <label className="form-label">Début contrat</label>
                            <input type="date" className="form-control mb-2" name="debutContrat" value={form.debutContrat} onChange={handleChange} />
                            <label className="form-label">Fin contrat</label>
                            <input type="date" className="form-control mb-2" name="finContrat" value={form.finContrat || ""} onChange={handleChange} />
                            <label className="form-label">Observations</label>
                            <input className="form-control mb-2" name="observations" value={form.observations || ""} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
