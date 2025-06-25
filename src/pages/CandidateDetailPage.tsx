import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Candidate } from "../types/Candidate";
import { getCandidate } from "../api/candidates";

export default function CandidateDetailPage() {
    const { id } = useParams();
    const [candidate, setCandidate] = useState<Candidate | null>(null);

    useEffect(() => {
        if (id) {
            getCandidate(Number(id)).then(res => setCandidate(res.data));
        }
    }, [id]);

    if (!candidate) return <p className="m-4">Chargement...</p>;

    return (
        <div className="container mt-4">
            <h2>{candidate.nom}</h2>
            <div className="row">
                <div className="col-md-6">
                    <p><strong>Email :</strong> {candidate.email}</p>
                    <p><strong>Téléphone :</strong> {candidate.tel}</p>
                    <p><strong>Adresse :</strong> {candidate.adresse}</p>
                    <p><strong>Date de naissance :</strong> {candidate.dateNaissance}</p>
                    <p><strong>Domaine technique :</strong> {candidate.domaineTechnique}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>Numéro carte ID :</strong> {candidate.numeroCarteId}</p>
                    <p><strong>Note :</strong> {candidate.note}</p>
                    <p><strong>Date entretien :</strong> {candidate.dateEntretien}</p>
                    <p><strong>Observations :</strong> {candidate.observations}</p>
                </div>
            </div>
        </div>
    );
}
