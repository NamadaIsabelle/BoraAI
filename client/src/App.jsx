import PatientForm from "./components/PatientForm"
import PatientQueue from "./components/PatientQueue"

function App() {
  return (
    <div>
      <h1>BoraCare AI</h1>
      <PatientForm />
      <hr />
      <PatientQueue />
    </div>
  )
}

export default App