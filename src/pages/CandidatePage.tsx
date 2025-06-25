import { useEffect, useState } from "react";
import { getCandidates, deleteCandidate, createCandidate } from "../api/candidates";
import { Candidate } from "../types/Candidate";

export default function CandidatePage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({ nom: "", email: "" });

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = () => {
        getCandidates().then((res) => setCandidates(res.data));
    };

    const handleDelete = (id: number) => {
        deleteCandidate(id).then(() => {
            setCandidates(candidates.filter(c => c.id !== id));
        });
    };

    const handleCreate = () => {
        if (newCandidate.nom && newCandidate.email) {
            createCandidate(newCandidate as Candidate).then(() => {
                setNewCandidate({ nom: "", email: "" });
                fetchCandidates();
            });
        }
    };

    return (
        <div>
            <h1>Liste des candidats</h1>

            <ul>
                {candidates.map((cand) => (
                    <li key={cand.id}>
                        {cand.nom} – {cand.email}
                        <button onClick={() => handleDelete(cand.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <h2>Ajouter un candidat</h2>
            <input
                type="text"
                placeholder="Nom"
                value={newCandidate.nom || ""}
                onChange={(e) => setNewCandidate({ ...newCandidate, nom: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newCandidate.email || ""}
                onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
            />
            <button onClick={handleCreate}>Ajouter</button>
        </div>
    );
}
