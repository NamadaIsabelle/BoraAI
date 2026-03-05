import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"
import VitalsForm from "./components/VitalsForm"

function App() {
  return (
    <div>
      <h1>BoraCare AI</h1>
      <PatientForm />
      <hr />
      <PatientQueue />
      <hr />
      <VitalsForm />
    </div>
  )
}

export default App