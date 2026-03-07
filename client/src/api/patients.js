const BASE_URL = "http://localhost:3000/api"

export async function getPatients() {
  const response = await fetch(`${BASE_URL}/patients`)
  const data = await response.json()
  return data
}

export async function submitPatient(patient) {
  const response = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(patient)
  })
  const data = await response.json()
  return data
}

export async function getPatient(id) {
  const response = await fetch(`${BASE_URL}/patients/${id}`)
  const data = await response.json()
  return data
}

export async function getPatientVitals(id) {
  const response = await fetch(`${BASE_URL}/patients/${id}/vitals`)
  const data = await response.json()
  return data
}

export async function submitVitals(id, vitals) {
  const response = await fetch(`${BASE_URL}/patients/${id}/vitals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vitals)
  })
  const data = await response.json()
  return data
}

export async function deletePatient(id) {
  const response = await fetch(`${BASE_URL}/patients/${id}`, {
    method: "DELETE"
  })
  const data = await response.json()
  return data
}