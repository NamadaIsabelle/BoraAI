import { useState } from "react"

function PatientForm() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [symptoms, setSymptoms] = useState("")

  function handleSubmit() {
    if (!name || !age || !symptoms) {
      alert("Please fill in all fields")
      return
    }

    const patient = {
      name: name,
      age: age,
      symptoms: symptoms.split(",").map(s => s.trim())
    }

    console.log("Patient submitted:", patient)
    alert(`Patient ${name} submitted successfully!`)
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

      <button onClick={handleSubmit}>Submit Patient</button>
    </div>
  )
}

export default PatientForm