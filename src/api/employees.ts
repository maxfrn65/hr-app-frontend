import axios from "axios";
import { Employee } from "../types/Employee";

const API = "http://localhost:8080/api/employee";

export const getEmployees = () => axios.get<Employee[]>(API);

export const getEmployee = (id: number) => axios.get<Employee>(`${API}/${id}`);

export const createEmployee = (data: Omit<Employee, "id">) =>
    axios.post<Employee>("http://localhost:8080/api/employee", data);

export const updateEmployee = (id: number, data: Employee) => axios.put(`${API}/${id}`, data);

export const deleteEmployee = (id: number) => axios.delete(`${API}/${id}`);

export const addLeave = (employeeId: number, data: { dateDebut: string; dateFin: string }) =>
    axios.post(`http://localhost:8080/api/leave`, { ...data, employee: { id: employeeId } });

export const addAbsence = (employeeId: number, data: { date: string }) =>
    axios.post(`http://localhost:8080/api/absence`, { ...data, employee: { id: employeeId } });
