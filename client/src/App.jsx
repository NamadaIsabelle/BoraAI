import { Routes, Route, Link } from "react-router-dom"
import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"
import VitalsForm from "./components/VitalsForm"
import PatientDetail from "./components/PatientDetail"

function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1>BoraCare AI</h1>
        <p>Intelligent triage and patient monitoring for rural clinics.</p>
        <div className="home-cards">
          <Link to="/register" className="home-card">
            <div className="icon">🏥</div>
            <h3>Register Patient</h3>
            <p>Add a new patient and get instant triage scoring</p>
          </Link>
          <Link to="/queue" className="home-card">
            <div className="icon">📋</div>
            <h3>Patient Queue</h3>
            <p>View prioritized patients sorted by urgency</p>
          </Link>
          <Link to="/vitals" className="home-card">
            <div className="icon">❤️</div>
            <h3>Log Vitals</h3>
            <p>Record patient vital signs over time</p>
          </Link>
          <Link to="/queue" className="home-card">
            <div className="icon">📊</div>
            <h3>Patient Records</h3>
            <p>View full patient history and vitals trends</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <nav>
        <strong>BoraCare AI</strong>
        <Link to="/">Home</Link>
        <Link to="/register">Register Patient</Link>
        <Link to="/queue">Patient Queue</Link>
        <Link to="/vitals">Log Vitals</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PatientForm />} />
        <Route path="/queue" element={<PatientQueue />} />
        <Route path="/vitals" element={<VitalsForm />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
      </Routes>
    </div>
  )
}

export default App