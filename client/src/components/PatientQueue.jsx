const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    age: 34,
    symptoms: ["fever", "headache", "vomiting"],
    urgency: "Critical",
    score: 85,
    createdAt: "2026-03-05T10:00:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 22,
    symptoms: ["cough", "runny nose"],
    urgency: "Low",
    score: 20,
    createdAt: "2026-03-05T10:05:00Z"
  },
  {
    id: "3",
    name: "Peter Kamau",
    age: 45,
    symptoms: ["chest pain", "shortness of breath"],
    urgency: "Critical",
    score: 92,
    createdAt: "2026-03-05T10:10:00Z"
  },
  {
    id: "4",
    name: "Amina Hassan",
    age: 30,
    symptoms: ["dizziness", "nausea"],
    urgency: "Moderate",
    score: 55,
    createdAt: "2026-03-05T10:15:00Z"
  }
]

function getUrgencyColor(urgency) {
  if (urgency === "Critical") return "red"
  if (urgency === "Moderate") return "orange"
  return "green"
}

function PatientQueue() {
  const sorted = [...mockPatients].sort((a, b) => b.score - a.score)

  return (
    <div>
      <h2>Patient Queue</h2>
      {sorted.map((patient) => (
        <div
          key={patient.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderLeft: `5px solid ${getUrgencyColor(patient.urgency)}`
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