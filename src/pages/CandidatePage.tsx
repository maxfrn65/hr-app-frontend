import { useEffect, useState } from "react";
import { Candidate } from "../types/Candidate";
import {
    getCandidates,
    deleteCandidate,
    updateCandidate,
    createCandidate
} from "../api/candidates";
import AddCandidateModal from "../components/AddCandidateModal";
import EditCandidateModal from "../components/EditCandidateModal";
import { useNavigate } from "react-router-dom";

export default function CandidatePage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCandidates().then(res => setCandidates(res.data));
    }, []);

    const handleDelete = (id: number) => {
        deleteCandidate(id).then(() => {
            setCandidates(candidates.filter(c => c.id !== id));
        });
    };

    const handleSave = (updated: Candidate) => {
        updateCandidate(updated.id, updated).then(res => {
            setCandidates(candidates.map(c => c.id === updated.id ? res.data : c));
        });
    };

    const handleAdd = (newCandidate: Omit<Candidate, "id">) => {
        createCandidate(newCandidate).then(res => {
            setCandidates([...candidates, res.data]);
        });
    };

    return (
        <div className="container">
            <h2 className="my-4">Candidats</h2>
            <button className="btn btn-primary mb-3" onClick={() => setAddModalOpen(true)}>
                Ajouter un candidat
            </button>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Domaine</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {candidates.map(candidate => (
                    <tr key={candidate.id}>
                        <td>{candidate.nom}</td>
                        <td>{candidate.email}</td>
                        <td>{candidate.tel}</td>
                        <td>{candidate.domaineTechnique}</td>
                        <td>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => navigate(`/candidates/${candidate.id}`)}
                            >
                                Voir
                            </button>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setEditModalOpen(true);
                                }}
                            >
                                Modifier
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(candidate.id)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <EditCandidateModal
                show={editModalOpen}
                candidate={selectedCandidate}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSave}
            />

            <AddCandidateModal
                show={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAdd}
            />
        </div>
    );
}
