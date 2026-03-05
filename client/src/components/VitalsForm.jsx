import { useState } from "react"
import { submitVitals } from "../api/patients"

function VitalsForm() {
  const [patientId, setPatientId] = useState("")
  const [temperature, setTemperature] = useState("")
  const [bloodPressure, setBloodPressure] = useState("")
  const [heartRate, setHeartRate] = useState("")
  const [oxygenSaturation, setOxygenSaturation] = useState("")
  const [loading, setLoading] = useState(false)

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
      const result = await submitVitals(patientId, vitals)
      console.log("Vitals recorded:", result)
      alert(`Vitals recorded successfully!`)
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
    <div>
      <h2>Log Patient Vitals</h2>

      <div>
        <label>Patient ID</label>
        <br />
        <input
          type="text"
          placeholder="Enter patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Temperature (°C)</label>
        <br />
        <input
          type="number"
          placeholder="e.g. 38.5"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Blood Pressure</label>
        <br />
        <input
          type="text"
          placeholder="e.g. 120/80"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Heart Rate (bpm)</label>
        <br />
        <input
          type="number"
          placeholder="e.g. 98"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Oxygen Saturation (%)</label>
        <br />
        <input
          type="number"
          placeholder="e.g. 95"
          value={oxygenSaturation}
          onChange={(e) => setOxygenSaturation(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Log Vitals"}
      </button>
    </div>
  )
}

export default VitalsForm