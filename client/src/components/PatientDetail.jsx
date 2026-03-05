const mockPatient = {
  id: "1",
  name: "John Doe",
  age: 34,
  symptoms: ["fever", "headache", "vomiting"],
  urgency: "Critical",
  score: 85,
  createdAt: "2026-03-05T10:00:00Z"
}

const mockVitals = [
  {
    temperature: 39.5,
    bloodPressure: "140/90",
    heartRate: 102,
    oxygenSaturation: 94,
    recordedAt: "2026-03-05T10:15:00Z"
  },
  {
    temperature: 38.9,
    bloodPressure: "135/85",
    heartRate: 98,
    oxygenSaturation: 95,
    recordedAt: "2026-03-05T11:00:00Z"
  },
  {
    temperature: 38.2,
    bloodPressure: "130/80",
    heartRate: 90,
    oxygenSaturation: 97,
    recordedAt: "2026-03-05T12:00:00Z"
  }
]

function getUrgencyColor(urgency) {
  if (urgency === "Critical") return "red"
  if (urgency === "Moderate") return "orange"
  return "green"
}

function PatientDetail() {
  return (
    <div>
      <h2>Patient Detail</h2>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h3>{mockPatient.name}</h3>
        <p>Age: {mockPatient.age}</p>
        <p>Symptoms: {mockPatient.symptoms.join(", ")}</p>
        <p>
          Urgency:{" "}
          <span style={{ color: getUrgencyColor(mockPatient.urgency) }}>
            <strong>{mockPatient.urgency}</strong>
          </span>
        </p>
        <p>Score: {mockPatient.score}</p>
        <p>Registered: {new Date(mockPatient.createdAt).toLocaleString()}</p>
      </div>

      <h3>Vitals History</h3>
      {mockVitals.map((vital, index) => (
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
      ))}
    </div>
  )
}

export default PatientDetail