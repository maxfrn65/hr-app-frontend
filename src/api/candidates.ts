import axios from "axios";
import { Candidate } from "../types/Candidate";

const API = "http://localhost:8080/api/candidate";

export const getCandidates = () => axios.get<Candidate[]>(API);
export const getCandidate = (id: number) => axios.get<Candidate>(`${API}/${id}`);
export const createCandidate = (data: Omit<Candidate, "id">) => axios.post(API, data);
export const updateCandidate = (id: number, data: Candidate) => axios.put(`${API}/${id}`, data);
export const deleteCandidate = (id: number) => axios.delete(`${API}/${id}`);
