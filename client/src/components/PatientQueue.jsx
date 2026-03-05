import { useState, useEffect } from "react"
import { getPatients } from "../api/patients"

function getUrgencyColor(urgency) {
  if (urgency === "Critical") return "red"
  if (urgency === "Moderate") return "orange"
  return "green"
}

function PatientQueue({ onSelectPatient }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

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
      {sorted.map((patient) => (
        <div
          key={patient.id}
          onClick={() => onSelectPatient(patient.id)}
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