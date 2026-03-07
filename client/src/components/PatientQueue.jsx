import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPatients } from "../api/patients"

function getUrgencyClass(urgency) {
  if (urgency === "Critical") return "critical"
  if (urgency === "Moderate") return "moderate"
  return "low"
}

function PatientQueue() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await getPatients()
        setPatients(data)
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  if (loading) return <div className="page"><p>Loading patients...</p></div>
  if (patients.length === 0) return <div className="page"><p>No patients registered yet.</p></div>

  const sorted = [...patients].sort((a, b) => b.score - a.score)

  return (
    <div className="page">
      <h2>Patient Queue</h2>
      <p style={{ color: "var(--gray-400)", fontSize: "14px", marginBottom: "20px" }}>
        Click a patient to view their details.
      </p>
      {sorted.map((patient) => (
        <div
          key={patient.id}
          className={`patient-card ${getUrgencyClass(patient.urgency)}`}
          onClick={() => navigate(`/patients/${patient.id}`)}
        >
          <div>
            <strong style={{ fontSize: "16px" }}>{patient.name}</strong>
            <span style={{ color: "var(--gray-400)", fontSize: "14px" }}> — Age: {patient.age}</span>
            <br />
            <span style={{ color: "var(--gray-600)", fontSize: "14px" }}>
              {patient.symptoms.join(", ")}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className={`badge ${getUrgencyClass(patient.urgency)}`}>
              {patient.urgency}
            </span>
            <br />
            <span style={{ color: "var(--gray-400)", fontSize: "13px", marginTop: "4px", display: "block" }}>
              Score: {patient.score}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PatientQueue