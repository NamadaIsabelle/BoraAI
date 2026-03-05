# BoraCare AI – API Contract

This document defines the endpoints between the frontend (React) and backend (Node.js).
Both parties should follow this contract before building features.

---

## Base URL
http://localhost:3000/api

---

## 1. Submit Patient Symptoms (Triage)

**POST** `/patients`

Request Body:
```json
{
  "name": "John Doe",
  "age": 34,
  "symptoms": ["fever", "headache", "vomiting"]
}
```

Response:
```json
{
  "id": "1",
  "name": "John Doe",
  "age": 34,
  "symptoms": ["fever", "headache", "vomiting"],
  "urgency": "Critical",
  "score": 85,
  "createdAt": "2026-03-05T10:00:00Z"
}
```

---

## 2. Get Patient Queue (Staff Dashboard)

**GET** `/patients`

Response:
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "age": 34,
    "symptoms": ["fever", "headache", "vomiting"],
    "urgency": "Critical",
    "score": 85,
    "createdAt": "2026-03-05T10:00:00Z"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "age": 22,
    "symptoms": ["cough", "runny nose"],
    "urgency": "Low",
    "score": 20,
    "createdAt": "2026-03-05T10:05:00Z"
  }
]
```

---

## 3. Get Single Patient

**GET** `/patients/:id`

Response:
```json
{
  "id": "1",
  "name": "John Doe",
  "age": 34,
  "symptoms": ["fever", "headache", "vomiting"],
  "urgency": "Critical",
  "score": 85,
  "createdAt": "2026-03-05T10:00:00Z"
}
```

---

## 4. Log Patient Vitals

**POST** `/patients/:id/vitals`

Request Body:
```json
{
  "temperature": 39.5,
  "bloodPressure": "140/90",
  "heartRate": 102,
  "oxygenSaturation": 94
}
```

Response:
```json
{
  "patientId": "1",
  "temperature": 39.5,
  "bloodPressure": "140/90",
  "heartRate": 102,
  "oxygenSaturation": 94,
  "recordedAt": "2026-03-05T10:15:00Z"
}
```

---

## 5. Get Patient Vitals History

**GET** `/patients/:id/vitals`

Response:
```json
[
  {
    "patientId": "1",
    "temperature": 39.5,
    "bloodPressure": "140/90",
    "heartRate": 102,
    "oxygenSaturation": 94,
    "recordedAt": "2026-03-05T10:15:00Z"
  }
]
```

---

## Urgency Levels
- **Critical** – score 70–100 (needs immediate attention)
- **Moderate** – score 40–69 (needs attention soon)
- **Low** – score 0–39 (can wait)