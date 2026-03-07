import { Routes, Route, Link } from "react-router-dom"
import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"
import VitalsForm from "./components/VitalsForm"
import PatientDetail from "./components/PatientDetail"

function Home() {
  return (
    <div>
      <h2>Welcome to BoraCare AI</h2>
      <p>Intelligent triage and patient monitoring for rural clinics.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <strong>BoraCare AI</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/">Home</Link>
        &nbsp;&nbsp;
        <Link to="/register">Register Patient</Link>
        &nbsp;&nbsp;
        <Link to="/queue">Patient Queue</Link>
        &nbsp;&nbsp;
        <Link to="/vitals">Log Vitals</Link>
      </nav>

      <div style={{ padding: "0 20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<PatientForm />} />
          <Route path="/queue" element={<PatientQueue />} />
          <Route path="/vitals" element={<VitalsForm />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App