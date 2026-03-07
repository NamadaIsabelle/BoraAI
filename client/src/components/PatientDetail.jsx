import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPatient, getPatientVitals } from "../api/patients"

function getUrgencyColor(urgency) {
  if (urgency === "Critical") return "red"
  if (urgency === "Moderate") return "orange"
  return "green"
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

  if (loading) return <p>Loading patient details...</p>
  if (!patient) return <p>Patient not found.</p>

  return (
    <div>
      <button onClick={() => navigate("/queue")}>← Back to Queue</button>
      <h2>Patient Detail</h2>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h3>{patient.name}</h3>
        <p>Age: {patient.age}</p>
        <p>Symptoms: {patient.symptoms.join(", ")}</p>
        <p>
          Urgency:{" "}
          <span style={{ color: getUrgencyColor(patient.urgency) }}>
            <strong>{patient.urgency}</strong>
          </span>
        </p>
        <p>Score: {patient.score}</p>
        <p>Registered: {new Date(patient.createdAt).toLocaleString()}</p>
      </div>

      <h3>Vitals History</h3>
      {vitals.length === 0 ? (
        <p>No vitals recorded yet.</p>
      ) : (
        vitals.map((vital, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p>🌡 Temperature: {vital.temperature}°C</p>
            <p>💉 Blood Pressure: {vital.bloodPressure}</p>
            <p>❤️ Heart Rate: {vital.heartRate} bpm</p>
            <p>🫁 Oxygen Saturation: {vital.oxygenSaturation}%</p>
            <p>Recorded: {new Date(vital.recordedAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default PatientDetail