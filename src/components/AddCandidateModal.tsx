import { useState } from "react";
import { Candidate } from "../types/Candidate";

interface Props {
    show: boolean;
    onClose: () => void;
    onAdd: (candidate: Omit<Candidate, "id">) => void;
}

export default function AddCandidateModal({ show, onClose, onAdd }: Props) {
    const [form, setForm] = useState<Omit<Candidate, "id">>({
        nom: "",
        numeroCarteId: "",
        dateNaissance: "",
        adresse: "",
        email: "",
        tel: "",
        note: 0,
        domaineTechnique: "",
        dateEntretien: "",
        observations: "",
    });

    const labels: Record<keyof Candidate, string> = {
        id: "ID",
        nom: "Nom",
        numeroCarteId: "Numéro de carte ID",
        dateNaissance: "Date de naissance",
        adresse: "Adresse",
        email: "Email",
        tel: "Téléphone",
        note: "Note",
        domaineTechnique: "Domaine technique",
        dateEntretien: "Date d’entretien",
        observations: "Observations"
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "note" ? parseFloat(value) : value });
    };

    const handleSubmit = () => {
        onAdd(form);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter un candidat</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body row">
                        {Object.entries(form).map(([key, value]) => (
                            <div className="col-md-6 mb-2" key={key}>
                                <label className="form-label">{labels[key as keyof Candidate]}</label>
                                <input
                                    className="form-control"
                                    name={key}
                                    value={value || ""}
                                    type={
                                        key === "dateNaissance" || key === "dateEntretien" ? "date" :
                                            key === "note" ? "number" :
                                                key === "email" ? "email" :
                                                    key === "tel" ? "tel" :
                                                        "text"
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
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
