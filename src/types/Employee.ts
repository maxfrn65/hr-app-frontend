import {Leave} from "./Leave";
import {Absence} from "./Absence";

export interface Employee {
    id: number;
    nom: string;
    occupation: string;
    salaire: number;
    debutContrat: string;
    finContrat?: string;
    numeroId: string;
    dateNaissance: string;
    adresse: string;
    email: string;
    telephone: string;
    observations?: string;
    absence?: Absence[];
    leave?: Leave[];
}
