import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { getPatients } from "./api/patients"
import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"
import VitalsForm from "./components/VitalsForm"
import PatientDetail from "./components/PatientDetail"

function Home() {
  const [stats, setStats] = useState({ total: 0, critical: 0, moderate: 0, low: 0 })

  useEffect(() => {
    async function fetchStats() {
      try {
        const patients = await getPatients()
        setStats({
          total: patients.length,
          critical: patients.filter(p => p.urgency === "Critical").length,
          moderate: patients.filter(p => p.urgency === "Moderate").length,
          low: patients.filter(p => p.urgency === "Low").length
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="page">
      <div className="home-hero">
        <h1>BoraCare AI</h1>
        <p>Intelligent triage and patient monitoring for rural clinics.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div className="card" style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "32px", fontWeight: "800", color: "var(--purple)" }}>{stats.total}</p>
            <p style={{ fontSize: "13px", color: "var(--gray-400)" }}>Total Patients</p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px", borderTop: "3px solid var(--critical)" }}>
            <p style={{ fontSize: "32px", fontWeight: "800", color: "var(--critical)" }}>{stats.critical}</p>
            <p style={{ fontSize: "13px", color: "var(--gray-400)" }}>Critical</p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px", borderTop: "3px solid var(--moderate)" }}>
            <p style={{ fontSize: "32px", fontWeight: "800", color: "var(--moderate)" }}>{stats.moderate}</p>
            <p style={{ fontSize: "13px", color: "var(--gray-400)" }}>Moderate</p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px", borderTop: "3px solid var(--low)" }}>
            <p style={{ fontSize: "32px", fontWeight: "800", color: "var(--low)" }}>{stats.low}</p>
            <p style={{ fontSize: "13px", color: "var(--gray-400)" }}>Low</p>
          </div>
        </div>

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