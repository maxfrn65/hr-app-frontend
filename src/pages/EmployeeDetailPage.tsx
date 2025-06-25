import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee, addLeave, addAbsence } from "../api/employees";
import { Employee } from "../types/Employee";
import {Leave} from "../types/Leave";
import {Absence} from "../types/Absence";


export default function EmployeeDetailPage() {
    const { id } = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [leaveDateDebut, setLeaveDateDebut] = useState("");
    const [leaveDateFin, setLeaveDateFin] = useState("");
    const [absenceDate, setAbsenceDate] = useState("");

    useEffect(() => {
        if (id) {
            getEmployee(Number(id)).then((res) => setEmployee(res.data));
        }
    }, [id]);

    const handleAddLeave = () => {
        if (!id) return;
        addLeave(Number(id), {
            dateDebut: leaveDateDebut,
            dateFin: leaveDateFin,
        }).then(() => {
            getEmployee(Number(id)).then((res) => setEmployee(res.data));
            setLeaveDateDebut("");
            setLeaveDateFin("");
        });
    };

    const handleAddAbsence = () => {
        if (!id) return;
        addAbsence(Number(id), {
            date: absenceDate,
        }).then(() => {
            getEmployee(Number(id)).then((res) => setEmployee(res.data));
            setAbsenceDate("");
        });
    };

    if (!employee) return <p className="m-4">Chargement...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{employee.nom}</h2>
            <div className="row">
                <div className="col-md-6">
                    <p><strong>Poste :</strong> {employee.occupation}</p>
                    <p><strong>Salaire :</strong> {employee.salaire} €</p>
                    <p><strong>Début contrat :</strong> {employee.debutContrat}</p>
                    <p><strong>Fin contrat :</strong> {employee.finContrat || "N/A"}</p>
                    <p><strong>Numéro ID :</strong> {employee.numeroId}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>Date de naissance :</strong> {employee.dateNaissance}</p>
                    <p><strong>Adresse :</strong> {employee.adresse}</p>
                    <p><strong>Email :</strong> {employee.email}</p>
                    <p><strong>Téléphone :</strong> {employee.telephone}</p>
                    <p><strong>Observations :</strong> {employee.observations || "Aucune"}</p>
                </div>
            </div>

            <hr />

            <h4>Congés</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Début</th>
                    <th>Fin</th>
                </tr>
                </thead>
                <tbody>
                {employee.leave?.map((leave: Leave) => (
                    <tr key={leave.id}>
                        <td>{leave.dateDebut}</td>
                        <td>{leave.dateFin}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="d-flex gap-2">
                <input type="date" className="form-control" value={leaveDateDebut} onChange={(e) => setLeaveDateDebut(e.target.value)} />
                <input type="date" className="form-control" value={leaveDateFin} onChange={(e) => setLeaveDateFin(e.target.value)} />
                <button className="btn btn-success" onClick={handleAddLeave}>Ajouter un congé</button>
            </div>

            <hr className="my-4" />

            <h4>Absences</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {employee.absence?.map((abs: Absence) => (
                    <tr key={abs.id}>
                        <td>{abs.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="d-flex gap-2">
                <input type="date" className="form-control" value={absenceDate} onChange={(e) => setAbsenceDate(e.target.value)} />
                <button className="btn btn-warning" onClick={handleAddAbsence}>Ajouter une absence</button>
            </div>
        </div>
    );
}
