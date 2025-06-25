import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";
import { Employee } from "../types/Employee";
import ViewEmployeeModal from "../components/ViewEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import { updateEmployee, deleteEmployee } from "../api/employees";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { createEmployee } from "../api/employees";
import {useNavigate} from "react-router-dom";

export default function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        deleteEmployee(id).then(() =>
            setEmployees(employees.filter(emp => emp.id !== id))
        );
    };

    const handleSave = (updated: Employee) => {
        updateEmployee(updated.id, updated).then(res => {
            setEmployees(employees.map(emp => emp.id === updated.id ? res.data : emp));
        });
    };

    const handleAdd = (newEmp: Omit<Employee, "id">) => {
        createEmployee(newEmp).then(res => setEmployees([...employees, res.data]));
    };

    useEffect(() => {
        getEmployees().then(res => setEmployees(res.data));
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Employés</h2>
            <button className="btn btn-primary mb-3" onClick={() => setAddModalOpen(true)}>Ajouter un employé</button>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Occupation/Poste</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(emp => (
                    <tr key={emp.id}>
                        <td>{emp.nom}</td>
                        <td>{emp.occupation}</td>
                        <td>{emp.email}</td>
                        <td>{emp.telephone}</td>
                        <td>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => navigate(`/employees/${emp.id}`)}
                            >
                                Voir
                            </button>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => {
                                    setSelectedEmployee(emp);
                                    setEditModalOpen(true);
                                }}
                            >
                                Mettre à jour
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(emp.id)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <ViewEmployeeModal
                    employee={selectedEmployee}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}

            <EditEmployeeModal
                show={editModalOpen}
                employee={selectedEmployee}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSave}
            />

            <AddEmployeeModal
                show={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAdd}
            />
        </div>
    );
}
