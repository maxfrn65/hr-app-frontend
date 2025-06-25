import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import CandidatePage from "./pages/CandidatePage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import CandidateDetailPage from "./pages/CandidateDetailPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="employees" element={<EmployeePage />} />
                    <Route path="candidates" element={<CandidatePage />} />
                    <Route path="employees/:id" element={<EmployeeDetailPage />} />
                    <Route path="candidates/:id" element={<CandidateDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
