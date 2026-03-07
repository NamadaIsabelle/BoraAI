import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPatients, deletePatient } from "../api/patients"

function getUrgencyClass(urgency) {
  if (urgency === "Critical") return "critical"
  if (urgency === "Moderate") return "moderate"
  return "low"
}

function PatientQueue() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
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
    const interval = setInterval(fetchPatients, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="page"><p>Loading patients...</p></div>

  const filtered = patients
    .filter(p => filter === "All" || p.urgency === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="page">
      <h2>Patient Queue</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or symptom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "12px 16px",
            border: "1.5px solid var(--gray-200)",
            borderRadius: "8px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "15px",
            color: "var(--gray-800)",
            background: "var(--gray-100)",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <option value="All">All</option>
          <option value="Critical">Critical</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <p style={{ color: "var(--gray-400)" }}>No patients match your search.</p>
        </div>
      ) : (
        filtered.map((patient) => (
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
              <span style={{ color: "var(--gray-400)", fontSize: "12px", display: "block" }}>
                {new Date(patient.createdAt).toLocaleTimeString()}
              </span>
              <button
                className="secondary"
                style={{ marginTop: "8px", fontSize: "12px", padding: "4px 10px" }}
                onClick={async (e) => {
                  e.stopPropagation()
                  if (confirm(`Mark ${patient.name} as seen and remove from queue?`)) {
                    await deletePatient(patient.id)
                    setPatients(prev => prev.filter(p => p.id !== patient.id))
                  }
                }}
              >
                ✓ Mark as Seen
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default PatientQueue