import { useState } from "react"
import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"
import VitalsForm from "./components/VitalsForm"
import PatientDetail from "./components/PatientDetail"

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null)

  return (
    <div>
      <h1>BoraCare AI</h1>
      <PatientForm />
      <hr />
      <PatientQueue onSelectPatient={setSelectedPatientId} />
      <hr />
      <VitalsForm />
      <hr />
      <PatientDetail patientId={selectedPatientId} />
    </div>
  )
}

export default App