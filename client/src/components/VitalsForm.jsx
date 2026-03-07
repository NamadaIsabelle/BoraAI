import { useState, useEffect } from "react"
import { getPatients, submitVitals } from "../api/patients"

function VitalsForm() {
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState("")
  const [temperature, setTemperature] = useState("")
  const [bloodPressure, setBloodPressure] = useState("")
  const [heartRate, setHeartRate] = useState("")
  const [oxygenSaturation, setOxygenSaturation] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await getPatients()
        setPatients(data)
      } catch (error) {
        console.error("Error fetching patients:", error)
      }
    }
    fetchPatients()
  }, [])

  async function handleSubmit() {
    if (!patientId || !temperature || !bloodPressure || !heartRate || !oxygenSaturation) {
      alert("Please fill in all fields")
      return
    }

    const vitals = {
      temperature: parseFloat(temperature),
      bloodPressure: bloodPressure,
      heartRate: parseInt(heartRate),
      oxygenSaturation: parseInt(oxygenSaturation)
    }

    try {
      setLoading(true)
      await submitVitals(patientId, vitals)
      alert("Vitals recorded successfully!")
      setPatientId("")
      setTemperature("")
      setBloodPressure("")
      setHeartRate("")
      setOxygenSaturation("")
    } catch (error) {
      console.error("Error submitting vitals:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Log Patient Vitals</h2>
      <div className="card">
        <div className="form-group">
          <label>Select Patient</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={{
              width: "100%",
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
            <option value="">-- Select a patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.urgency}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input
            type="number"
            placeholder="e.g. 38.5"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Blood Pressure</label>
          <input
            type="text"
            placeholder="e.g. 120/80"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm)</label>
          <input
            type="number"
            placeholder="e.g. 98"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Oxygen Saturation (%)</label>
          <input
            type="number"
            placeholder="e.g. 95"
            value={oxygenSaturation}
            onChange={(e) => setOxygenSaturation(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Log Vitals"}
        </button>
      </div>
    </div>
  )
}

export default VitalsForm