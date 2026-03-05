import { useState } from "react"
import { submitPatient } from "../api/patients"

function PatientForm() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [loading, setLoading] = useState(false)

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
      console.log("Patient created:", result)
      alert(`Patient ${name} submitted! Urgency: ${result.urgency}`)
      setName("")
      setAge("")
      setSymptoms("")
    } catch (error) {
      console.error("Error submitting patient:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Register New Patient</h2>

      <div>
        <label>Patient Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Age</label>
        <br />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Symptoms (separate with commas)</label>
        <br />
        <input
          type="text"
          placeholder="e.g. fever, headache, vomiting"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Patient"}
      </button>
    </div>
  )
}

export default PatientForm