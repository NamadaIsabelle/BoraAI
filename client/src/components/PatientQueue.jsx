import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPatients } from "../api/patients"

function getUrgencyColor(urgency) {
  if (urgency === "Critical") return "red"
  if (urgency === "Moderate") return "orange"
  return "green"
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

  if (loading) return <p>Loading patients...</p>
  if (patients.length === 0) return <p>No patients registered yet.</p>

  const sorted = [...patients].sort((a, b) => b.score - a.score)

  return (
    <div>
      <h2>Patient Queue</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>Click a patient to view their details.</p>
      {sorted.map((patient) => (
        <div
          key={patient.id}
          onClick={() => navigate(`/patients/${patient.id}`)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderLeft: `5px solid ${getUrgencyColor(patient.urgency)}`,
            cursor: "pointer"
          }}
        >
          <strong>{patient.name}</strong> — Age: {patient.age}
          <br />
          Symptoms: {patient.symptoms.join(", ")}
          <br />
          Urgency: <span style={{ color: getUrgencyColor(patient.urgency) }}>
            <strong>{patient.urgency}</strong>
          </span>
          &nbsp;| Score: {patient.score}
        </div>
      ))}
    </div>
  )
}

export default PatientQueue