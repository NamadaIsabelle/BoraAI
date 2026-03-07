import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPatient, getPatientVitals } from "../api/patients"

function getUrgencyClass(urgency) {
  if (urgency === "Critical") return "critical"
  if (urgency === "Moderate") return "moderate"
  return "low"
}

function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [vitals, setVitals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const patientData = await getPatient(id)
        const vitalsData = await getPatientVitals(id)
        setPatient(patientData)
        setVitals(vitalsData)
      } catch (error) {
        console.error("Error fetching patient detail:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <div className="page"><p>Loading patient details...</p></div>
  if (!patient) return <div className="page"><p>Patient not found.</p></div>

  return (
    <div className="page">
      <button className="secondary" onClick={() => navigate("/queue")}
        style={{ marginBottom: "20px" }}>
        ← Back to Queue
      </button>

      <h2>Patient Detail</h2>

      <div className="card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ marginBottom: "8px" }}>{patient.name}</h3>
            <p style={{ color: "var(--gray-600)", marginBottom: "4px" }}>Age: {patient.age}</p>
            <p style={{ color: "var(--gray-600)", marginBottom: "12px" }}>
              Symptoms: {patient.symptoms.join(", ")}
            </p>
            <p style={{ color: "var(--gray-400)", fontSize: "13px" }}>
              Registered: {new Date(patient.createdAt).toLocaleString()}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className={`badge ${getUrgencyClass(patient.urgency)}`}>
              {patient.urgency}
            </span>
            <p style={{ color: "var(--gray-400)", fontSize: "13px", marginTop: "8px" }}>
              Score: {patient.score}
            </p>
          </div>
        </div>
      </div>

      <h3>Vitals History</h3>
      {vitals.length === 0 ? (
        <div className="card">
          <p style={{ color: "var(--gray-400)" }}>No vitals recorded yet.</p>
        </div>
      ) : (
        vitals.map((vital, index) => (
          <div key={index} className="vitals-card">
            <p>🌡 Temperature: <strong>{vital.temperature}°C</strong></p>
            <p>💉 Blood Pressure: <strong>{vital.bloodPressure}</strong></p>
            <p>❤️ Heart Rate: <strong>{vital.heartRate} bpm</strong></p>
            <p>🫁 Oxygen: <strong>{vital.oxygenSaturation}%</strong></p>
            <p className="recorded">
              Recorded: {new Date(vital.recordedAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default PatientDetail