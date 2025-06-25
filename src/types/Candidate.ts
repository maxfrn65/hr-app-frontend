export interface Candidate {
    id: number;
    nom: string;
    numeroCarteId: string;
    dateNaissance: string;
    adresse: string;
    email: string;
    tel: string;
    note?: number;
    domaineTechnique: string;
    dateEntretien?: string;
    observations?: string;
}
