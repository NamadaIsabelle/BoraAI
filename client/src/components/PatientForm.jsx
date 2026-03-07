import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { submitPatient } from "../api/patients"

function PatientForm() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit() {
    if (!name || !age || !symptoms) {
      alert("Please fill in all fields")
      return
    }

    const patient = {
      name: name,
      age: parseInt(age),
      symptoms: symptoms.split(",").map(s => s.trim())
    }

    try {
      setLoading(true)
      const result = await submitPatient(patient)
      alert(`Patient ${name} submitted! Urgency: ${result.urgency}`)
      navigate("/queue")
    } catch (error) {
      console.error("Error submitting patient:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Register New Patient</h2>
      <div className="card">
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            placeholder="Enter patient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Symptoms (separate with commas)</label>
          <input
            type="text"
            placeholder="e.g. fever, headache, vomiting"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Patient"}
        </button>
      </div>
    </div>
  )
}

export default PatientForm